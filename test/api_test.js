var chai = require('chai');
var expect = chai.expect;
var httpJson = require('../src/request/request')

describe('API', function () {
    describe('CheckAPIStatus', function () {
        it('should check if the API is online', function (done) {
            httpJson.get('/', function (response) {
                expect(response).to.not.be.null
                done()
            })
        })
    })
})