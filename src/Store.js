var url = require('./json/urls.json')
var region = require('./json/region.json')
var status = require('./json/status_codes.json')
var httpJson = require('./request/request')
var geolib = require('geolib')
var util = require('./util/util')

class Store {

    constructor() {
        this.region_list = region.region_list
    }

    /**
    * Gets all stores.
    * @param {Function} callback - The callback that handles the response.
    */
    getAllStores(callback) {
        httpJson.get(url.stores.region, function (err, response) {
            if (err) return callback(err)

            var result = response.payload
            return callback(null, result)
        })
    }

    /**
    * Gets all stores in a single region.
    * @param {string} region - The region in which you wish to find stores. All valid regions can be found at Store.region_list.
    * @param {Function} callback - The callback that handles the response.
    */
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

    /**
    * Gets all serviceable stores near a location.
    * @param {string} location_hash - The hash returned by the API when given a valid location address.
    * @param {Function} callback - The callback that handles the response.
    */
    getServiceableStores(location_hash, callback) {
        if (!location_hash) return callback(codes.error.no_provided_hash)

        var formatted_url = util.formatStoreURL(url.stores.serviceable_stores, { location_hash: location_hash })

        httpJson.get(formatted_url, function (err, response) {
            if (err) return callback(err)

            var result = response.payload
            return callback(null, result)
        })
    }

    /**
    * Gets the nearest store to a location.
    * @param {number} lat - The location latitude.
    * @param {number} lng - The location longitude.
    * @param {Function} callback - The callback that handles the response.
    */
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
}

module.exports = Store