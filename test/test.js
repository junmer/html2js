var fs = require('fs');
var html2js = require('../html2js');

var filename = 'test.html';

var html = fs.readFileSync(filename, 'utf8');

var mode = ['format', 'default', 'compress'];

var arr = [];

mode.forEach(
    function (val) {
        arr.push( '// ' + val );
        arr.push( html2js( html, {mode: val, wrap: true} ) );
    }
);

var output = arr.join('\n');
console.log(output);
fs.writeFile( filename + '.js', output );