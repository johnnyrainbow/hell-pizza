var urls = require('./urls.json')
var httpJson = require('./request/request')

class Menu {
    constructor(menu) {
        this.menu = menu || {}
        //the hell pizza api does not categorize their foods, 
        //they are sorted in ranges. 
        this.pizza_id_range = { min: 4, max: 31 }
        this.sides_id_range = { min: 32, max: 52 }
        this.salads_id_range = { min: 53, max: 57 }
        this.dessert_id_range = { min: 63, max: 66 }
        this.soft_drinks_id_range = { min: 66, max: 92 }
        this.alcoholic_drinks_id_range = { min: 108, max: 139 }
    }

    getMenuItems(callback) { //gets all menu items
        this.rangeRequest(null, null, callback)
    }
    getPizzas(callback) {
        this.rangeRequest(this.pizza_id_range.min, this.pizza_id_range.max, callback)
    }
    getSides(callback) {
        this.rangeRequest(this.sides_id_range.min, this.sides_id_range.max, callback)
    }
    getSalads(callback) {
        this.rangeRequest(this.salads_id_range.min, this.salads_id_range.max, callback)
    }
    getDesserts(callback) {
        this.rangeRequest(this.dessert_id_range.min, this.dessert_id_range.max, callback)
    }
    getSoftDrinks(callback) {
        this.rangeRequest(this.soft_drinks_id_range.min, this.soft_drinks_id_range.max, callback)
    }
    getAlcoholicDrinks(callback) {
        this.rangeRequest(this.alcoholic_drinks_id_range.min, this.alcoholic_drinks_id_range.max, callback)
    }

    rangeRequest(min, max, callback) {

        httpJson.get(urls.menu.full_menu, function (err, response) {
            if (err) return callback(err)

            var result = response.payload.menu.items
            if (min && max) {
                result = response.payload.menu.items.filter(obj => {
                    return obj.item_id >= min && obj.item_id <= max
                })
            }
            return callback(null, result)
        })
    }
}

module.exports = Menu