# hell-pizza-api-wrapper

A node.js wrapper for the Hell's Pizza API
<h4>Example</h4>

```
  var hellPizza = require('hell-pizza-api')
  
  var Menu = new hellPizza.Menu()
  
  Menu.getPizzas(function (err, response) {
    if (err) //handler error
    //json formatted response
  })```
