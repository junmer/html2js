/**
 * @file html2js
 * @author junmer[junmer@foxmail.com]
 */
(function () {

    'use strict';

    /**
     * 字符串去两边空格
     *
     * @inner
     * @param {string} source 目标字符串
     * @return {string}
     */
    function trim(source) {
        return String(source)
            .replace(
                new RegExp('(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)', 'g'),
                ''
        );
    }

    /**
     * wrap 包成 AMD 代码
     *
     * @inner
     * @param {string} content 目标字符串
     * @param {bolean=} format 格式化标识
     * @return {string}
     */
    function wrap(content, format) {
        if(!!format){
            return [
                "define(function () {",
                "    return ''",
                "    + " + content + ";",
                "});"
            ].join('\n');
        }
        else{
            return ""
                + "define(function () { return '"
                + content
                + "';});";
        }
    }


    /**
     * html2js
     * @param  {String} content 目标
     * @param  {Object=} opt     配置
     * @param  {String} opt.mode     模式 compress|format|default
     * @param  {String} opt.wrap     转AMD
     * @return {String}
     */
    function html2js(content, opt) {
        var options = arguments.length > 1 ? opt : {};
        var output;

        if (options.mode === 'compress') {
            // 全压缩
            var arrCode = [];
            content.replace(/\\/g, '\\\\')
                .replace(/[\n]/g, '\\n')
                .replace(/[\r]/g, '\\r')
                .replace(/['"]/g, function (match) {
                    return '\\' + match;
                })
                .split('\\n')
                .forEach(function (str) {
                    arrCode.push(trim(str));
                });

            output = arrCode.join('');
        }
        else if (options.mode === 'format') {
            // 不压缩 + 连接
            output = content.replace(/\\/g, '\\\\')
                .replace(/'/g, '\\\'')
                .replace(/\r?\n/g, '\\n\'\n    + \'');

            output = "'" + output + "'";
        }
        else {
            // 默认
            // 不压缩 无+连接
            // 参考 requirejs text
            // see: http://github.com/requirejs/text for details
            output = content.replace(/(['\\])/g, '\\$1')
                .replace(/[\f]/g, '\\f')
                .replace(/[\b]/g, '\\b')
                .replace(/[\n]/g, '\\n')
                .replace(/[\t]/g, '\\t')
                .replace(/[\r]/g, '\\r')
                .replace(/[\u2028]/g, '\\u2028')
                .replace(/[\u2029]/g, '\\u2029');
        }

        if (options.wrap) {
            if (options.mode === 'format') {
                output = wrap(output, true);
            }
            else {
                output = wrap(output);
            }
        }

        return output;

    }

    if (typeof exports !== 'undefined') {
        // Node.js module.
        module.exports = exports = html2js;
    } else if (typeof window === 'object') {
        // Browser loading.
        window.html2js = html2js;
    }

}());