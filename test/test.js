const formatter = require('../src/vue-formatter.js');
const fs = require('fs');

fs.readFile('./test/test.vue', 'utf8', function (err, data) {
    if (err) { throw err; }
    console.log(formatter(data));
});
