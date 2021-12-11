var http = require('request');
var requestFormatter = require('./request_formatter');
var util = require('../util/util');
module.exports.post = function (url, req, auth_token, callback) {
	if (typeof req != 'string') req = JSON.stringify(req);

	var requestBody = {
		uri: requestFormatter.formatRequest(url),
		headers: {
			'Content-Type': 'application/json',
			Authorization: auth_token,
		},
		body: req,
	};

	http.post(requestBody, function (error, res, body) {
		if (error) return callback(error);

		if (res.statusCode !== 200) return callback(body);

		try {
			var parsed = JSON.parse(body);
		} catch (error) {
			return callback(error);
		}
		return callback(null, parsed);
	});
};

module.exports.get = function (url, callback) {
	http.get(requestFormatter.formatRequest(url), function (error, res, body) {
		if (error) return callback(error);

		if (res.statusCode !== 200) return callback(body);

		try {
			var parsed = JSON.parse(body);
		} catch (error) {
			return callback(error);
		}
		return callback(null, parsed);
	});
};

module.exports.delete = function (url, callback) {
	http.delete(requestFormatter.formatRequest(url), function (error, res, body) {
		if (error) return callback(error);

		if (res.statusCode !== 200) return callback(body);

		try {
			var parsed = JSON.parse(body);
		} catch (error) {
			return callback(error);
		}
		return callback(null, parsed);
	});
};
