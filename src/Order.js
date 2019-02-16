var url = require('./json/urls.json')
var status = require('./json/status_codes.json')
var httpJson = require('./request/request')
var codes = require('./json/codes.json')
var util = require('./util/order_util')

class Order {
    constructor(store_id, menu, user) {
        this.setStoreId(store_id)
        this.setMenu(menu)
        this.setUser(user)
        this.items = null
        this.order_type_id = codes.order_type.PICKUP
        this.price = {}
    }
    setMenu(menu) {
        this.menu = menu
    }
    setStoreId(id) {
        this.store_id = id
    }
    setUser(user) {
        this.user = user
    }

    initOrder(callback) {
        var self = this
        var data = {
            menu_id: this.menu.id,
            order_type_id: this.order_type_id,
            store_id: this.store_id,
            voucher_code: null
        }
        httpJson.post(url.order.init_order, data, function (err, response) {
            if (err) return callback(err)
            var result = response.payload
            self.token = result.token
            self.order_id = result.order_id
            return callback(null, status.success.init_order)
        })
    }

    addItemToOrder(item_id, item_size_id, item_quantity, modifiers, notes, callback) {
        if (!item_id || !item_size_id || !item_quantity)
            return callback(status.error.missing_item_params)

        if (!this.token)
            return callback(status.error.missing_token)


        var formatted_url = url.order.add_item.replace('${ORDER_TOKEN}', this.token)

        var data = {
            item_id: item_id,
            item_size_id: item_size_id,
            item_quantity: item_quantity,
            modifiers: modifiers,
            notes: notes,
        }
        var self = this
        httpJson.post(formatted_url, data, function (err, response) {
            if (err) return callback(err)
            var result = response.payload

            util.setUpdateItems(self, result)

            return callback(null, status.success.added_item)
        })
    }

    removeItemFromOrder(order_item_id, callback) {
        if (!this.token)
            return callback(status.error.missing_token)

        if (!this.items || this.items.length === 0)
            return callback(status.error.no_items_to_remove)

        if (!order_item_id)
            return callback(status.error.no_provided_id)

        var formatted_url = url.order.remove_item
            .replace('${ORDER_TOKEN}', this.token)
            .replace('${ORDER_ITEM_ID}', order_item_id)

        var self = this
        httpJson.delete(formatted_url, function (err, response) {
            if (err) return callback(err)
            var result = response.payload

            util.setUpdateItems(self, result)

            return callback(null, status.success.removed_item)
        })
    }

    updateOrderType(type, callback) {
        if (!type) return callback(status.error.no_provided_type)

        if (!this.token || !this.order_id)
            return callback(status.error.missing_token)

        var formatted_url = url.order.update_prefs
            .replace('${ORDER_TOKEN}', this.token)
            .replace('${ORDER_ID}', this.order_id)

        var data = util.configureUpdateData(this, { order_type_id: type })
        var self = this
        httpJson.post(formatted_url, data, function (err, response) {
            if (err) return callback(err)
            var result = response.payload

            util.setUpdateItems(self, result)
            self.order_type_id = result.order_type_id
            return callback(null, status.success.updated_order_type)
        })
    }

    submitOrder(callback) {
        if (!this.user)
             return callback(status.error.no_provided_user)
        //TODO
    }
}

module.exports = Order
