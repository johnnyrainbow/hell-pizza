const Menu = require('./src/Menu')
const Store = require('./src/Store')
const Order = require('./src/Order')
const User = require('./src/User')
module.exports = {
    Menu: new Menu(),
    Store: new Store(),
    User: new User(),
    Order: new Order()
};


