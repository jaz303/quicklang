var fs          = require('fs');
var filename    = process.argv[2];
var source      = fs.readFileSync(filename, 'utf8');

// var parser = require('./lib/parser');
// var ast = parser.parse(source + "\n");

// console.log(require('util').inspect(ast, {depth: null, colors: true}));

// require('./lib/interpret')(ast);