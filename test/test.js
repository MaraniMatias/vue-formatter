"use strict";
const fs = require("fs");
const formatter = require("../src/vue-formatter.js");

fs.readFile("./test/test.vue", "utf8", function(err, data) {
  if (err) {
    throw err;
  }
  console.log(formatter(data));
});
