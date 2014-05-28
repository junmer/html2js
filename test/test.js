/**
 * @file simple test
 */

var fs          = require('fs');
var path        = require('path');
var html2js     = require('../html2js');

var filename    = 'test2.html';
var filePath    = path.resolve( __dirname, filename );
var html        = fs.readFileSync( filePath , 'utf8' );
var modes       = ['format', 'default', 'compress'];

var output      = modes.map(
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

fs.writeFile( filePath + '.js', output );