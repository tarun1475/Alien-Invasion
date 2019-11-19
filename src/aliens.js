/**
 * Alien interface and implementation.
 */

class Alien {
  /**
   * Constructs a new alien.
   *
   * @param {string} name name of the alien.
   * @param {string} city city in which alient is present initially.
   */
  constructor(name, city) {
    this.name = name;
    this.city = city;
    this.dead = false;
  }

  getAlien() {
    return {
      name: this.name,
      city: this.city,
      dead: this.dead
    };
  }
}

module.exports = { Alien };
