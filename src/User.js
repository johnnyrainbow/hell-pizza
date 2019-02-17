var url = require('./json/urls.json')
var status = require('./json/status_codes.json')
var httpJson = require('./request/request')
var util = require('./util/order_util')
var codes = require('./json/codes.json')

class User {
    constructor() {
        this.customer_id = null
    }

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
        var self = this
        httpJson.post(url.user.login, { uid: email, token: password }, function (err, response) {
            if (err) return callback(err)
            var result = response.payload
            self.customer_id = result.customer_id
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
    //move address into user
    findAddress(address_query, callback) {
        if (!address_query || address_query == '')
            return callback(status.error.no_provided_address)

        var formatted_url = util.formatOrderURL(this, url.user.find_address, { address_query: address_query })

        httpJson.get(formatted_url, function (err, response) {
            if (err) return callback(err)
            var result = response.payload
            return callback(null, result)
        })
    }

    setAddress(address_response, callback) {
        if (!address_response)
            return callback(status.error.no_provided_address)

        if (!this.customer_id)
            return callback(status.error.log_in_required)

        this.address = address_response

        this.location_hash = address_response.location_hash
        var formatted_url = util.formatOrderURL(this, url.order.set_address, { customer_id: this.customer_id })
        var data = {
            location_id: this.location_hash,
            customer_address_type_id: codes.address_type.RESIDENTIAL,
            notes: "",
            type_data: {},
            customer_id: this.customer_id,
        }

        httpJson.post(formatted_url, data, function (err, response) {
            if (err) return callback(err)
            //get order times
            return callback(null, status.success.address_update)
        })
    }



}


module.exports = User