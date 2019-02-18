var url = require('./json/urls.json')
var httpJson = require('./request/request')

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

    getMenuItems(callback) { //gets entire storewide menu
        this.rangeRequest(null, callback)
    }
    getPizzas(callback) {
        this.rangeRequest(this.pizza_id_range, callback)
    }
    getSides(callback) {
        this.rangeRequest(this.sides_id_range, callback)
    }
    getSalads(callback) {
        this.rangeRequest(this.salads_id_range, callback)
    }
    getDesserts(callback) {
        this.rangeRequest(this.dessert_id_range, callback)
    }
    getSoftDrinks(callback) {
        this.rangeRequest(this.soft_drinks_id_range, callback)
    }
    getAlcoholicDrinks(callback) {
        this.rangeRequest(this.alcoholic_drinks_id_range, callback)
    }

    rangeRequest(range, callback) {

        httpJson.get(url.menu.full_menu, function (err, response) {
            if (err) return callback(err)

            var result = response.payload.menu.items
            if (range) {
                result = response.payload.menu.items.filter(obj => {
                    return obj.item_id >= range.min && obj.item_id <= range.max
                })
            }
            return callback(null, result)
        })
    }
}

module.exports = Menu