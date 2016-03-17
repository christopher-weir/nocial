'use strict';

module.exports = function( type ){

    var url = '';

    switch (type) {
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
