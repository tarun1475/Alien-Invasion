const { Alien } = require("./aliens");
const generateName = require("sillyname");

/**
 * Alien Invasion simulation interface and implementation.
 */

class SimulateInvasion {
  /**
   * Constructs the SimulateInvasion instance.
   *
   * @param {object} worldMap wordMap Instance for this simulation.
   * @param {int} numOfAliens is the total number of aliens specified in the command line input.
   */
  constructor(worldMap, numOfAliens) {
    this.worldMap = worldMap;
    this.numOfAliens = numOfAliens;
    this.allCities = this.worldMap.getCities(); // could be used in various operations.
    this.maximumIterations = 10000;
    this.alienMoves = 0;
    this.aliensTrapped = false;
    this.aliensMap = {};
  }

  /**
   * Initialise the simulation from here.
   * it calls the worldMap insance to parse input cities
   */
  init() {
    this.worldMap.parseMap();
  }

  /**
   * It starts playing the simulation and responsible for running the iterations
   * and scattering aliens on world map.
   */
  play() {
    if (this.numOfAliens < 2) {
      throw new Error(`Too few aliens to run this simulation`);
    }

    // Scatter the aliens
    this.spreadAliensOnMap();

    // Run each iteration till 10,000 times
    for (var i = 0; i < this.maximumIterations; i++) {
      let numOfMoves = this.playIteration();

      if (numOfMoves === 0) {
        this.aliensTrapped = true;
        break;
      }

      this.alienMoves += numOfMoves;
    }

    this.calulateSimulationResults();
  }

  /**
   * spreadAliensOnMap() is called only once in each invasion simulation and
   * responsible for placing aliens on the cities using Math.random().
   *
   * NOTE: we can use something like deterministic.js which is better than Math.random()
   * to achieve code execution consistency while running code in distributed environment.
   */
  spreadAliensOnMap() {
    let citiesArr = Object.keys(this.allCities);
    // choose random city from all available cities
    for (var i = 0; i < this.numOfAliens; i++) {
      let cityIndex = Math.floor(Math.random() * citiesArr.length);

      // assign alien to city
      let alien = new Alien(generateName(), citiesArr[cityIndex]);
      let newAlien = alien.getAlien();

      // Keep a map of aliens in order to do fast calculations when we need to
      // search and update aliens data.
      this.aliensMap[newAlien.name] = newAlien;
    }

    return true;
  }

  /**
   * playIteration runs a single iteration of our simulation
   *
   * @return {numOfMoves} maximum number of moves each alien can make in an iteration.
   */
  playIteration() {
    let moves = 0;
    let activeAliens = {};

    let aliensArr = Object.keys(this.aliensMap);

    aliensArr.forEach(alien => {
      if (!this.aliensMap[alien].dead) {
        let city = this.aliensMap[alien].city,
          name = this.aliensMap[alien].name;

        // Keep a map of activeAliens in {"cityName":[alien1, alien2]} form.
        // it would make easy to destroy city and number of aliens present.
        if (activeAliens[city] !== undefined) {
          let value = activeAliens[city];
          value.push(name);
          activeAliens[city] = value;
        } else {
          activeAliens[city] = [name];
        }
      }
    });

    // if we have two or more aliens in a particular city, they kill each other and
    // destroy the city.
    let activeAliensInCities = Object.keys(activeAliens);

    activeAliensInCities.forEach(city => {
      let aliens = activeAliens[city];

      if (aliens.length > 1) {
        // destroy city and both aliens
        let cityName = this.allCities[city].name;
        this.allCities[city].destroyed = true;

        // kill all aliens in a city
        aliens.forEach(alien => {
          let searchAlien = this.aliensMap[alien];
          searchAlien.dead = true;
        });

        this.printCityDestroyed(this.allCities[city].name, aliens);
      }
    });

    aliensArr.forEach(alien => {
      if (!this.aliensMap[alien].dead) {
        // move the alien randomly in the available directions.
        let isMoved = this.moveAlienRandomly(
          this.aliensMap[alien],
          this.allCities
        );

        if (isMoved) {
          moves = 1;
        }
      }
    });

    return moves;
  }

  /**
   * Collects aliens and cities which are left out in world and prints the
   * results in console.
   */
  calulateSimulationResults() {
    // calculate aliveAliens
    let aliensArr = Object.keys(this.aliensMap);

    let leftAliens = 0,
      aliveAliens = [];

    aliensArr.forEach(alien => {
      if (!this.aliensMap[alien].dead) {
        leftAliens++;
        aliveAliens.push(this.aliensMap[alien]);
      }
    });

    //calculate left cities
    let leftCities = [];

    let citiesArr = Object.keys(this.allCities);

    citiesArr.forEach(city => {
      if (!this.allCities[city].destroyed) {
        leftCities.push(this.allCities[city]);
      }
    });

    this.printResults(aliveAliens, leftCities);

    return {
      aliveAliens: aliveAliens,
      leftCities: leftCities
    };
  }

  /**
   * moveAlienRandomly moves the alien in an available direction.
   *
   * @param {object} alien alien we want to move.
   * @param {object} cities all available cities.
   *
   * @return {boolean} true in case of alien moved successfully and false if not.
   */
  moveAlienRandomly(alien, cities) {
    let cityNames = Object.keys(cities);
    let nearByCities = cities[alien.city];
    let nearByCitiesArr = Object.keys(nearByCities);
    let moved = 0;

    for (var i = 0; i < nearByCitiesArr.length; i++) {
      let cityIndex = Math.floor(Math.random() * 3);
      let cityName = nearByCities[nearByCitiesArr[cityIndex]];
      if (
        cityName !== "" &&
        cities[cityName] !== undefined &&
        !cities[cityName].destroyed
      ) {
        alien.city = cityName;
        return true;
      }
    }

    return false;
  }

  printCityDestroyed(city, aliensPresent) {
    if (aliensPresent.length === 2) {
      console.log(
        `${city} has been destroyed by ${aliensPresent[0]} and ${
          aliensPresent[1]
        }`
      );
    } else {
      console.log(`${city} has been destroyed by ${aliensPresent}`);
    }
  }

  printResults(aliens, cities) {
    console.log("\n+++++++++++ Cities +++++++++++");

    cities.forEach(city => {
      let result = city.name;

      if (city.connections.north && city.connections.north !== undefined) {
        result = `${city.name} north=${city.connections.north}`;
      }
      if (city.connections.south && city.connections.south !== undefined) {
        result = `${city.name} south=${city.connections.south}`;
      }
      if (city.connections.east && city.connections.east !== undefined) {
        result = `${city.name} east=${city.connections.east}`;
      }
      if (city.connections.west && city.connections.west !== undefined) {
        result = `${city.name} west=${city.connections.west}`;
      }
      console.log(result);
    });
    console.log("-------------------------------");

    console.log("\n+++++++++++ Aliens +++++++++++");
    aliens.forEach(alien => {
      console.log(`${alien.name} is in ${alien.city}`);
    });
    console.log("-------------------------------");
  }

  getAliens() {
    return this.aliensMap;
  }
}

module.exports = { SimulateInvasion };
