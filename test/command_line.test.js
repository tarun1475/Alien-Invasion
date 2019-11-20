"use strict";
const assert = require("assert");

const CommandlineUtils = require("../src/utils/commandline");

describe("CommandlineUtils.parse(cmdArgs[])", () => {
  it("empty array - cmdArgs[]", () => {
    assert.equal(CommandlineUtils.parse([]), null);
  });

  it("array less than 4 - cmdArgs['node', 'game.js']", () => {
    assert.equal(CommandlineUtils.parse(["node", "game.js"]), null);
  });

  it("without values values(--map and --aliens) - cmdArgs['node', 'game.js', '--world=map-1', '--count=3']", () => {
    assert.equal(
      CommandlineUtils.parse(["node", "game.js", "--world=map-1", "--count=3"]),
      null
    );
  });

  it("when --aliens value is not a number - cmdArgs['node', 'game.js', '--map=map-1', '--aliens=three']", () => {
    assert.equal(
      CommandlineUtils.parse([
        "node",
        "game.js",
        "--map=map-1",
        "--aliens=three"
      ]),
      null
    );
  });

  it("when --aliens value is less than 1 - cmdArgs['node', 'game.js', '--map=map-1', '--aliens=0']", () => {
    assert.equal(
      CommandlineUtils.parse(["node", "game.js", "--map=map-1", "--aliens=0"]),
      null
    );
  });

  it("cmdArgs['node', 'game.js', '--map=map-1', '--aliens=3']", () => {
    const obj = CommandlineUtils.parse([
      "node",
      "game.js",
      "--map=map-1",
      "--aliens=3"
    ]);
    assert.equal(obj.mapPath, "map-1");
    assert.equal(obj.alienCount, 3);
  });
});
