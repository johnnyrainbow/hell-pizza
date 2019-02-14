var http = require('request')
var RequestFormatter = require('./request_formatter')
var Status = require('../status_codes/codes.json')

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
            return callback(Status.error.bad_code + res.statusCode)

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
            return callback(Status.error.bad_code + res.statusCode)

        try {
            var parsed = JSON.parse(body);
        } catch (error) {
            return callback(error)
        }
        return callback(null, parsed)
    });
}



