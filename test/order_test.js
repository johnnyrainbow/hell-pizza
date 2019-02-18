var chai = require('chai');
var expect = chai.expect;
var Order = require('../src/Order')
var async = require('async')
var codes = require('../src/json/codes.json')
const voucher = 'WELLY25WEDGES'

describe('Order', function () {
    describe('CheckInitOrder', function () {
        it('should attempt to init order', function (done) {
            var store_id = 1
            var order_type_id = 1
            var order = new Order()
            order.initOrder(order_type_id, store_id, function (err, response) {
                expect(err).to.be.null
                expect(response.token).to.exist
                expect(response.order_id).to.exist
                expect(response.time_promised).to.exist
                done()
            })
        })
    })

    describe('CheckaddItem', function () {
        it('should attempt to add item to order', function (done) {
            var store_id = 1
            var order_type_id = 1
            var order = new Order()
            var item_id = 5
            var item_quantity = 1
            var item_size_id = 3

            order.initOrder(order_type_id, store_id, function (err, response) {
                expect(err).to.be.null
                order.addItem(response.token, item_id, item_size_id, item_quantity, {}, '', function (err, response) {
                    expect(err).to.be.null
                    expect(response).to.exist
                    expect(response.items.length).to.equal(1)
                    expect(response.items[0].item_id).to.equal(item_id)
                    done()
                })
            })
        })
    })

    describe('CheckremoveItem', function () {
        it('should attempt to remove an item from order', function (done) {
            var store_id = 1
            var order_type_id = 1
            var order = new Order()
            var item_id = 5
            var item_quantity = 1
            var item_size_id = 3
            var token
            var items
            async.series([
                function (callback) {
                    order.initOrder(order_type_id, store_id, function (err, response) {
                        token = response.token
                        callback(err, response)
                    })
                },
                function (callback) {
                    order.addItem(token, item_id, item_size_id, item_quantity, {}, '', function (err, response) {
                        items = response.items
                        callback(err, response)
                    })
                },
                function (callback) {
                    order.removeItem(token, items[0].order_item_id, function (err, response) {
                        items = response.items
                        callback(err, response)
                    })
                }
            ], function (err, results) {
                expect(err).to.be.null
                expect(results.length).to.equal(3)
                expect(items.length).to.equal(0)
                done()
            });
        })
    })
    describe('CheckremoveItem', function () {
        it('should attempt to remove an item from order', function (done) {
            var store_id = 1
            var order_type_id = 1
            var order = new Order()
            var item_id = 5
            var item_quantity = 1
            var item_size_id = 3
            var token
            var items
            async.series([
                function (callback) {
                    order.initOrder(order_type_id, store_id, function (err, response) {
                        token = response.token
                        callback(err, response)
                    })
                },
                function (callback) {
                    order.addItem(token, item_id, item_size_id, item_quantity, {}, '', function (err, response) {
                        items = response.items
                        callback(err, response)
                    })
                },
                function (callback) {
                    order.removeItem(token, items[0].order_item_id, function (err, response) {
                        items = response.items
                        callback(err, response)
                    })
                }
            ], function (err, results) {
                expect(err).to.be.null
                expect(results.length).to.equal(3)
                expect(items.length).to.equal(0)
                done()
            });
        })
    })
    describe('CheckUpdateOrderStoreId', function () {
        it('should attempt to update the order store ID', function (done) {
            var new_store_id = 21
            var order_type_id = 1
            var order = new Order()

            order.initOrder(order_type_id, new_store_id, function (err, response) {
                expect(err).to.be.null

                order.updateStoreId(response.token, response.order_id, new_store_id, function (err, response) {
                    expect(err).to.be.null
                    expect(response).not.to.be.null
                    expect(response.store_id).to.equal(new_store_id)
                    done()
                })
            })
        })
    })
    describe('CheckGetOrder', function () {
        it('should attempt to get our order', function (done) {
            var new_store_id = 21
            var order_type_id = 1
            var order = new Order()

            order.initOrder(order_type_id, new_store_id, function (err, response) {
                expect(err).to.be.null

                order.updateStoreId(response.token, response.order_id, new_store_id, function (err, response) {
                    expect(err).to.be.null

                    order.getOrder(response.token, function (err, response) {
                        expect(err).to.be.null
                        expect(response).not.to.be.null
                        expect(response.store_id).to.equal(new_store_id)
                        done()
                    })
                })
            })
        })
    })
    describe('CheckUpdateOrderCollectionType', function () {
        it('should attempt to update pickup to delivery', function (done) {
            var store_id = 1
            var order_type_id = 1
            var order = new Order()

            order.initOrder(order_type_id, store_id, function (err, response) {
                expect(err).to.be.null

                order.updateCollectionType(response.token, response.order_id, codes.order_type.DELIVERY, function (err, response) {
                    expect(err).to.be.null
                    expect(response).not.to.be.null
                    expect(response.order_type_id).to.equal(codes.order_type.DELIVERY)
                    expect(response.delivery_fee).to.equal(codes.fees.DELIVERY_FEE)
                    done()
                })
            })
        })
        it('should attempt to update to pickup', function (done) {
            var store_id = 1
            var order_type_id = 2
            var order = new Order()

            order.initOrder(order_type_id, store_id, function (err, response) {
                expect(err).to.be.null

                order.updateCollectionType(response.token, response.order_id, codes.order_type.PICKUP, function (err, response) {
                    expect(err).to.be.null
                    expect(response).not.to.be.null
                    expect(response.order_type_id).to.equal(codes.order_type.PICKUP)
                    expect(response.delivery_fee).to.equal(0)
                    done()
                })
            })
        })
    })


    describe('CheckVoucherCode', function () {
        it('should attempt to apply voucher code', function (done) {
            var store_id = 21
            var order_type_id = 1
            var order = new Order()
            var voucher_code = voucher //wellington only
            var p1
            var token
            async.series([
                function (callback) {
                    order.initOrder(order_type_id, store_id, function (err, response) {
                        token = response.token
                        callback(err, response)
                    })
                },
                function (callback) {
                    order.addItem(token, 5, 3, 2, {}, '', function (err, response) {
                        p1 = response.total_price
                        callback(err, response)
                    })
                },
                function (callback) {
                    order.addItem(token, 42, 1, 1, {}, '', function (err, response) {
                        callback(err, response)
                    })
                },
                function (callback) {
                    order.applyVoucherCode(token, voucher_code, function (err, response) {
                        callback(err, response)
                    })
                }
            ], function (err, results) {
                expect(err).to.be.null
                expect(results).not.to.be.null
                expect(results[3].total_price).to.equal(p1)
                done()
            });
        })
    })
    describe('ClearVoucherCode', function () {
        it('should attempt to clear voucher code', function (done) {
            var store_id = 21
            var order_type_id = 1
            var order = new Order()
            var voucher_code = voucher //wellington only
            var p1
            var token

            async.series([
                function (callback) {
                    order.initOrder(order_type_id, store_id, function (err, response) {
                        token = response.token
                        callback(err, response)
                    })
                },
                function (callback) {
                    order.addItem(token, 5, 3, 2, {}, '', function (err, response) {
                        callback(err, response)
                    })
                },
                function (callback) {
                    order.addItem(token, 42, 1, 1, {}, '', function (err, response) {
                        p1 = response.total_price
                        callback(err, response)
                    })
                },
                function (callback) {
                    order.applyVoucherCode(token, voucher_code, function (err, response) {
                        callback(err, response)
                    })
                },
                function (callback) {
                    order.clearVoucherCode(token, function (err, response) {
                        callback(err, response)
                    })
                }
            ], function (err, results) {
                expect(err).to.be.null
                expect(results).not.to.be.null
                expect(results[4].total_price).to.equal(p1)
                done()
            });
        })
    })
})