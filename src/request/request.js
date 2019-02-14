var http = require('request');
var urls = require('../urls.json')

module.exports.post = function (url, req, callback) {
    if (typeof req != 'string')
        req = JSON.stringify(req)

    var requestBody = {
        uri: url,
        headers: {
            'Content-Type': 'application/json'
        },
        body: req
    };

    http.post(requestBody, function (error, res, body) {
        if (error) {
            return callback(error)
        }
        if (res.statusCode !== 200) {
            return callback('HTML Status Code Error ' + res.statusCode)
        }
        try {
            var parsed = JSON.parse(body);
        }
        catch (error) {
            return callback(error)
        }
        return callback(null, parsed)
    });
}

module.exports.get = function (url, callback) {

    http.get(url, function (error, res, body) {
        if (error) {  //If request errored out.
            return callback(error)
        }
        if (res.statusCode !== 200) {  //If request didn't error but response isn't status code 200.
            return callback('HTML Status Code Error ' + res.statusCode)
        }
        try {
            var parsed = JSON.parse(body);
        }
        catch (error) {
            return callback(error)
        }
        return callback(null, parsed)
    });
}