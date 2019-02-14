var urls = require('./urls.json')
var httpJson = require('./request/request')

class Store {
    constructor() {

    }
    getRegions(callback) {
        httpJson.get(urls.stores.region, function (err, response) {
            var result = response.payload
            return callback(err, result)
        })
    }
}

module.exports = Store