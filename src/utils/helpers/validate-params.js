'use strict';

exports.twitter = function( _tokens ) {

    if( !_tokens.key ){
        throw new Error('Please specify the users twitter token.');
    }
    else if( !_tokens.secret ){
        throw new Error('Please specify the users twitter secret.');
    }
    else {
        return _tokens;
    }
};
