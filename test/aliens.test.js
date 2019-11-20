"use strict";
const assert = require("assert");

const { Alien } = require("../src/aliens");
describe("Alien class implementation", () => {
  let name = "alien1",
    city = "Brazil";

  let alien = new Alien(name, city);
  it("pass a name and city, should creates a new alien", () => {
    assert.equal(alien.name, name);
    assert.equal(alien.city, city);

    assert.deepEqual(alien.getAlien(), { name: name, city: city, dead: false });
  });

  it("should get the created alien", () => {
    assert.deepEqual(alien.getAlien(), { name: name, city: city, dead: false });
  });
});
