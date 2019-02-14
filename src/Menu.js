var urls = require('./urls.json');
var httpJson = require('./http-json');
var RequestFormatter = require('./request_formatter')
class Menu {
    constructor(menu) {
        this.menu = menu || {}
    }
    getFullMenu(callback) {
        httpJson.get(RequestFormatter.formatRequest(urls.menu.full_menu), callback)
    }
}
module.exports = Menu