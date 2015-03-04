# html2js
[![NPM version](http://img.shields.io/npm/v/html2js.svg)](https://npmjs.org/package/html2js)
[![Build Status](https://travis-ci.org/junmer/html2js.svg?branch=master)](https://travis-ci.org/junmer/html2js)

> simple html2js processer, i use it solve requirejs text crossdomain


## Useage

html2js(source[, options])

Options:

* `mode`: A string naming js code style. Optional. Possible values:
    * `undefined` (default): keep space and carriage of source html
    * `compress`: strip the extra spaces or carriage at the beginnings and ends of the lines
    * `format`: format js code as [spec](https://github.com/ecomfe/spec/blob/master/javascript-style-guide.md#%E5%BB%BA%E8%AE%AE-%E4%BD%BF%E7%94%A8-%E6%95%B0%E7%BB%84-%E6%88%96--%E6%8B%BC%E6%8E%A5%E5%AD%97%E7%AC%A6%E4%B8%B2)

* `wrap`: A string naming js code wrapper. Optional. Possible values:
    * `undefined` (default): no wrapper
    * `amd`: wrap with [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)
    * `commonjs`: wrap with [CommonJS](http://www.commonjs.org/)

* `ignoreScriptTag`: boolean to ignore fix [split the script tag when writing it with document write](http://stackoverflow.com/questions/236073/why-split-the-script-tag-when-writing-it-with-document-write). Defaults to `false`

## Example

```
npm run example
```

test.html:

```html
<div id="i-am-a-id">
  <div class="i-am-a-class">
    i am test
  </div>
</div>
```

test.html.js:

```
/**
 * html2js(source, {
 *     mode: 'default'
 *     wrap: 'amd'
 * })
 */
define(function () {return '<div id="i-am-a-id">\n  <div class="i-am-a-class">\n    i am test\n  </div>\n</div>\n<script>\n    var test = \'test\';\n    alert(test);\n</'+'script>\n';});

/**
 * html2js(source, {
 *     mode: 'default'
 *     wrap: 'commonjs'
 * })
 */
module.exports = '<div id="i-am-a-id">\n  <div class="i-am-a-class">\n    i am test\n  </div>\n</div>\n<script>\n    var test = \'test\';\n    alert(test);\n</'+'script>\n';

/**
 * html2js(source, {
 *     mode: 'default'
 *     wrap: false
 * })
 */
'<div id="i-am-a-id">\n  <div class="i-am-a-class">\n    i am test\n  </div>\n</div>\n<script>\n    var test = \'test\';\n    alert(test);\n</'+'script>\n'

/**
 * html2js(source, {
 *     mode: 'format'
 *     wrap: 'amd'
 * })
 */
define(function () {
    return ''
        + '<div id="i-am-a-id">'
        +   '<div class="i-am-a-class">'
        +     'i am test'
        +   '</div>'
        + '</div>'
        + '<script>'
        +     'var test = \'test\';'
        +     'alert(test);'
        + '</'+'script>'
        + '';
});

/**
 * html2js(source, {
 *     mode: 'format'
 *     wrap: 'commonjs'
 * })
 */
module.exports = ''
        + '<div id="i-am-a-id">'
        +   '<div class="i-am-a-class">'
        +     'i am test'
        +   '</div>'
        + '</div>'
        + '<script>'
        +     'var test = \'test\';'
        +     'alert(test);'
        + '</'+'script>'
        + '';

/**
 * html2js(source, {
 *     mode: 'format'
 *     wrap: false
 * })
 */
''
        + '<div id="i-am-a-id">'
        +   '<div class="i-am-a-class">'
        +     'i am test'
        +   '</div>'
        + '</div>'
        + '<script>'
        +     'var test = \'test\';'
        +     'alert(test);'
        + '</'+'script>'
        + ''

/**
 * html2js(source, {
 *     mode: 'compress'
 *     wrap: 'amd'
 * })
 */
define(function () {return '<div id="i-am-a-id"><div class="i-am-a-class">i am test</div></div><script>var test = \'test\';alert(test);</'+'script>';});

/**
 * html2js(source, {
 *     mode: 'compress'
 *     wrap: 'commonjs'
 * })
 */
module.exports = '<div id="i-am-a-id"><div class="i-am-a-class">i am test</div></div><script>var test = \'test\';alert(test);</'+'script>';

/**
 * html2js(source, {
 *     mode: 'compress'
 *     wrap: false
 * })
 */
'<div id="i-am-a-id"><div class="i-am-a-class">i am test</div></div><script>var test = \'test\';alert(test);</'+'script>'
```

## Test

```
npm test
```
