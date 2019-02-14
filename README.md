# hell-pizza-node-api

A node.js wrapper for the Hell's Pizza API
<h4>Example</h4>

```
  var hellPizza = require('hell-pizza')
  
  var Menu = new hellPizza.Menu()
  
  Menu.getPizzas(function (err, response) {
    if (err) return err
      //json formatted response
  })```
