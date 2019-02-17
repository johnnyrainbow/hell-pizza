var chai = require('chai');
var expect = chai.expect;
var Store = require('../src/Store')
var User = require('../src/User')

describe('Store', function () {
    describe('CheckAllRegionStores', function () {
        it('should check if stores request is functional', function (done) {
            var store = new Store()
            store.getAllRegionStores(function (err, response) {
                expect(err).to.be.null
                expect(response).not.to.be.null
                expect(response.length).greaterThan(0)
                done()
            })
        })
    })

    describe('CheckSingleRegionStores', function () {
        it('should check if stores request for one region is functional', function (done) {
            var store = new Store()
            store.getSingleRegionStores(store.region_list.WELLINGTON, function (err, response) {
                expect(err).to.be.null
                expect(response).not.to.be.null
                expect(response.length).greaterThan(0)
                done()
            })
        })
    })

    describe('GetServiceableStores', function () {
        it('should get all recommended serviceable stores for your location', function (done) {
            var store = new Store()
            var user = new User()
            user.findAddress("86A constable street", function (err, response) {
                expect(err).to.be.null
                var address_response = response[0] //just take the first location in arr 
                store.getServiceableStores(address_response.location_hash, function (err, response) {
                    expect(err).to.be.null
                    expect(response).not.to.be.null
                    expect(response.length).greaterThan(0)
                    done()
                })
            })
        })
    })

    describe('GetNearestStore', function () {
        it('should check given a provided lat/lng, which store is nearest', function (done) {
            var store = new Store()
            var lat = -41.312241 //use Wellington, based lat lng to test
            var lng = 174.780466
            var expected_nearest_store = 'Hataitai'
            store.getNearestStore(lat, lng, function (err, response) {
                expect(err).to.be.null
                expect(response).not.to.be.null
                expect(response.name).to.equal(expected_nearest_store) //closest store for test lat lng
                done()
            })
        })
    })
})