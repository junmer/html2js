var fs = require('fs');
var html2js = require('../html2js');

var filename = 'test.html';

var html = fs.readFileSync(filename, 'utf8');

var modes = ['format', 'default', 'compress'];

var output = modes.map(
    function (mode) {
        return ''
            + '// '
            + mode
            + '\n'
            + html2js(html, {
                mode: mode,
                wrap: true
            });
    }
).join('\n');

console.log(output);
fs.writeFile( filename + '.js', output );