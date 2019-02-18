var url = require('./json/urls.json')
var status = require('./json/status_codes.json')
var httpJson = require('./request/request')
var codes = require('./json/codes.json')
var util = require('./util/util')

class Order {
    constructor() {
        this.menu_id = 1
    }

    initOrder(order_type_id, store_id, callback) {
        var data = {
            menu_id: this.menu_id,
            order_type_id: order_type_id,
            store_id: store_id,
            voucher_code: null
        }
        httpJson.post(url.order.init_order, data, function (err, response) {
            if (err) return callback(err)
            var result = response.payload

            return callback(null, result)
        })
    }

    getOrder(token, callback) {
        //retrieve our current order from hell api
        var formatted_url = util.formatOrderURL(url.order.get_order, { token: token })
        httpJson.get(formatted_url, function (err, response) {
            if (err) return callback(err)

            var result = response.payload
            return callback(null, result)
        })
    }

    addItemToOrder(token, item_id, item_size_id, item_quantity, modifiers, notes, callback) {
        if (!item_id || !item_size_id || !item_quantity)
            return callback(status.error.missing_item_params)

        if (!token)
            return callback(status.error.missing_token)

        var formatted_url = util.formatOrderURL(url.order.add_item, { token: token })
        var data = {
            item_id: item_id,
            item_size_id: item_size_id,
            item_quantity: item_quantity,
            modifiers: modifiers,
            notes: notes,
        }

        httpJson.post(formatted_url, data, function (err, response) {
            if (err) return callback(err)
            var result = response.payload

            return callback(null, result)
        })
    }

    removeItemFromOrder(token, order_item_id, callback) {
        if (!token)
            return callback(status.error.missing_token)

        if (!order_item_id)
            return callback(status.error.no_provided_id)

        var formatted_url = util.formatOrderURL(url.order.remove_item, { token: token, order_item_id: order_item_id })

        httpJson.delete(formatted_url, function (err, response) {
            if (err) return callback(err)
            var result = response.payload

            return callback(null, result)
        })
    }

    updateOrderStoreId(token, order_id, store_id, callback) {
        if (!order_id) return callback(status.error.no_provided_time)

        if (!token || !order_id)
            return callback(status.error.missing_token)

        var data = util.configureUpdateData({ store_id: store_id })
        this.updateOrder(token, order_id, data, callback)
    }

    updateOrderCollectionTime(token, order_id, new_time, callback) {
        if (!new_time) return callback(status.error.no_provided_time)

        if (!token || !order_id)
            return callback(status.error.missing_token)

        var data = util.configureUpdateData({ time_scheduled: new_time })
        this.updateOrder(token, order_id, data, callback)
    }

    updateOrderCollectionType(token, order_id, type, callback) {
        if (!type) return callback(status.error.no_provided_type)

        if (!token || !order_id)
            return callback(status.error.missing_token)

        var data = util.configureUpdateData({ order_type_id: type })
        this.updateOrder(token, order_id, data, callback)
    }

    updateOrder(token, order_id, data, callback) {
        var formatted_url = util.formatOrderURL(url.order.update_order, { token: token, order_id: order_id })

        httpJson.post(formatted_url, data, function (err, response) {
            if (err) return callback(err)
            var result = response.payload

            return callback(null, result)
        })
    }

    applyVoucherCode(token, voucher_code, callback) {
        if (!token)
            return callback(status.error.missing_token)

        if (!voucher_code)
            return callback(status.error.no_provided_voucher)

        var formatted_url = util.formatOrderURL(url.order.voucher_code, { token: token })
        var data = {
            order_token: token,
            voucher_code: voucher_code
        }
        httpJson.post(formatted_url, data, function (err, response) {
            if (err) return callback(err)

            var result = response.payload
            return callback(null, result)
        })
    }

    clearVoucherCode(token, callback) {
        var formatted_url = util.formatOrderURL(url.order.voucher_code, { token: token })

        httpJson.delete(formatted_url, function (err, response) {
            if (err) return callback(err)

            var result = response.payload
            return callback(null, result)
        })
    }

    //rework this
    placeOrder(payment_type, callback) {
        if (!this.user)
            return callback(status.error.no_provided_user)

        if (!this.address)
            return callback(status.error.no_provided_address)

        var formatted_url = util.formatOrderURL(this, url.order.place)
        var data = {
            order_token: this.token,
            store_payment_type_id: payment_type
        }
        httpJson.post(formatted_url, data, function (err, response) {
            if (err) return callback(err)

            return callback(response)

            //TODO
        })
    }
}

module.exports = Order
