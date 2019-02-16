var chai = require('chai');
var expect = chai.expect;
var Order = require('../src/Order')
var Menu = require('../src/Menu')
var async = require('async')
var codes = require('../src/json/codes.json')

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

    describe('CheckAddItemToOrder', function () {
        it('should attempt to add item to order', function (done) {
            var menu = new Menu()
            var store_id = 1
            var order = new Order(store_id, menu, null)
            var item_id = 5
            var item_quantity = 1
            var item_size_id = 3

            order.initOrder(function (err) {
                expect(err).to.be.null
                order.addItemToOrder(item_id, item_size_id, item_quantity, {}, '', function (err, response) {
                    expect(err).to.be.null
                    expect(response).to.exist
                    expect(order.items.length).to.equal(1)
                    expect(order.items[0].item_id).to.equal(item_id)
                    done()
                })
            })
        })
    })

    describe('CheckRemoveItemFromOrder', function () {
        it('should attempt to remove an item from order', function (done) {
            var menu = new Menu()
            var store_id = 1
            var order = new Order(store_id, menu, null)
            var item_id = 5
            var item_quantity = 1
            var item_size_id = 3

            async.series([
                function (callback) {
                    order.initOrder(function (err, response) {
                        callback(err, response)
                    })
                },
                function (callback) {
                    order.addItemToOrder(item_id, item_size_id, item_quantity, {}, '', function (err, response) {
                        callback(err, response)
                    })
                },
                function (callback) {
                    order.removeItemFromOrder(order.items[0].order_item_id, function (err, response) {
                        callback(err, response)
                    })
                }
            ], function (err, results) {
                expect(err).to.be.null
                expect(results.length).to.equal(3)
                expect(order.items.length).to.equal(0)
                done()
            });
        })
    })

    describe('CheckUpdateOrderType', function () {
        it('should attempt to update pickup to delivery', function (done) {
            var menu = new Menu()
            var store_id = 1
            var order = new Order(store_id, menu, null)
            order.order_type_id = codes.order_type.PICKUP
            order.initOrder(function (err) {
                expect(err).to.be.null
                order.updateOrderType(codes.order_type.DELIVERY, function (err, response) {
                    expect(err).to.be.null
                    expect(response).not.to.be.null
                    expect(order.order_type_id).to.equal(codes.order_type.DELIVERY)
                    expect(order.price.delivery_fee).to.equal(codes.fees.DELIVERY_FEE)
                    done()
                })
            })
        })
        it('should attempt to update delivery to pickup', function (done) {
            var menu = new Menu()
            var store_id = 1
            var order = new Order(store_id, menu, null)
            order.order_type_id = codes.order_type.DELIVERY
            order.price.delivery_fee = codes.fees.DELIVERY_FEE
            order.initOrder(function (err) {
                expect(err).to.be.null
                order.updateOrderType(codes.order_type.PICKUP, function (err, response) {
                    expect(err).to.be.null
                    expect(response).not.to.be.null
                    expect(order.order_type_id).to.equal(codes.order_type.PICKUP)
                    expect(order.price.delivery_fee).to.equal(0)
                    done()
                })
            })
        })
    })


    describe('CheckVoucherCode', function () {
        it('should attempt to apply voucher code', function (done) {
            var menu = new Menu()
            var store_id = 21 //wellington store
            var order = new Order(store_id, menu, null)
            var voucher_code = "WELLY25WEDGES" //wellington only
            order.setStoreId(store_id)
            var p1
            async.series([
                function (callback) {
                    order.initOrder(function (err, response) {
                        callback(err, response)
                    })
                },
                function (callback) {
                    order.addItemToOrder(5, 3, 2, {}, '', function (err, response) {
                        p1 = order.price.total
                        callback(err, response)
                    })
                },
                function (callback) {
                    order.addItemToOrder(42, 1, 1, {}, '', function (err, response) {
                        callback(err, response)
                    })
                },
                function (callback) {
                    order.applyVoucherCode(voucher_code, function (err, response) {
                        callback(err, response)
                    })
                }
            ], function (err, results) {
                expect(err).to.be.null
                expect(results).not.to.be.null
                expect(order.price.total).to.equal(p1)
                done()
            });
        })
    })
    describe('ClearVoucherCode', function () {
        it('should attempt to clear voucher code', function (done) {
            var menu = new Menu()
            var store_id = 21 //wellington store
            var order = new Order(store_id, menu, null)
            var voucher_code = "WELLY25WEDGES" //wellington only
            order.setStoreId(store_id)
            var p1
            async.series([
                function (callback) {
                    order.initOrder(function (err, response) {
                        callback(err, response)
                    })
                },
                function (callback) {
                    order.addItemToOrder(5, 3, 2, {}, '', function (err, response) {
                        callback(err, response)
                    })
                },
                function (callback) {
                    order.addItemToOrder(42, 1, 1, {}, '', function (err, response) {
                        p1 = order.price.total
                        callback(err, response)
                    })
                },
                function (callback) {
                    order.applyVoucherCode(voucher_code, function (err, response) {
                        callback(err, response)
                    })
                },
                function(callback) {
                    order.clearVoucherCode(function (err, response) {
                        callback(err, response)
                    }) 
                }
            ], function (err, results) {
                expect(err).to.be.null
                expect(results).not.to.be.null
                expect(order.price.total).to.equal(p1)
                done()
            });
        })
    })

})