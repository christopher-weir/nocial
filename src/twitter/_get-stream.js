'use strict';

var nocial = require('../nocial.js');



module.exports = function(type, params, accessToken, accessTokenSecret) {

    return new Promise(function(_resolve, _reject) {
        type = type.toLowerCase();

        var url = '';
        var method = 'GET';

        switch (type) {
            case 'userstream':
            case 'user':
                url = 'https://userstream.twitter.com/1.1/user.json';
                break;
            case 'sitestream':
            case 'site':
                url = 'https://sitestream.twitter.com/1.1/site.json';
                break;
            case 'sample':
                url = 'https://stream.twitter.com/1.1/statuses/sample.json';
                break;
            case 'firehose':
                url = 'https://stream.twitter.com/1.1/statuses/firehose.json';
            break;
            case 'filter':
                method = 'POST';
                url = 'https://stream.twitter.com/1.1/statuses/filter.json';
                break;
            default:
                var errorMessage = 'Please specify an existing type.';
                _reject({
                    message: errorMessage,
                    e: new Error(errorMessage)
                });
                return false;
        }

    });

};
