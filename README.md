# hell-pizza-api

A node.js wrapper for the New Zealand based Hell Pizza API. 

## Installation

```bash
npm install --save hell-pizza-api
```

## Testing
Run `npm test`

&nbsp;
&nbsp;

# Menu

### Example
```javascript
var hellPizza = require('hell-pizza-api')
var store_id = 1

    hellPizza.Menu.getPizzas(store_id, function (err, response) {
        if (err) //handle err

         //response is an array, contains items in the pizza menu
      })
```

### Methods
`callback` takes `err` and `response` arguments.

#### `Menu.getMenuItems(store_id, callback)`
Gets all items, as well as store_info on the menu specified by store_id. 

#### `Menu.getPizzas(store_id, callback)`
Gets all pizzas as well as store_info on the menu specified by store_id.   

#### `Menu.getSides(store_id, callback)`
Gets all sides as well as store_info on the menu specified by store_id. 

#### `Menu.getSoftDrinks(store_id, callback)`
Gets all soft drinks as well as store_info on the menu specified by store_id. 

#### `Menu.getDesserts(store_id, callback)`
Gets all desserts as well as store_info on the menu specified by store_id. 

#### `Menu.getSalads(store_id, callback)`
Gets all.. ick.. salads.. as well as store_info on the menu specified by store_id. 

#### `Menu.getAlcoholicDrinks(store_id callback)`
Gets all alcoholic drinks as well as store_info on the menu specified by store_id. 



# User

### Example
```javascript
    hellPizza.User.login(email, password, function (err, response) {
        if (err) //handle err

        //response contains auth token and other login/auth info
    })
```

### Methods
`callback` takes `err` and `response` arguments.

#### `User.checkAccountExists(email, callback)`
Check if a user exists in database by provided email string.

#### `User.login(email, password, callback)`
Login as a user with provided email and password.
Response includes auth token and other user details.

#### `User.register(email, first_name, password, phone_number, callback)`
Register as a user with provided string parameters.

#### `User.findAddress(address_query, callback)`
Gets all formatted addresses for an address query. Formatted addresses contain location_hash that can be used to easily find nearby stores.



# Store

### Example
```javascript
    hellPizza.User.findAddress(address_query, function (err, response) {
        if (err) //handle err
        
        //response contains valid addresses that match query
        var address_response = response[0] 

        hellPizza.Store.getServiceableStores(address_response.location_hash, function (err, response) {
            if (err) //handle err

           //response contains nearby available stores. Max limit 4.
        })
    })
```

### Methods
`callback` takes `err` and `response` arguments.

#### `Store.getAllStores(callback)`
Gets all stores in the database.

#### `Store.getSingleRegionStores(region, callback)`
Gets all stores for a provided region.
Access region list through `Store.region_list`
```json
 "region_list": {
        "AUCKLAND": "auckland",
        "NORTHLAND": "northland",
        "BAY_OF_PLENTY": "bay-of-plenty",
        "WAIKATO": "waikato",
        "TAUPO": "taupo",
        "TARANAKI": "taranaki",
        "HAWKES_BAY": "hawkes-bay",
        "MANAWATU": "manawatu",
        "WAIRAPA": "wairapa",
        "WELLINGTON": "wellington",
        "NELSON": "nelson",
        "CANTERBURY": "canterbury",
        "TIMARU": "timaru",
        "QUEENSTOWN": "queenstown",
        "OTAGO": "otago",
        "SOUTHLAND": "southland"
    }
```

#### `Store.getServiceableStores(location_hash, callback)`
Gets all stores in service from provided location_hash.

#### `Store.getNearestStore(lat, lng callback)`
Gets nearest store from provided lat lng location.



# Order

### Example
```javascript
      hellPizza.Order.initOrder(order_type_id, store_id, function (err, response) {
          if (err) //handle err

          //response contains order_id and order token.
      })
```

```javascript
      hellPizza.Order.addItem(order_token, item_id, item_size_id, item_quantity, modifiers, notes, function (err, response) {
          if (err) //handle err

        //response contains your updated order
      })
```

### Methods
`callback` takes `err` and `response` arguments.

#### `Order.initOrder(order_type_id, store_id, callback)`
Instantiates an order on the API, taking an order_type_id and a store ID.
Response contains generated order_id and order token.

```json
 "order_type": {
        "PICKUP": 1,
        "DELIVERY": 2
    },
```

#### `Order.getOrder(token, callback)`
Gets your current order with provided (order) token string

#### `Order.addItem(token, item_id, item_size_id, item_quantity, modifiers, notes, callback) (token, callback)`
Adds an item to an existing order. Takes as parameters the order token, the id of the item you wish to add, the applicable size of the item, quantity, and any modifiers or notes.

#### `Order.removeItem(token, order_item_id, callback)`
Removes an item in your order. Takes the order token and order_item_id as parameters. 

#### `Order.updateStoreId(token, order_id, store_id, callback)`
Updates the designated store_id for an order. Takes the order token, order_id, and new store_id as parameters. 

#### `Order.updateCollectionTime(token, order_id, new_time, callback)`
Updates the designated collection time for an order. Takes the order token, order_id, and new_time as parameters. 


#### `Order.updateCollectionType(token, order_id, type, callback)`
Updates the designated collection time for an order. Takes the order token, order_id, and type as parameters. Type integer value of pickup or delivery.

```json
 "order_type": {
        "PICKUP": 1,
        "DELIVERY": 2
    },
``` 

#### `Order.applyVoucherCode(token, voucher_code, callback)`
Applies provided voucher_code to an order. Takes the order token, voucher_code string as parameters.

#### `Order.clearVoucherCode(token, callback)`
Clears the voucher_code of an order. Takes the order token as a parameter.





