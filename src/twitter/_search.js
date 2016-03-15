'use strict';

var oauth = require('./_oauth.js');
var querystring = require('querystring');

module.exports = function(nocial, options) {


    return new Promise(function(_resolve, _reject) {

        var errorMessage = '';

        oauth(nocial).get(
            nocial.twitter.baseUrl + 'search/tweets.json?' + querystring.stringify(options.params),
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
