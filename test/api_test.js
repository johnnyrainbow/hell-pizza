var chai = require('chai');
var expect = chai.expect;
var httpJson = require('../src/request/request')
var Status = require('../src/status_codes/codes.json')

describe('API', function () {
    describe('CheckAPIStatus', function () {
        it('should check if the API is online', function (done) {
            httpJson.get('/', function (err) {
                expect(err).to.not.be.null
                expect(err).to.equal(Status.error.bad_code + '404')
                done()
            })
        })
    })
})