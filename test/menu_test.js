var chai = require('chai');
var expect = chai.expect;
var Menu = require('../src/Menu')
const total_menu_size = 206 //amount of items in total menu

describe('Menu', function () {
    describe('CheckMenuUpdate', function () {
        it('should check if the menu contains a different number of items', function (done) {
            this.timeout(3000) //longer timeout as hell's server can be slow for large requests
            var menu = new Menu()
            menu.getMenuItems(function (err, response) {
                expect(err).to.be.null
                expect(response).not.to.be.null
                expect(response.length).to.equal(total_menu_size)
                done()
            })
        })
    })
    describe('FullMenu', function () {
        it('should check all menu responses', function (done) {
            this.timeout(3000) //longer timeout as hell's server can be slow for large requests
            var menu = new Menu()
            menu.getMenuItems(function (err, response) {
                expect(err).to.be.null
                expect(response).not.to.be.null
                expect(response.length).greaterThan(0)
                done()
            })
        })
    })

    describe('PizzaMenu', function () {
        it('should check get all pizza menu items', function (done) {
            var menu = new Menu()
            menu.getPizzas(function (err, response) {
                expect(err).to.be.null
                expect(response).not.to.be.null
                expect(response.length).greaterThan(0)
                done()
            })
        })
    })

    describe('SidesMenu', function () {
        it('should check get sides menu items', function (done) {
            var menu = new Menu()
            menu.getSides(function (err, response) {
                expect(err).to.be.null
                expect(response).not.to.be.null;
                expect(response.length).greaterThan(0)
                done()
            })
        })
    })
    describe('DessertMenu', function () {
        it('should check get all dessert menu items', function (done) {
            var menu = new Menu()
            menu.getDesserts(function (err, response) {
                expect(err).to.be.null
                expect(response).not.to.be.null
                expect(response.length).greaterThan(0)
                done()
            })
        })
    })
    describe('SaladMenu', function () {
        it('should check get all salad menu items', function (done) {
            var menu = new Menu()
            menu.getSalads(function (err, response) {
                expect(err).to.be.null
                expect(response).not.to.be.null
                expect(response.length).greaterThan(0)
                done()
            })

        })
    })
    describe('SoftDrinkMenu', function () {
        it('should check get soft drink menu items', function (done) {
            var menu = new Menu()
            menu.getSoftDrinks(function (err, response) {
                expect(err).to.be.null
                expect(response).not.to.be.null;
                expect(response.length).greaterThan(0)
                done()
            })
        })
    })
    describe('AlcoholicDrinkMenu', function () {
        it('should check get alcoholic drink menu items', function (done) {
            var menu = new Menu()
            menu.getAlcoholicDrinks(function (err, response) {
                expect(err).to.be.null
                expect(response).not.to.be.null
                expect(response.length).greaterThan(0)
                done()
            })
        })
    })
})