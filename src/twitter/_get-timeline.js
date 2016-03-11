'use strict';

var querystring = require('querystring');

var oauth = require('./_oauth.js');

module.exports = function( nocial, options ) {

    return new Promise(function(_resolve, _reject) {
        var type = options.type.toLowerCase();

        var url = '';
        var errorMessage = '';

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
                if (!options.params.user_id && !options.params.screen_name) {

                    errorMessage = 'Always specify either an user_id or screen_name when requesting a user timeline.';
                    _reject({
                        message: errorMessage,
                        error: new Error(errorMessage)
                    });
                    return false;
                }
                url = 'user_timeline';
                break;
            case 'retweets_of_me':
            case 'retweets':
                url = 'retweets_of_me';
                break;
            default:

                errorMessage = 'Please specify an existing type.';
                _reject({
                    message: errorMessage,
                    error: new Error(errorMessage)
                });
                return false;
        }

        oauth( nocial ).get(
            nocial.twitter.baseUrl + 'statuses/' + url + '.json?' + querystring.stringify(options.params),
            options.accessToken,
            options.accessTokenSecret,
            function(error, data, response) {
                if (error) {
                    errorMessage = 'There was an error';
                    _reject({
                        message: errorMessage,
                        error: new Error(error)
                    });
                } else {
                    try {
                        _resolve({
                            data: JSON.parse(data),
                            response: response
                        });
                    } catch (e) {
                        errorMessage = 'There was an error parsing the data';
                        _reject({
                            message: errorMessage,
                            error: new Error(e)
                        });
                    }
                }
            }
        );
    });
};
