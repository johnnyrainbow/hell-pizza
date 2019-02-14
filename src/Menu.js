var urls = require('./urls.json');
var httpJson = require('./http-json');
var RequestFormatter = require('./request_formatter')


class Menu {
    constructor(menu) {
        this.menu = menu || {}
        this.pizzas = []
        this.pizza_range_low = 4
        this.pizza_range_high = 31

    }
    getMenuItems(callback) {
        httpJson.get(RequestFormatter.formatRequest(urls.menu.full_menu), function(err,response) {
            callback(null,response.payload.menu.items)
        })
    }
    getPizzas(callback) {
        var self = this
        httpJson.get(RequestFormatter.formatRequest(urls.menu.full_menu), function (err, response) {

            var result = response.payload.menu.items.filter(obj => {
                return obj.item_id >= self.pizza_range_low && obj.item_id <= self.pizza_range_high
            })
            return callback(null,result)
        })
    }
}
module.exports = Menu