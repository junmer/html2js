/**
 * @file example
 * @author junmer[junmer@foxmail.com]
 */

/* eslint-disable no-console */

/* eslint-env node */
var fs = require('fs');
var path = require('path');
var html2js = require('../html2js');

var filename = 'test.html';
var filePath = path.resolve(__dirname, filename);
var source = fs.readFileSync(filePath, 'utf8');
var modes = [
    'default',
    'format',
    'compress'
];
var wraps = [
    'amd',
    'commonjs',
    false
];

console.log('source: \n\n' + source + '\n');

var useage = [
    '/**',
    ' * html2js(source, {',
    ' *     mode: ${mode}',
    ' *     wrap: ${wrap}',
    ' * })',
    ' */',
    ''
].join('\n');

function getStringOpt(opt) {
    return typeof opt === 'string' ? ('\'' + opt + '\'') : opt;
}

var output = modes.map(function (mode) {
    return wraps.map(function (wrap) {
        return ''
            + useage
                .replace('${mode}', getStringOpt(mode))
                .replace('${wrap}', getStringOpt(wrap))
            + html2js(source, {
                mode: mode,
                wrap: wrap
            });

    }).join('\n\n');

}).join('\n\n');

console.log('example:\n\n' + output);

fs.writeFile(filePath + '.js', output);
