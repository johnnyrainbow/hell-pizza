var urls = require('../urls.json')

module.exports = {
    formatRequest: function (request) {
        return urls.BASE_URL + request
    }
}