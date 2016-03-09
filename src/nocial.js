'use strict';

var oauth = require('oauth');

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

    this.twitterOAuth = null;

    this.init = function(_opts) {

        // set the options
        self.options = utils.helpers.extend(defaultOptions, _opts || {});

        // if there is a twitter key and secret
        // create the twitter OAuth
        if (self.options.twitter.key && self.options.twitter.secret) {

            self.twitterOAuth = new oauth.OAuth(
                'https://twitter.com/oauth/request_token',
                'https://twitter.com/oauth/access_token',
                self.options.twitter.key,
                self.options.twitter.secret,
                '1.0A',
                null,
                'HMAC-SHA1'
            );

        }
    };

    this.twitter = twitter;

};



defaultInstance = new Nocial();
exports.init = defaultInstance.init;
exports.options = defaultInstance.options;
exports.twitterOAuth = defaultInstance.twitterOAuth;
exports.twitter = defaultInstance.twitter;
