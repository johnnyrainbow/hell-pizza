module.exports = {

    configureUpdateData(options) {
        options = options || {}
        var data = {
            customer_address_id: options.address,
            location_id: options.location || null,
            menu_id: options.menu_id,
            notes: options.notes,
            order_type_id: options.order_type_id,
            store_id: options.store_id,
            time_scheduled: options.time_scheduled,
        }
        return data
    },

    formatStoreURL(url, options) {
        options = options || {}
        return url
            .replace('${LOCATION_HASH}', options.location_hash)
            .replace('${STORE_ID}', options.store_id)
    },

    formatUserURL(url, options) {
        options = options || {}
        return url
            .replace('${ADDRESS_QUERY}', options.address_query)
            .replace('${CUSTOMER_ID}', options.customer_id)
            .replace('${CUSTOMER_ADDRESS_ID}', options.customer_address_id)
    },

    formatOrderURL(url, options) {
        options = options || {}
        return url
            .replace('${ORDER_TOKEN}', options.token)
            .replace('${ORDER_ID}', options.order_id)
            .replace('${ORDER_ITEM_ID}', options.order_item_id)
    }
}