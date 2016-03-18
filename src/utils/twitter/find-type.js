'use strict';

module.exports = function( _type, _params ){

    var url = '';

    switch ( _type ) {
        case 'home_timeline':
        case 'home':
            url = 'home_timeline';
            break;
        case 'mentions_timeline':
        case 'mentions':
            url = 'mentions_timeline';
            break;
        case 'user_timeline':
        case 'user':
            if (!_params.user_id && !_params.screen_name) {
                throw new Error('Always specify either an user_id or screen_name when requesting a user timeline.');
            }
            url = 'user_timeline';
            break;
        case 'retweets_of_me':
        case 'retweets':
            url = 'retweets_of_me';
            break;
        default:
            throw new Error('Please specify an existing type.');
    }

    return url;
};
