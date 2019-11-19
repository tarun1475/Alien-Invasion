"use strict";

const Game = require("./src/game");

(() => {
  try {
    Game.buildSimulation(process.argv);
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
})();
