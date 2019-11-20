"use strict";
const assert = require("assert");
const { City } = require("../src/cities");

describe("City class implementation", () => {
  let name = "City1";
  let otherCity = "City2",
    direction = "south";

  let city = new City(name);
  it("pass a name , should creates a new city", () => {
    assert.equal(city.name, name);
    assert.deepEqual(city.connections, {});
    assert.equal(city.destroyed, false);
  });

  it("should get the created city", () => {
    assert.deepEqual(city.get(), {
      name: name,
      connections: {},
      destroyed: false
    });
  });

  it("should connect the city in the specified direction", () => {
    assert.deepEqual(city.connectCity(otherCity, direction), {
      name: name,
      connections: { south: "City2" },
      destroyed: false
    });
  });

  it("should throw an error for city already exists", () => {
    assert.throws(
      () => {
        city.connectCity(otherCity, direction);
      },
      Error,
      "Some city alreads exists in this direction"
    );
  });

  it("should throw an error for invalid direction", () => {
    assert.throws(
      () => {
        city.connectCity(otherCity, "northwest");
      },
      Error,
      "Not a valid direction (direction can be north, south, east, west)"
    );
  });
});
