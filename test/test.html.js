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