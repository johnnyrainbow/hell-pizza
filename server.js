module.exports = {
    Menu: require('./src/Menu'),
    Store: require('./src/Store'),
    User: require('./src/User'),
};
var Logger =require('./src/lib/Logger')
var logger = new Logger() //TODO singleton this
module.exports = logger

