html2js
===

RT. html2js. 解决require tpl无法跨域的问题

## example

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
define(function () {return '<div id="i-am-a-id">\n  <div class="i-am-a-class">\n    i am test\n  </div>\n</div>';});

/**
 * html2js(source, {
 *     mode: 'default'
 *     wrap: 'commonjs'
 * })
 */
module.exports = '<div id="i-am-a-id">\n  <div class="i-am-a-class">\n    i am test\n  </div>\n</div>';

/**
 * html2js(source, {
 *     mode: 'default'
 *     wrap: false
 * })
 */
'<div id="i-am-a-id">\n  <div class="i-am-a-class">\n    i am test\n  </div>\n</div>'

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
        + '</div>';
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
        + '</div>';

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

/**
 * html2js(source, {
 *     mode: 'compress'
 *     wrap: 'amd'
 * })
 */
define(function () {return '<div id="i-am-a-id"><div class="i-am-a-class">i am test</div></div>';});

/**
 * html2js(source, {
 *     mode: 'compress'
 *     wrap: 'commonjs'
 * })
 */
module.exports = '<div id="i-am-a-id"><div class="i-am-a-class">i am test</div></div>';

/**
 * html2js(source, {
 *     mode: 'compress'
 *     wrap: false
 * })
 */
'<div id="i-am-a-id"><div class="i-am-a-class">i am test</div></div>'
```

## test

```
npm test
```
