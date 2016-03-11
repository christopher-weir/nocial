'use strict';

var oauth = require('oauth');

module.exports = function( options ) {

    var twitterOauth = new oauth.OAuth(
        'https://twitter.com/oauth/request_token',
        'https://twitter.com/oauth/access_token',
        options.twitter.key,
        options.twitter.secret,
        '1.0A',
        null,
        'HMAC-SHA1'
    );

    return twitterOauth;
};
