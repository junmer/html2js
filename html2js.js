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
                new RegExp(
                    '(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)',
                    'g'
                ),
                ''
        );
    }

    /**
     * 字符串格式化
     * 替换字符串中的${xx}字符
     * 将xx作为data的字段名或者参数
     * 用返回的结果加以替换
     * @see https://github.com/ecomfe/saber-string/blob/master/src/format.js
     *
     * @inner
     * @param {string} template 字符串模板
     * @param {Object|Array|Function} data 数据
     * @return {string}
     */
    function format(template, data) {
        if (!template) {
            return '';
        }

        if (data === null) {
            return template;
        }

        var replacer = typeof data === 'function'
                ? data
                : function (key) {
                    var res = data[key];
                    return res === null ? '' : res;
                };

        return (template + '').replace(/\$\{(.+?)\}/g, function (match, key) {
            return replacer(key);
        });
    }

    /**
     * WRAP_TPL
     *
     * @type {Object}
     */
    var WRAP_TPL = {
        'amd': [
            'define(function () {',
            '${tab}return ${content};',
            '});'
        ],
        'commonjs': [
            'module.exports = ${content};'
        ]
    };


    /**
     * wrap 包成 AMD/COMMONJS 代码
     *
     * @inner
     * @param {string} content 目标字符串
     * @param {string} wrapType 目标字符串
     * @param {bolean=} modeType 格式化标识
     * @return {string}
     */
    function wrap(content, wrapType, modeType) {

        // 不需要包的 直接返回 content
        if (!wrapType) {
            return content;
        }

        var isFormat = (modeType === 'format');

        // 默认用 amd wrapper
        var tpl = (WRAP_TPL[wrapType] || WRAP_TPL.amd).join(isFormat ? '\n' : '');

        var data = {
            content: content,
            tab: isFormat ? '    ' : ''     // 格式化补空格
        };

        return format(tpl, data);

    }

    /**
     * SPLIT_LINE_TOKEN
     * @type {RegExp}
     */
    var SPLIT_LINE_TOKEN = /\\r|\\n/;


    /**
     * html2js
     * @param  {string}     content 目标
     * @param  {Object=}    opt     配置
     * @param  {string＝}   opt.mode
     *                               compress 压缩
     *                               format   格式化
     *                               default  默认 不处理
     *
     * @param  {string=}    opt.wrap 包
     *                               amd
     *                               commonjs
     * @param {boolean=}     opt.ignoreScriptTag     忽略 script
     * @return {string}
     */
    function html2js(content, opt) {

        var options = arguments.length > 1 ? opt : {};  // 默认配置
        var output;                                     // 输出


        // 默认 esacpe
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


        // 全压缩
        if (options.mode === 'compress') {

            output = output.split(SPLIT_LINE_TOKEN)
                .map(function (str) {
                    return trim(str);
                })
                .join('');

        }

        // 不压缩 + 连接
        // 编码规范
        // https://github.com/ecomfe/spec/blob/master/javascript-style-guide.md
        if (options.mode === 'format') {

            // fix 首行
            output = '\\n' + output;

            output = output.split(SPLIT_LINE_TOKEN)
                .map(function (str) {
                    return str.replace(/(^\s*)/g, '$1\'') + '\'';
                })
                .join('\n        + ');

        }
        else {

            // fix 左右 '
            output = '\'' + output + '\'';

        }

        // 包起来

        output = wrap(output, options.wrap, options.mode);

        // fix script tag
        if (!options.ignoreScriptTag) {
            output = output.replace(/<\/script/g, '<\/\'+\'script');
        }

        return output;

    }

    if (typeof exports !== 'undefined') {
        /* eslint-env node */
        // Node.js module.
        module.exports = exports = html2js;
    } else if (typeof window === 'object') {
        // Browser loading.
        window.html2js = html2js;
    }

}());
