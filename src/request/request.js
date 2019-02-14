var http = require('request');
var urls = require('../urls.json')
var RequestFormatter = require('./request_formatter')

module.exports.post = function (url, req, callback) {

    if (typeof req != 'string')
        req = JSON.stringify(req)

    var requestBody = {
        uri: RequestFormatter.formatRequest(url),
        headers: {
            'Content-Type': 'application/json'
        },
        body: req
    };

    http.post(requestBody, function (error, res, body) {
        if (error)
            return callback(error)

        if (res.statusCode !== 200)
            return callback('Status Code Error ' + res.statusCode)

        try {
            var parsed = JSON.parse(body);
        } catch (error) {
            return callback(error)
        }
        return callback(null, parsed)
    });
}

module.exports.get = function (url, callback) {

    http.get(RequestFormatter.formatRequest(url), function (error, res, body) {
        if (error)
            return callback(error)

        if (res.statusCode !== 200)
            return callback('Status Code Error ' + res.statusCode)

        try {
            var parsed = JSON.parse(body);
        } catch (error) {
            return callback(error)
        }
        return callback(null, parsed)
    });
}



