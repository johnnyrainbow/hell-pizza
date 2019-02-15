var url = require('./json/urls.json')
var region = require('./json/region.json')
var status = require('./json/status_codes.json')
var httpJson = require('./request/request')
var geolib = require('geolib')

class Store {
    constructor() {
        this.region_list = region.region_list
    }

    getAllRegionStores(callback) {
        httpJson.get(url.stores.region, function (err, response) {
            if (err) return callback(err)

            var result = response.payload
            return callback(null, result)
        })
    }

    getSingleRegionStores(region, callback) {
        if (!region)
            return callback(status.error.no_provided_region)

        httpJson.get(url.stores.region, function (err, response) {
            if (err) return callback(err)

            var result = response.payload

            for (var i = 0; i < result.length; i++) {
                if (result[i].key === region) {
                    return callback(null, result[i].stores)
                }
            }
            return callback(status.error.region_not_found)
        })
    }

    getNearestStore(lat, lng, callback) {
        if (!lat || !lng)
            return callback(status.error.no_lat_lng)

        httpJson.get(url.stores.region, function (err, response) {
            if (err) return callback(err)

            var result = response.payload
            var nearest = { distance: null, store: null }

            for (var i = 0; i < result.length; i++) {
                for (var j = 0; j < result[i].stores.length; j++) {
                    var store = result[i].stores[j]
                    var dist = geolib.getDistance(
                        { latitude: store.latitude, longitude: store.longitude },
                        { latitude: lat, longitude: lng }
                    );

                    if (!nearest.distance || dist < nearest.distance) {
                        nearest.distance = dist
                        nearest.store = store
                    }
                }
            }
            if (!nearest.store)
                return callback(status.error.no_nearest_store)

            return callback(null, nearest.store)
        })
    }

    //getTopNearestStores
}

module.exports = Store