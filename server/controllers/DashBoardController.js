const OrderModel = require("../models/OrderModel");
const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/UserModel");
const { message } = require("../library/helper");

const getDashBoard = async (req, res) => {
    try {
        const totalOrders = await OrderModel.countDocuments();//counting total orders
        const totalProducts = await ProductModel.countDocuments();//counting total products
        const totalCustomers = await UserModel.countDocuments();//counting total customers

        // fixed revenue
        const revenueData = await OrderModel.aggregate(
            [
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$total_amount" }

                    }
                }
            ]);

        const totalRevenue = revenueData[0].total || 0;

        // recent orders
        const recentOrders = await OrderModel.find().sort({ createdAt: -1 })
            .limit(5)
            .select("products total_amount status createdAt");
        console.log("recentOrders", recentOrders);

        return res.send(
            {
                flag: 1,
                data: {
                    stats: {
                        totalOrders,
                        totalProducts,
                        totalCustomers,
                        totalRevenue
                    },
                    recentOrders
                }
            }
        )

    } catch (error) {
        console.log("dashboard error", error);
        return res.send({ flag: 0, msg: "Dashboard error" });
    }
}

module.exports={getDashBoard};