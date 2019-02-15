var chai = require('chai');
var expect = chai.expect;
var User = require('../src/User')

describe('User', function () {
    describe('CheckRegisteredEmailExists', function () {
        it('should check if registered email exists', function (done) {
            var valid_email = 'npmtester@gmail.com'
            var user = new User()
            user.checkAccountExists(valid_email, function (err, response) {
                expect(err).to.be.null
                expect(response).not.to.be.null
                expect(response.first_name).not.to.be.null
                done()
            })
        })
    })
    describe('CheckUnregisteredEmailExists', function () {
        it('should check if unregistered email does not exist', function (done) {
            var valid_email = 'ewrgegi.asd.s.ad@g23sdadsd.213' //some email that will not exist in db
            var user = new User()
            user.checkAccountExists(valid_email, function (err) {
                expect(err).not.to.be.null
                done()
            })
        })
    })
    describe('checkLoginSuccess', function () {
        it('should check if can login with valid account', function (done) {
            var valid_email = 'npmtester@gmail.com' //pls do remember to replace this with some dummy acc lol
            var valid_password = "npmtester"
            var user = new User()
            user.login(valid_email, valid_password, function (err, response) {
                expect(err).to.be.null
                expect(response.access_token).not.to.be.null
                done()
            })
        })
    })
    describe('checkLoginFailure', function () {
        it('should check if can login with valid account', function (done) {
            var valid_email = 'npmtester@gmail.com' //pls do remember to replace this with some dummy acc lol
            var valid_password = "badpass"
            var user = new User()
            user.login(valid_email, valid_password, function (err, response) {
                expect(err).not.to.be.null
                done()
            })
        })
    })
})
