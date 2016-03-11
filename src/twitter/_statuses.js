'use strict';

var oauth = require('./_oauth.js');
var querystring = require('querystring');

module.exports = function( nocial, options ) {

    return new Promise(function(_resolve, _reject) {

        var type = options.type.toLowerCase();
        var url = '';
        var errorMessage = '';
        var method = 'GET';

        switch (type) {
            case 'retweets':
                url = 'retweets/' + options.params.id;
                delete options.params.id;
                break;
            case 'show':
                url = 'show/' + options.params.id;
                delete options.params.id;
                break;
            case 'lookup':
                url = 'lookup';
                method = 'POST';
                break;
            case 'destroy':
                url = 'destroy/' + options.params.id;
                delete options.params.id;
                method = 'POST';
                break;
            case 'update':
                method = 'POST';
                break;
            case 'retweet':
                url = 'retweet/' + options.params.id;
                delete options.params.id;
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
