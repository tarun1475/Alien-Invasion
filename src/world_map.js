const { City } = require("./cities");

/**
 * WorldMap interface and implementation.
 */

class WorldMap {
  /**
   * Constructs a world map.
   *
   * @param {Array} map is the array of cities we want to build on the map.
   */
  constructor(map) {
    this.map = map;
    this.cities = {};
  }

  /**
   * parseMap parses the each line present in the input and making it a world map directed graph
   data structure which is represented as a adjacency list.

   * we are choosing to represent our world map as a adjacency list because of couple of
   * benifits it offer over adjacency matrix and edge list.

   *  NOTE: we can also add distances as weight to each city so that when alien chooses to
              move we will find the shortest distance and move alien accordingly.
   */
  parseMap() {
    this.map.forEach(mapItem => {
      let worldMap = this.parseMapItem(mapItem);
    });
  }

  parseMapItem(mapItem) {
    let city, addedCity;
    if (!mapItem) {
      throw new Error("Invalid mapItem");
    }
    const mapItemSplit = mapItem.split(" ");
    if (mapItemSplit.length < 2) {
      throw new Error(
        `Require at least one direction in format CityName direction=OtherCity`
      );
    }

    mapItemSplit.forEach((item, index) => {
      if (index === 0) {
        city = new City(item);
      } else {
        const itemSplit = item.split("=");

        if (itemSplit.length !== 2) {
          throw new Error(
            `City format should be of the form direction=CityName`
          );
        }

        let direction = itemSplit[0],
          newCity = itemSplit[1];

        this.cities[city.name] = city.connectCity(newCity, direction);
      }
    });
  }

  getCities() {
    return this.cities;
  }
}

module.exports = { WorldMap };
