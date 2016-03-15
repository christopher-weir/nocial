'use strict';

var innie       = require('../src/nocial');
var expect      = require('chai').expect;


function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

describe('Nocial Social:', function() {

    // test version
    describe('Version', function () {
        it('is 0.0.1', function () {

            expect( innie.version ).to.equal('0.0.1');

        });
    });



});
