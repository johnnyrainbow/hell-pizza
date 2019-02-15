module.exports = {

    setUpdateItems(self, result) {
        self.items = result.items
        self.price.total = result.total_price
        self.price.total_tax = result.total_tax
        self.price.delivery_fee = result.delivery_fee
        self.price.surcharge = result.surcharge
        self.price.discount = result.discount
    },

    configureUpdateData(self, options) {
        options = options || {}
        var data = {
            customer_address_id: options.address || self.address,
            location_id: options.location || null,
            menu_id: self.menu_id,
            notes: options.notes || self.notes,
            order_type_id: options.order_type_id || self.order_type_id,
            store_id: self.store_id,
            time_scheduled: self.time_scheduled,
        }
        return data
    }
}