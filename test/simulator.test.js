"use strict";
const assert = require("assert");
const { SimulateInvasion } = require("../src/simulator");
const { WorldMap } = require("../src/world_map");

describe("Simulation Invasion class implementation", () => {
  let map = [
    "Bremen south=Delmenhorst east=Luneburg north=Bremerhaven west=Oldenburg",
    "Delmenhorst north=Bremen west=Meppen south=Nienburg",
    "Nienburg south=Hannover east=Celle north=Delmenhorst",
    "Hamburg south=Luneburg north=Norderstedt west=Bremerhaven east=Schwerin"
  ];

  let worldMap = new WorldMap(map);

  it("pass a wordMap Instance and numOfAliens , should creates a new Simulation", () => {
    let numOfAliens = 10;

    let invasion = new SimulateInvasion(worldMap, numOfAliens);
    assert.deepEqual(invasion.worldMap, worldMap);
    assert.deepEqual(invasion.numOfAliens, numOfAliens);
    assert.deepEqual(invasion.allCities, worldMap.getCities());
    assert.deepEqual(invasion.maximumIterations, 10000);
    assert.deepEqual(invasion.alienMoves, 0);
    assert.deepEqual(invasion.aliensTrapped, false);
    assert.deepEqual(invasion.aliensMap, {});
  });

  it("should throw an error for numOfAliens less than 2", () => {
    let numOfAliens = 1;
    let invasion = new SimulateInvasion(worldMap, numOfAliens);
    assert.throws(
      () => {
        invasion.init();
        invasion.play();
      },
      Error,
      "Too few aliens to run this simulation"
    );
  });

  it("should scatter aliens on worldMap", () => {
    let numOfAliens = 10;

    let invasion = new SimulateInvasion(worldMap, numOfAliens);
    invasion.init();
    assert.deepEqual(invasion.spreadAliensOnMap(), true);
  });
});
