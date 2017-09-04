#!/usr/bin/env node
'use strict';
const formatter = require('./vue-formatter.js');
var code = '';
process.title = 'Vue Formatter';
process.stdin.setEncoding('utf8');

//TODO validar que sea vue
process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    //process.stdout.write(`data: ${chunk}`);
    code = formatter(chunk);
  }
});

process.stdin.on('end', () => {
  process.stdout.write(code);
});

// Error
process.on('uncaughtException', function(err) {
  console.error("Exception", err.stack);
  process.exit();
});
process.on('warning', function(warning) {
  //console.warn(warning.name); // Print the warning name
  console.warn('node:', warning.message); // Print the warning message
  //console.warn(warning.stack); // Print the stack trace
  process.exit();
});
