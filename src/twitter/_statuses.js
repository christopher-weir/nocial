'use strict';

var nocial = require('../nocial.js');
var querystring = require('querystring');

module.exports = function(type, params, accessToken, accessTokenSecret) {

    return new Promise(function(_resolve, _reject) {
        type = type.toLowerCase();

        var url = '';
        var errorMessage = '';
        var method = 'GET';

        switch (type) {
            case 'retweets':
                url = 'retweets/' + params.id;
                delete params.id;
                break;
            case 'show':
                url = 'show/' + params.id;
                delete params.id;
                break;
            case 'lookup':
                url = 'lookup';
                method = 'POST';
                break;
            case 'destroy':
                url = 'destroy/' + params.id;
                delete params.id;
                method = 'POST';
                break;
            case 'update':
                method = 'POST';
                break;
            case 'retweet':
                url = 'retweet/' + params.id;
                delete params.id;
                method = 'POST';
                break;
            case 'oembed':
                url = 'oembed';
                break;
            case 'upload_media':
                // todo
                // this.uploadMedia(params, accessToken, accessTokenSecret, callback);
                return;
            case 'update_with_media':
                errorMessage = '\'update_with_media\' type has been removed. Use \'upload_media\' instead';
                _reject({
                    message: errorMessage,
                    error: new Error(errorMessage)
                });
                return false;
            default:
                errorMessage = 'Please specify an existing type.';
                _reject({
                    message: errorMessage,
                    error: new Error(errorMessage)
                });
                return false;
        }


    });

};
