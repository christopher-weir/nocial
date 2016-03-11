'use strict';

var utils = require('./utils');
var twitter = require('./twitter/twitter.js');

/**
 * nocial version number as a string.
 */
exports.version = '0.0.1';


/**
 * Nocial Options Object.
 * This object can be passed to many of the API-level Innie methods to control
 * various aspects of the engine. All keys are optional.
 */
var defaultOptions = {
    twitter: {
        key: null,
        secret: null,
        baseUrl: 'https://api.twitter.com/1.1/',
        uploadBaseUrl: 'https://upload.twitter.com/1.1/',
        authUrl: 'https://twitter.com/oauth/authenticate?oauth_token='
    }
};
var defaultInstance = null;


var Nocial = function() {

    var self = this;

    this.options = defaultOptions;

    this.init = function(_opts) {

        // set the options
        self.options = utils.helpers.extend(defaultOptions, _opts || {});

    };

    this.twitter = {};

    this.twitter.getTimeline = function(type, params, accessToken, accessTokenSecret) {

        var options = {
            type: type,
            params: params,
            accessToken: accessToken,
            accessTokenSecret: accessTokenSecret
        };

        return twitter.getTimeline(
            self.options,
            options
        );
    };

    this.twitter.getStream = function(type, params, accessToken, accessTokenSecret, dataCallback) {

        var options = {
            type: type,
            params: params,
            accessToken: accessToken,
            accessTokenSecret: accessTokenSecret,
            dataCallback: dataCallback
        };

        return twitter.getTimeline(
            self.options,
            options
        );
    };

    this.twitter.statuses = function(type, params, accessToken, accessTokenSecret) {

        var options = {
            type: type,
            params: params,
            accessToken: accessToken,
            accessTokenSecret: accessTokenSecret
        };

        return twitter.statuses(
            self.options,
            options
        );
    };

};



defaultInstance = new Nocial();
exports.init = defaultInstance.init;
exports.options = defaultInstance.options;
exports.twitter = defaultInstance.twitter;
