"use strict";
const assert = require("assert");
const { WorldMap } = require("../src/world_map");

describe("World Map class implementation", () => {
  let map = [
    "Bremen south=Delmenhorst east=Luneburg north=Bremerhaven west=Oldenburg"
  ];

  let worldMap = new WorldMap(map);
  it("pass a map array , should creates a new wordMap", () => {
    assert.deepEqual(worldMap.map, map);
    assert.deepEqual(worldMap.cities, {});
  });

  it("should get the cities from worldMap", () => {
    worldMap.parseMap();
    assert.deepEqual(worldMap.getCities(), {
      Bremen: {
        connections: {
          south: "Delmenhorst",
          east: "Luneburg",
          north: "Bremerhaven",
          west: "Oldenburg"
        },
        destroyed: false,
        name: "Bremen"
      }
    });
  });

  it("should throw an error for invalid map item", () => {
    assert.throws(
      () => {
        worldMap.parseMapItem("");
      },
      Error,
      "Invalid mapItem"
    );
  });

  it("should throw an error for atleast one direction is required", () => {
    assert.throws(
      () => {
        worldMap.parseMapItem("Bremen");
      },
      Error,
      "Require at least one direction in format CityName direction=OtherCity"
    );
  });

  it("should throw an error for invalid city direction format", () => {
    assert.throws(
      () => {
        worldMap.parseMapItem("Bremen northwest=");
      },
      Error,
      "City format should be of the form direction=CityName"
    );
  });
});
