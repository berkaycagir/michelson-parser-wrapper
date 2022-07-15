#!/usr/bin/env node

var nearley = require("../lib/nearley/lib/nearley.js");
var StreamWrapper = require("../lib/nearley/lib/stream.js");

var output = process.stdout;

var filename = require("path").join(
  __dirname,
  "../lib/michelson-parser/grammar.cjs"
);
var grammar = nearley.Grammar.fromCompiled(require(filename));
var parser = new nearley.Parser(grammar);

var writeResults = function (writeStream, parser) {
  writeStream.write(
    require("util").inspect(parser.results, {
      depth: null,
      maxArrayLength: null,
      maxStringLength: null,
    })
  );
  writeStream.write("\n");
};
process.stdin.pipe(new StreamWrapper(parser)).on("finish", function () {
  writeResults(output, parser);
});
