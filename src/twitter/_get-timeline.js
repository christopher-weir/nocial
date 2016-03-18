'use strict';

var querystring = require('querystring');
var oauth       = require('./_oauth.js');
var findType    = require('../utils/twitter/find-type');
var utils = require('../utils');



module.exports = function( _type, _nocial, _params ) {

    return new Promise(function(_resolve, _reject) {

        var type = _type.toLowerCase();
        var url = '';
        var errorMessage = '';
        var params = _params;


        // check tokens
        try {
            params = utils.helpers.validateParams.twitter( _params );
        } catch (e) {
            _reject(e);
            return false;
        }

        // check params options

        // if (!_params.params.user_id && !_params.params.screen_name) {
        //
        //     errorMessage = 'Always specify either an user_id or screen_name when requesting a user timeline.';
        //     _reject({
        //         message: errorMessage,
        //         error: new Error(errorMessage)
        //     });
        //     return false;
        // }

        try {
            url = findType( _type );
        } catch ( error ) {
            _reject(error);
            return false;
        }


        oauth( _nocial ).get(
            _nocial.twitter.baseUrl + 'statuses/' + url + '.json?' + querystring.stringify(_params.params),
            _params.accessToken,
            _params.accessTokenSecret,
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
