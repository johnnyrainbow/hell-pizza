var url = require('./json/urls.json')
var region = require('./json/region.json')
var status = require('./json/status_codes.json')

var httpJson = require('./request/request')
var logger = require('../server')
class Order {
    constructor(store_id, menu, user) {
        this.setStoreId(store_id)
        this.setMenu(menu)
        this.setUser(user)
        this.order_type_id = 2
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

    addItemToOrder(item_id, item_size_id, item_quantity, modifiers, callback) {
        if (!item_id) return callback(":(")
    }
    placeOrder(callback) {
        if (!this.user) return callback(status.error.no_provided_user)

    }
}
module.exports = Order
