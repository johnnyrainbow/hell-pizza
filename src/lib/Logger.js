class Logger {
    constructor() {
        this.logs = []
    }
    log(message) {
        this.logs.push(message)
        return console.log(message)
    }
}
module.exports = Logger