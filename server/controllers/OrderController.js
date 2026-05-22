const OrderModel = require("../models/OrderModel");
const { message } = require("../library/helper");
const ProductModel = require("../models/ProductModel");

// create order function (user...)

const createOrder = async (req, res) => {
    try {
        const userId = req.user._id;

        const { products, payment_method } = req.body;

        if (!products || products.length === 0) {
            return res.send(message.general_error("cart is empty"));
        }

        let subtotal = 0;
        let discount_total = 0;
        const orderProducts = [];

        for (let item of products) {
            const product = await ProductModel.findById(item.product_id);
            if (!product) continue;
            const qty = item.qty || 1;
            const originalPrice = product.original_price * qty;
            const discountedPrice = product.discounted_price * qty;
            subtotal += originalPrice;
            discount_total += (originalPrice - discountedPrice);

            orderProducts.push({
                product_id: product._id,
                name: product.name,
                sku_id: product.sku_id,
                qty,

                original_price: product.original_price,
                discounted_price: product.discounted_price,
                discount_percentage: product.discount_percentage,

                final_price: discountedPrice,

                image: product.image_name,

            })
        }
        const total_amount = subtotal - discount_total;

        const order = await OrderModel.create({
            user_id: userId,
            products: orderProducts,

            subtotal,
            discount_total,
            total_amount,

            payment_method: payment_method || "COD",
            payment_status: "Pending",
            status: "Pending"
        });
        return res.send({
            flag: 1,
            msg: "Order placed successfully",
            order
        });

    } catch (error) {
        console.log(error);
        return res.send(message.catch_error);
    }
}

// get user orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({ user_id: req.user._id }).sort({ createdAt: -1 });
        return res.send({
            flag: 1,
            orders
        })
    } catch (error) {
        return res.send(message.catch_error);
    }
}

// get single order

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await OrderModel.findById(id).populate("user_id", "name email");
        return res.send({
            flag: 1,
            order
        });
    } catch (error) {
        console.log(error);
        res.send(message.catch_error);
    }
}

// admin-get all orders

const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find().populate("user_id", "name email").sort({ createdAt: -1 });

        return res.send(
            {
                flag: 1,
                orders
            }
        );

    } catch (error) {
        console.log(error);
        return res.send(message.catch_error);
    }
}

// admin- order update status

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;
        const order = await OrderModel.findById(id);

        if (!order) {
            return res.send(message.general_error("order not found"));
        }
        order.status = status;
        await order.save();
        return res.send(message.general_success("order status updated"));
    } catch (error) {
        console.log(error);
        return res.send(catch_error);
    }
}

// user- cancel order
const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await OrderModel.findById(id);
        if (!order) {
            return res.send(message.general_error("order not found"));
        }

        if (
            order.status === "Shipped" ||
            order.status === "Delivered" ||
            order.status === "Cancelled"
        ) {
            return res.send({
                flag: 0,
                msg: "Order cannot be cancelled"
            });
        }

        order.status="Cancelled";
        await order.save();
         res.send(message.general_success("order cancelled"));
    } catch (error) {
          console.log(error);
        res.send(message.catch_error);
    }
}

module.exports={createOrder,getMyOrders,getOrderById,getAllOrders,updateOrderStatus,cancelOrder};