var url = require('./json/urls.json');
var status = require('./json/status_codes.json');
var httpJson = require('./request/request');
var util = require('./util/util');

class Order {
	constructor() {}

	/**
	 * Instantiates an order.
	 * @param {String} auth_token - The auth token. null if logged out.
	 * @param {number} order_type_id - The type of collection. Pickup = 1  Delivery = 2.
	 * @param {number} store_id - The store id.
	 * @param {Function} callback - The callback that handles the response.
	 */
	initOrder(auth_token, order_type_id, store_id, callback) {
		var data = {
			menu_id: 1, //default main menu
			order_type_id: order_type_id,
			store_id: store_id,
			voucher_code: null,
		};
		httpJson.post(
			url.order.init_order,
			data,
			auth_token,
			function (err, response) {
				if (err) return callback(err);
				var result = response.payload;

				return callback(null, result);
			}
		);
	}

	/**
	 * Gets an order from provided token.
	 * @param {string} token - The order token.
	 * @param {Function} callback - The callback that handles the response.
	 */
	getOrder(token, callback) {
		var formatted_url = util.formatOrderURL(url.order.get_order, {
			token: token,
		});
		httpJson.get(formatted_url, function (err, response) {
			if (err) return callback(err);

			var result = response.payload;
			return callback(null, result);
		});
	}

	/**
	 * Adds an item to existing order.
	 * @param {string} auth_token - The auth token. Null if logged out
	 * @param {string} order_token - The order token.
	 * @param {number} item_id - The item id.
	 * @param {number} item_size_id - Item sizes: 2 = small 3 = large
	 * @param {number} item_quantity - The quantity of the item you wish to add.
	 * @param {Object} modifiers- The modifier parameters of an order.
	 * @param {string} notes - The notes for the item you are adding.
	 * @param {Function} callback - The callback that handles the response.
	 */
	addItem(
		auth_token,
		order_token,
		item_id,
		item_size_id,
		item_quantity,
		modifiers,
		notes,
		callback
	) {
		if (!order_token) return callback(status.error.missing_token);

		if (!item_id || !item_size_id || !item_quantity)
			return callback(status.error.missing_item_params);

		var formatted_url = util.formatOrderURL(url.order.add_item, {
			token: order_token,
		});
		var data = {
			item_id: item_id,
			item_size_id: item_size_id,
			item_quantity: item_quantity,
			modifiers: modifiers,
			notes: notes,
		};
		console.log(formatted_url);
		httpJson.post(formatted_url, data, auth_token, function (err, response) {
			if (err) return callback(err);
			var result = response.payload;

			return callback(null, result);
		});
	}

	/**
	 * Removes an item from an existing order.
	 * @param {string} token - The order token.
	 * @param {number} order_item_id - The identifier of the item in its respective order.
	 * @param {Function} callback - The callback that handles the response.
	 */
	removeItem(token, order_item_id, callback) {
		if (!token) return callback(status.error.missing_token);

		if (!order_item_id) return callback(status.error.no_provided_id);

		var formatted_url = util.formatOrderURL(url.order.remove_item, {
			token: token,
			order_item_id: order_item_id,
		});

		httpJson.delete(formatted_url, function (err, response) {
			if (err) return callback(err);
			var result = response.payload;

			return callback(null, result);
		});
	}
	/**
	 * Updates an order's store ID.
	 * @param {string} token - The order token.
	 * @param {number} order_id - The id of the order you wish to update.
	 * @param {number} store_id - The id of the store you wish to use.
	 * @param {Function} callback - The callback that handles the response.
	 */
	updateStoreId(token, order_id, store_id, callback) {
		if (!order_id) return callback(status.error.no_provided_time);

		if (!token || !order_id) return callback(status.error.missing_token);

		var data = util.configureUpdateData({ store_id: store_id });
		this.update(null, token, order_id, data, callback);
	}

	/**
	 * Updates an order's pickup/delivery time.
	 * @param {string} token - The order token.
	 * @param {number} order_id - The id of the order you wish to update.
	 * @param {number} new_time - The new pickup/delivery time (UTC) of the order you wish to update for.
	 * @param {Function} callback - The callback that handles the response.
	 */
	updateCollectionTime(token, order_id, new_time, callback) {
		if (!new_time) return callback(status.error.no_provided_time);

		if (!token || !order_id) return callback(status.error.missing_token);

		var data = util.configureUpdateData({ time_scheduled: new_time });
		this.update(null, token, order_id, data, callback);
	}

	/**
	 * Updates an order's collection type (pickup/delivery).
	 * @param {string} token - The order token.
	 * @param {number} order_id - The id of the order you wish to update.
	 * @param {number} type - The type (Pickup = 1 Delivery = 2).
	 * @param {Function} callback - The callback that handles the response.
	 */
	updateCollectionType(token, order_id, type, callback) {
		if (!type) return callback(status.error.no_provided_type);

		if (!token || !order_id) return callback(status.error.missing_token);

		var data = util.configureUpdateData({ order_type_id: type });
		this.update(null, token, order_id, data, callback);
	}

	/**
	 * Updates an order.
	 * @param {string} auth_token - The auth token. Null if logged out.
	 * @param {string} order_token - The order token.
	 * @param {number} order_id - The id of the order you wish to update.
	 * @param {Object} data - The updatable data parameters.
	 * @param {Function} callback - The callback that handles the response.
	 */
	update(auth_token, order_token, order_id, data, callback) {
		var formatted_url = util.formatOrderURL(url.order.update_order, {
			token: order_token,
			order_id: order_id,
		});

		httpJson.post(formatted_url, data, auth_token, function (err, response) {
			if (err) return callback(err);
			var result = response.payload;

			return callback(null, result);
		});
	}

	/**
	 * Applies a voucher code to an order.
	 * @param {string} auth_token - The auth token. Null if logged out.
	 * @param {string} order_token - The order token.
	 * @param {string} voucher_code - The voucher code you wish to apply.
	 * @param {Function} callback - The callback that handles the response.
	 */
	applyVoucherCode(auth_token, order_token, voucher_code, callback) {
		if (!order_token) return callback(status.error.missing_token);

		if (!voucher_code) return callback(status.error.no_provided_voucher);

		var formatted_url = util.formatOrderURL(url.order.voucher_code, {
			token: order_token,
		});
		var data = {
			order_token: order_token,
			voucher_code: voucher_code,
		};
		httpJson.post(formatted_url, data, auth_token, function (err, response) {
			if (err) return callback(err);

			var result = response.payload;
			return callback(null, result);
		});
	}

	/**
	 * Checks the validity of a voucher code
	 * @param {string} auth_token - The auth token. Null if logged out.
	 * @param {string} voucher_code - The voucher code you wish to apply.
	 * @param {Function} callback - The callback that handles the response.
	 */
	checkVoucherCode(auth_token, voucher_code, callback) {
		if (!voucher_code) return callback(status.error.no_provided_voucher);

		var formatted_url = util.formatOrderURL(url.user.check_voucher_code, {
			token: null,
		});
		var data = {
			code: voucher_code,
		};

		httpJson.post(formatted_url, data, auth_token, function (err, response) {
			if (err) return callback(err);

			var result = response.payload;
			return callback(null, result);
		});
	}

	/**
	 * Clears the voucher code for an order.
	 * @param {string} token - The order token.
	 * @param {Function} callback - The callback that handles the response.
	 */
	clearVoucherCode(token, callback) {
		var formatted_url = util.formatOrderURL(url.order.voucher_code, {
			token: token,
		});

		httpJson.delete(formatted_url, function (err, response) {
			if (err) return callback(err);

			var result = response.payload;
			return callback(null, result);
		});
	}

	/**
	 * Places an order.
	 * @param {string} order_token - The auth token. Null if logged out.
	 * @param {string} order_token - The order token.
	 * @param {string} store_payment_type_id - The chosen payment_type_id unique to the store you have chosen. NOTE currently does not support pay with card. Only pay with cash delivery and pay on pickup.
	 * @param {Function} callback - The callback that handles the response.
	 */
	placeOrder(auth_token, order_token, store_payment_type_id, callback) {
		if (!store_payment_type_id)
			return callback(status.error.no_provided_store_payment_id);

		if (!order_token) return callback(status.error.missing_token);

		var formatted_url = util.formatOrderURL(url.order.place, {
			token: order_token,
		});
		var data = {
			order_token: order_token,
			store_payment_type_id: no_provided_store_payment_id,
		};
		httpJson.post(formatted_url, data, auth_token, function (err, response) {
			if (err) return callback(err);

			return callback(response);
		});
	}
}

module.exports = Order;
