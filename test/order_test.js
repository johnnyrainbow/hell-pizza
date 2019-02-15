var chai = require('chai');
var expect = chai.expect;
var Order = require('../src/Order')
var Menu = require('../src/Menu')


const total_menu_size = 206 //amount of items in total menu

describe('Order', function () {
    describe('CheckInitOrder', function () {
        it('should attempt to init order', function (done) {
            var menu = new Menu()
            var store_id = 1
            var order = new Order(store_id, menu, null)
            order.initOrder(function (err) {
                expect(err).to.be.null
                expect(order.token).to.exist
                expect(order.order_id).to.exist
                done()
            })
        })
    })
})