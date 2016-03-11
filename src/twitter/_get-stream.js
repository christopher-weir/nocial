'use strict';

var querystring = require('querystring');

var oauth = require('./_oauth.js');

module.exports = function( nocial, options ) {

    return new Promise(function(_resolve, _reject) {

        var type = options.type.toLowerCase();
        var url = '';
        var req = '';
        var method = 'GET';
        var errorMessage = '';
        var msg = [];

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
                errorMessage = 'Please specify an existing type.';
                _reject({
                    message: errorMessage,
                    error: new Error(errorMessage)
                });
                return false;
        }


        if (method === 'GET') {
            req = oauth(nocial).get(url + '?' + querystring.stringify(options.params), options.accessToken, options.accessTokenSecret);
        } else {
            req = oauth(nocial).post(url, options.accessToken, options.accessTokenSecret, options.params, null);
        }

        req.addListener('response', function(res) {
            res.setEncoding('utf-8');
            res.addListener('data', function(chunk) {
                if (chunk === '\r\n') {
                    options.dataCallback(null, {}, chunk, res);
                    return;
                } else if (chunk.substr(chunk.length - 2) === '\r\n') {
                    msg.push(chunk.substr(0, chunk.length - 2));
                    var ret = msg.join('');
                    msg = [];

                    var parsedRet;
                    try {
                        parsedRet = JSON.parse(ret);
                    } catch (e) {
                        _reject({
                            message: 'Error while parsing Twitter-Response.',
                            error: e
                        });
                        return;
                    }
                    options.dataCallback(null, parsedRet, ret, res);
                    return;
                } else {
                    msg.push(chunk);
                    return;
                }
            });
            res.addListener('end', function() {
                _resolve(res);
            });
        });
        req.end();

    });

};
