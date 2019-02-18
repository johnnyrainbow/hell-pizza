var url = require('./json/urls.json')
var status = require('./json/status_codes.json')
var httpJson = require('./request/request')
var util = require('./util/util')
var codes = require('./json/codes.json')

class User {

    constructor() { }

    /**
    * Check if an email is already registered in the database.
    * @param {string} email - The email you wish to check.
    * @param {Function} callback - The callback that handles the response.
    */
    checkAccountExists(email, callback) {
        if (!email)
            return callback(status.error.no_provided_email)

        httpJson.get(url.user.email_check + email, function (err, response) {
            if (err) return callback(status.warn.email_not_exist)

            var result = response.payload
            return callback(null, result)
        })
    }

    /**
    * Login as an existing user.
    * @param {string} email - The email associated with your account.
    * @param {string} password - The password associated with your account.
    * @param {Function} callback - The callback that handles the response
    */
    login(email, password, callback) {
        if (!email || !password)
            return callback(status.error.no_provided_user_pass)
        var self = this
        httpJson.post(url.user.login, { uid: email, token: password }, function (err, response) {
            if (err) return callback(err)
            var result = response.payload

            return callback(null, result)
        })
    }

    /**
    * Register as a new user.
    * @param {string} email - The email you wish to be associated with your account.
    * @param {string} first_name - The first name you wish to be associated with your account.
    * @param {string} password - The password you wish to be associated with your account.
    * @param {string} phone_number - The phone number you wish to be associated with your account.
    * @param {Function} callback - The callback that handles the response.
    */
    register(email, first_name, password, phone_number, callback) {
        if (!email || !first_name || !password || !phone_number)
            return callback(status.error.no_provided_credentials)

        httpJson.post(url.user.register, { email: email, first_name: first_name, password: password, phone_number: phone_number }, function (err, response) {
            if (err) return callback(err)
            var result = response.payload
            return callback(null, result)
        })
    }
    
    /**
    * Get all address suggestions for an input address.
    * @param {string} address_query - The address input query.
    * @param {Function} callback - The callback that handles the response.
    */
    findAddress(address_query, callback) {
        if (!address_query || address_query == '')
            return callback(status.error.no_provided_address)

        var formatted_url = util.formatUserURL(url.user.find_address, { address_query: address_query })

        httpJson.get(formatted_url, function (err, response) {
            if (err) return callback(err)
            var result = response.payload
            return callback(null, result)
        })
    }
}

module.exports = User