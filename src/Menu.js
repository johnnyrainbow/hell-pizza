var url = require('./json/urls.json')
var httpJson = require('./request/request')
var status = require('./json/status_codes.json')
var util = require('./util/util')

class Menu {

    constructor() {
        //the hell pizza api does not categorize their foods on the API, 
        //therefore we will define categories by ranges.
        this.pizza_id_range = { min: 4, max: 31 }
        this.sides_id_range = { min: 32, max: 52 }
        this.salads_id_range = { min: 53, max: 57 }
        this.dessert_id_range = { min: 63, max: 66 }
        this.soft_drinks_id_range = { min: 66, max: 92 }
        this.alcoholic_drinks_id_range = { min: 108, max: 139 }
    }

    /**
    * Gets all items on the menu.
    * @param {number} store_id - The store_id you wish to order from.
    * @param {Function} callback - The callback that handles the response.
    */
    getMenuItems(store_id, callback) {
        this.rangeRequest(store_id, null, callback)
    }

    /**
    * Gets all pizzas on the menu.
    * @param {number} store_id - The store_id you wish to order from.
    * @param {Function} callback - The callback that handles the response.
    */
    getPizzas(store_id, callback) {
        this.rangeRequest(store_id, this.pizza_id_range, callback)
    }

    /**
    * Gets all sides on the menu.
    * @param {number} store_id - The store_id you wish to order from.
    * @param {Function} callback - The callback that handles the response.
    */
    getSides(store_id, callback) {
        this.rangeRequest(store_id, this.sides_id_range, callback)
    }

    /**
    * Gets all salads on the menu.
    * @param {number} store_id - The store_id you wish to order from.
    * @param {Function} callback - The callback that handles the response.
    */
    getSalads(store_id, callback) {
        this.rangeRequest(store_id, this.salads_id_range, callback)
    }

    /**
    * Gets all desserts on the menu.
    * @param {number} store_id - The store_id you wish to order from.
    * @param {Function} callback - The callback that handles the response.
    */
    getDesserts(store_id, callback) {
        this.rangeRequest(store_id, this.dessert_id_range, callback)
    }

    /**
    * Gets all soft drinks on the menu.
    * @param {number} store_id - The store_id you wish to order from.
    * @param {Function} callback - The callback that handles the response.
    */
    getSoftDrinks(store_id, callback) {
        this.rangeRequest(store_id, this.soft_drinks_id_range, callback)
    }

    /**
    * Gets all alcoholic drinks on the menu.
    * @param {number} store_id - The store_id you wish to order from.
    * @param {Function} callback - The callback that handles the response.
    */
    getAlcoholicDrinks(store_id, callback) {
        this.rangeRequest(store_id, this.alcoholic_drinks_id_range, callback)
    }

    /**
    * Makes a range request the menu.
    * @param {number} store_id - The store_id you wish to order from.
    * @param {Object} range - The number minmax range of item_ids of a category.
    * @param {Function} callback - The callback that handles the response.
    */
    rangeRequest(store_id, range, callback) {
        if (!store_id)
            return callback(status.error.no_provided_store_id)

        var formatted_url = util.formatStoreURL(url.menu.full_menu, { store_id: store_id })
        httpJson.get(formatted_url, function (err, response) {
            if (err) return callback(err)

            var result = response.payload.menu.items
            if (range) {
                result = response.payload.menu.items.filter(obj => {
                    return obj.item_id >= range.min && obj.item_id <= range.max
                })
            }
            return callback(null, { items: result, store_info: response.payload.store })
        })
    }
}

module.exports = Menu