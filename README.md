# hell-pizza-api-wrapper

A node.js wrapper for the Hell's Pizza API.

## Installation

```bash
npm install --save hell-pizza-api
```

## Basic usage examples

## Menu
```javascript
var hellPizza = require('hell-pizza-api')

getPizzas(req, res) {
    hellPizza.Menu.getPizzas(function (err, response) {
        if (err) return res.status(500).send({ error: err })

         //response is an array, contains items in the pizza menu
      })
    }
```

## User

```javascript
login(req, res) {
    hellPizza.User.login(req.body.email, req.body.password, function (err, response) {
        if (err) //handle err

        //response contains auth token and other login/auth info
    })
  }
```

## STORE

```javascript
findNearestStores(req, res) {
    hellPizza.User.findAddress(req.body.address, function (err, response) {
        if (err) //handle err
        
        //response contains valid addresses that match query
        var address_response = response[0] 

        hellPizza.Store.getServiceableStores(address_response.location_hash, function (err, response) {
            if (err) //handler err

           //response contains nearby available stores. Max limit 4.
        })
    })
}
```

## ORDER

```javascript
initOrder(req, res) {
      hellPizza.Order.initOrder(req.body.order_type_id, req.body.store_id, function (err, response) {
          if (err) //handle err

          //response contains order_id and order token.
      })
  }
```

```javascript
addItemToOrder(req, res) {
      //pass through your created order token, the id of the item you wish to add, the applicable size of the item, quantity, and any modifiers or notes.

      hellPizza.Order.addItem(order_token, item_id, item_size_id, item_quantity, modifiers, notes, function (err, response) {
          if (err) //handle err

        //response contains your updated order
      })
  }
```
