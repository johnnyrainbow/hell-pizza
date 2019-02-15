var url = require('./json/urls.json')
var region = require('./json/region.json')
var status = require('./json/status_codes.json')

var httpJson = require('./request/request')

class User {
    constructor() { }

    checkAccountExists(email, callback) {
        if (!email)
            return callback(status.error.no_provided_email)

        httpJson.get(url.user.email_check + email, function (err, response) {
            if (err) return callback(err)

            var result = response.payload
            return callback(null, result)
        })
    }

    login(email, password, callback) {
        if (!email || !password)
            return callback(status.error.no_provided_user_pass)

        httpJson.post(url.user.login, { uid: email, token: password }, function (err, response) {
            if (err) return callback(err)
            var result = response.payload
            return callback(null, result)
        })
    }

    register(email, first_name, password, phone_number, callback) {
        if (!email || !first_name || !password || !phone_number)
            return callback(status.error.no_provided_credentials)

        httpJson.post(url.user.register, { email: email, first_name: first_name, password: password, phone_number: phone_number }, function (err, response) {
            if (err) return callback(err)
            var result = response.payload
            return callback(null, result)
        })
    }
}
module.exports = User