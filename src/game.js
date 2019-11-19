"use strict";

const CommandlineUtils = require("./utils/commandline");
const FileUtils = require("./utils/file_utils");
const { WorldMap } = require("./world_map");
const { SimulateInvasion } = require("./simulator");

exports.buildSimulation = processArgv => {
  let args;
  let fileLines;

  args = CommandlineUtils.parse(processArgv);
  if (!args) {
    throw new Error(`
        Missing or invalid commandline arguments.\n
        Format: npm start --map=$path_to_map_file --aliens=$number_of_aliens.\n
        NB: Number of cities should be more than number of aliens.
        `);
  }
  fileLines = FileUtils.readFile(args.mapPath);
  if (fileLines == undefined || !fileLines) {
    throw new Error(`
        Invalid or missing file: ${args.mapPath}
        `);
  }

  const worldMap = new WorldMap(fileLines);

  const invasion = new SimulateInvasion(worldMap, args.alienCount);
  invasion.init();
  invasion.play();
  invasion.calulateSimulationResults();
};
