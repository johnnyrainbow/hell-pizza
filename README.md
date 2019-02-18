# hell-pizza-api-wrapper

A node.js wrapper for the Hell's Pizza API.

<h4>Installation</h4>
```npm install --save hell-pizza-api```

<h4>Basic usage examples</h4>

```
var hellPizza = require('hell-pizza-api')

//MENU

getPizzas(req, res) {
    hellPizza.Menu.getPizzas(function (err, response) {
        if (err) return res.status(500).send({ error: err })

         //response is an array, contains items in the pizza menu
      })
    },


//USER

login(req, res) {
    hellPizza.User.login(req.body.email, req.body.password, function (err, response) {
        if (err) return res.status(500).send({ error: err })

        //response is auth token and other login/auth info
    })
  },

//STORE

findNearestStores(req, res) {
    hellPizza.User.findAddress(req.body.address, function (err, response) {
        if (err) return res.status(500).send({ error: err })
        
        //response contains valid addresses that match query
        var address_response = response[0] //take the first location in array 

        hellPizza.Store.getServiceableStores(address_response.location_hash, function (err, response) {
            if (err) return res.status(500).send({ error: err })

           //response contains nearby available stores. Max limit 4.
        })
    })
},

//ORDER

initOrder(req, res) {
      hellPizza.Order.initOrder(req.body.order_type_id, req.body.store_id, function (err, response) {
          if (err) return res.status(500).send({ error: err })

          //response contains order_id and order token.
      })
  },

addItemToOrder(req, res) {
      //pass through your created order token, the id of the item you wish to add, the applicable size of the item, quantity, and any modifiers or notes.

      hellPizza.Order.addItem(order_token, item_id, item_size_id, item_quantity, modifiers, notes, function (err, response) {
          if (err) return res.status(500).send({ error: err })

        //response contains your updated order
      })
  },

```
