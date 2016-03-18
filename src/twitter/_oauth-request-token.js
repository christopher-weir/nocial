'use strict';

var oauth = require('./_oauth.js');

module.exports = function(_nocial) {

    return new Promise(function(_resolve, _reject) {

        oauth(_nocial).getOAuthRequestToken({
                x_auth_access_type: _nocial.x_auth_access_type
            },
            function(error, oauthToken, oauthTokenSecret, results) {
                if (error) {
                    _reject({
                        error: error
                    });
                } else {
                    _resolve({
                        error: null,
                        oauthToken: oauthToken,
                        oauthTokenSecret: oauthTokenSecret,
                        results: results
                    });
                }
            }
        );
    });
};
