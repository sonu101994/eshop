const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    products: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },

            name: String,
            sku_id: String,
            qty: {
                type: Number,
                default: 1
            },

            original_price: Number,
            discounted_price: Number,
            discount_percentage: Number,

            final_price: Number,

            image: String
        }
    ],
    subtotal: Number,
    discount_total: Number,
    total_amount: Number,

    status: {
        type: String,
        default: "Pending"
    },

    payment_method: {
        type: String,
        default: "COD"
    },

    payment_status: {
        type: String,
        default: "Pending"
    }

}, { timestamps: true });

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;