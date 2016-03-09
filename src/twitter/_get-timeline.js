'use strict';

var nocial = require('../nocial.js');
var querystring = require('querystring');

module.exports = function( type, params, accessToken, accessTokenSecret ) {

    return new Promise(function( _resolve, _reject ) {
        type = type.toLowerCase();

        var url = null;

        switch (type) {
            case 'home_timeline':
            case 'home':
                url = 'home_timeline';
                break;
            case 'mentions_timeline':
            case 'mentions':
                url = 'mentions_timeline';
                break;
            case 'user_timeline':
            case 'user':
                if (!params.user_id && !params.screen_name) {
                    _reject('Always specify either an user_id or screen_name when requesting a user timeline.');
                    return false;
                }
                url = 'user_timeline';
                break;
            case 'retweets_of_me':
            case 'retweets':
                url = 'retweets_of_me';
                break;
            default:
                _reject('Please specify an existing type.');
                return false;
        }

        nocial.twitterOAuth.get(
            nocial.options.twitter.baseUrl + 'statuses/' + url + '.json?' + querystring.stringify( params ),
            accessToken,
            accessTokenSecret,
            function(error, data, response) {
                if (error) {
                    _reject(error);
                } else {
                    try {
                        _resolve(null, JSON.parse(data));
                    } catch (e) {
                        _resolve(e, data, response);
                    }
                }
            }
        );
    });
};
