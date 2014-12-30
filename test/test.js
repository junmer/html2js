/**
 * @file test
 * @author junmer[junmer@foxmail.com]
 */

/* eslint-disable no-console */
/* eslint-env node */

var vows = require('vows');
var assert = require('assert');
var extend = require('extend');

var fs = require('fs');
var path = require('path');
var html2js = require('../html2js');

var filename = 'test.html';
var filePath = path.resolve(__dirname, filename);
var source = fs.readFileSync(filePath, 'utf8');


/**
 * runJs replace eval
 *
 * @param  {string} code code
 * @return {any}
 */
function runJs(code) {
    return new Function('return ' + code)();
}

// basic case
var basicCase = {

    'type is string': function (topic) {
        assert.equal(typeof (topic), 'string');
    }

};

// eval case
var evalCase = {

    'can be eval': function (topic) {
        assert.doesNotThrow(function () {
            runJs(topic);
        }, Error);
    },

    'eval return type is string': function (topic) {
        assert.equal(typeof (runJs(topic)), 'string');
    }

};

// Create a Test Suite
vows.describe('html2js').addBatch({

    'default': extend({
        topic: function () {
            return html2js(source);
        }

    }, basicCase, evalCase),

    'use format mode': extend({
        topic: function () {
            return html2js(source, {
                mode: 'format'
            });
        },

        'has `\\n`': function (topic) {
            assert.ok(/\n/.test(topic));
        }

    }, basicCase, evalCase),

    'use compress mode': extend({
        topic: function () {
            return html2js(source, {
                mode: 'compress'
            });
        },

        'has not `\\n`': function (topic) {
            assert.ok(!/\n/.test(topic));
        }

    }, basicCase, evalCase),

    'with amd wrapper': extend({
        topic: function () {
            return html2js(source, {
                wrap: 'amd'
            });
        },

        'has `define`': function (topic) {
            assert.ok(/define/.test(topic));
        }

    }, basicCase),

    'with commonjs wrapper': extend(basicCase, {
        topic: function () {
            return html2js(source, {
                wrap: 'commonjs'
            });
        },

        'has `module.exports`': function (topic) {
            assert.ok(/module\.exports/.test(topic));
        }

    }, basicCase)

}).run(); // Run it
