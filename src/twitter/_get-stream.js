'use strict';

var nocial = require('../nocial.js');
var querystring = require('querystring');

module.exports = function(type, params, accessToken, accessTokenSecret, dataCallback) {

    return new Promise(function(_resolve, _reject) {
        type = type.toLowerCase();

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
            req = this.oa.get(url + '?' + querystring.stringify(params), accessToken, accessTokenSecret);
        } else {
            req = this.oa.post(url, accessToken, accessTokenSecret, params, null);
        }

        req.addListener('response', function(res) {
            res.setEncoding('utf-8');
            res.addListener('data', function(chunk) {
                if (chunk === '\r\n') {
                    dataCallback(null, {}, chunk, res);
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
                    dataCallback(null, parsedRet, ret, res);
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
