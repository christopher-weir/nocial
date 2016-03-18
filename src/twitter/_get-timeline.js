'use strict';

var querystring = require('querystring');
var oauth       = require('./_oauth.js');
var findType    = require('../utils/twitter/find-type');
var utils = require('../utils');



module.exports = function( _type, _nocial, _tokens, _params ) {

    return new Promise(function(_resolve, _reject) {

        var type = _type.toLowerCase();
        var url = '';
        var errorMessage = '';
        var tokens = null;


        // check tokens
        try {

            tokens = utils.helpers.validateTokens.twitter( _tokens );
            url = findType( _type );

        } catch (e) {
            _reject(e);
            return false;
        }


        oauth( _nocial ).get(
            _nocial.twitter.baseUrl + 'statuses/' + url + '.json?' + querystring.stringify(_params),
            tokens.token,
            tokens.secret,
            function(error, data, response) {
                if (error) {
                    _reject( 'There was an error: ' + error );
                } else {
                    try {
                        _resolve({
                            data: JSON.parse(data),
                            response: response
                        });
                    } catch (e) {
                        _reject( 'There was an error parsing the data: '+ e );
                    }
                }
            }
        );
    });
};
