"use strict";
const assert = require("assert");
const fs = require("fs");

const FileUtils = require("../src/utils/file_utils");

describe("FileUtils.readFile(filePath)", () => {
  before(() => {
    fs.writeFileSync("empty-file");
    fs.writeFileSync("one-line", "Foo north=Bar west=Baz");
    fs.writeFileSync(
      "multiple-lines",
      "Foo north=Bar west=Baz\nFoo north=Bar west=Baz\nFoo north=Bar west=Baz"
    );
  });

  it("pass non existing file, should return undefined", () => {
    assert.equal(FileUtils.readFile("no-file"), undefined);
  });

  it("pass empty file, should return null", () => {
    assert.equal(FileUtils.readFile("empty-file"), null);
  });

  it("pass one-line file, should return an array with length 1", () => {
    const arr = ["Foo north=Bar west=Baz"];
    assert.deepEqual(FileUtils.readFile("one-line"), arr);
  });

  it("pass multiple-lines file, should return an array with length equal to number of lines in file", () => {
    assert.deepEqual(FileUtils.readFile("multiple-lines"), [
      "Foo north=Bar west=Baz",
      "Foo north=Bar west=Baz",
      "Foo north=Bar west=Baz"
    ]);
  });

  after(() => {
    fs.unlinkSync("empty-file");
    fs.unlinkSync("one-line");
    fs.unlinkSync("multiple-lines");
  });
});
