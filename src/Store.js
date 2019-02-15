var urls = require('./urls.json')
var httpJson = require('./request/request')
var Status = require('./status_codes/codes.json')
var geolib = require('geolib')
class Store {
    constructor() {
        this.region_list = {
            AUCKLAND: 'auckland',
            NORTHLAND: 'northland',
            BAY_OF_PLENTY: 'bay-of-plenty',
            WAIKATO: 'waikato',
            TAUPO: 'taupo',
            TARANAKI: 'taranaki',
            HAWKES_BAY: 'hawkes-bay',
            MANAWATU: 'manawatu',
            WAIRAPA: 'wairapa',
            WELLINGTON: 'wellington',
            NELSON: 'nelson',
            CANTERBURY: 'canterbury',
            TIMARU: 'timaru',
            QUEENSTOWN: 'queenstown',
            OTAGO: 'otago',
            SOUTHLAND: 'southland',
        }
    }

    getAllRegionStores(callback) {

        httpJson.get(urls.stores.region, function (err, response) {
            if (err) return callback(err)

            var result = response.payload
            return callback(null, result)
        })
    }

    getSingleRegionStores(region, callback) {

        httpJson.get(urls.stores.region, function (err, response) {
            if (err) return callback(err)

            var result = response.payload

            for (var i = 0; i < result.length; i++) {
                if (result[i].key === region) {
                    return callback(null, result[i].stores)
                }
            }
            return callback(Status.error.region_not_found)
        })
    }

    getNearestStore(lat, lng, callback) {
        if (!lat || !lng) return callback(Status.error.no_lat_lng)

        httpJson.get(urls.stores.region, function (err, response) {
            if (err) return callback(err)

            var result = response.payload
            var nearestStore
            var closestDist 
            for (var i = 0; i < result.length; i++) {
                for (var j = 0; j < result[i].stores.length; j++) {
                    var store = result[i].stores[j]
                    var dist = geolib.getDistance(
                        { latitude: store.latitude, longitude: store.longitude },
                        { latitude: lat, longitude: lng }
                    );

                    if (!closestDist || dist < closestDist) {
                        closestDist = dist
                        nearestStore = store
                    }
                }
            }
            if (!nearestStore)
                return callback(Status.error.no_nearest_store)

            return callback(null, nearestStore)
        })
    }
}

module.exports = Store