var urls = require('../json/urls.json')

module.exports = {
    formatRequest: function (request) {
        return urls.BASE_URL + request
    }
}