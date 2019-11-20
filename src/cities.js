/**
 * City interface and implementation.
 */

const directions = new Set(["north", "south", "east", "west"]);

class City {
  /**
   * Constructs a new city.
   *
   * @param {string} name name of the city.
   */
  constructor(name) {
    this.connections = {};
    this.destroyed = false;
    this.name = name;
  }

  get() {
    return {
      connections: this.connections,
      destroyed: this.destroyed,
      name: this.name
    };
  }

  /**
   * connectCity is responsible for connecting city with otherCity in
   * the specified directions and also checks for whether the directions
   * given is valid or not and is there any city present in that direction.
   */
  connectCity(otherCity, direction) {
    direction = direction.toLowerCase();

    if (directions.has(direction)) {
      if (this.connections[direction]) {
        throw new Error(`Some city alreads exists in this direction`);
      }
      this.connections[direction] = otherCity;
    } else {
      throw new Error(
        `Not a valid direction (direction can be north, south, east, west)`
      );
    }

    // TODO: handle case for opposite directions also
    // place city in opposite direction of otherCity to ensure consistency.

    return this.get();
  }
}

module.exports = { City };
