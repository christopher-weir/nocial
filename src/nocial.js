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
};


Nocial.prototype.twitter = function( _tokens ){

    var self = this;
    var methods = {};

    methods.getTimeline = function( _type, _params ) {

        return twitter.getTimeline(
            _type,
            self.options,
            utils.helpers.extend( _tokens, _params || {})
        );
    };

    return methods;
};


defaultInstance = new Nocial();
exports.init = defaultInstance.init;
exports.options = defaultInstance.options;
exports.twitter = defaultInstance.twitter;
