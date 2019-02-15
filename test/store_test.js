var chai = require('chai');
var expect = chai.expect;
var Store = require('../src/Store')

describe('Store', function () {
    describe('CheckAllRegionStores', function () {
        it('should check if stores request is functional', function (done) {
            var store = new Store()
            store.getAllRegionStores(function (err, response) {
                //console.log(response)
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

    describe('GetNearestStore', function () {
        it('should check given a provided lat/lng, which store is nearest', function (done) {
            var store = new Store()
            var lat = -41.312241 //use Wellington, newtown based lat lng to test
            var lng = 174.780466
            store.getNearestStore(lat, lng, function (err, response) {
                expect(err).to.be.null
                expect(response).not.to.be.null
                done()
            })
        })
    })
})