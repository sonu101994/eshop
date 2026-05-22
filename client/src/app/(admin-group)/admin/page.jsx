"use client";

import { useEffect, useState } from "react";
import { apiClient, getAuthHeader } from "@/library/helper";
import { toast } from "react-toastify";

export default function adminDashBoard() {

    const [stats, setStats] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // fetching dashboard details
    const fetchDashBoard = async () => {
        try {
            const response = await apiClient.get(
                "/dashboard",
                getAuthHeader()
            );

            if (response.data.flag == 1) {
                setStats(response.data.data.stats);
                setOrders(response.data.data.recentOrders || []);
            }
        } catch (error) {
            console.log(error);
            toast.error("dashboard data not found");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchDashBoard();
    }, []);
        // card to show data
    const Card = ({ title, value, color }) => {
        return (
            <div className={`p-5 rounded-2xl shadow-md text-white ${color}`}>
                <p className="text-sm opacity-80">{title}</p>
                <h2 className="text-2xl font-bold mt-2">
                    {value || 0}
                </h2>
            </div>
        );
    };
        // status color set function
    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-700";
            case "completed":
                return "bg-green-100 text-green-700";
            case "cancelled":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 text-gray-700">

            {/* header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                    Dashboard
                </h1>
                <p className="text-gray-500">
                    Welcome back, here is your business overview
                </p>
            </div>

            {/* loading */}
            {loading ? (
                <div className="h-40 flex items-center justify-center text-gray-500">
                    Loading dashboard...
                </div>
            ) : (
                <>
                    {/* stats grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                        <Card
                            title="Total Orders"
                            value={stats?.totalOrders}
                            color="bg-gradient-to-r from-blue-500 to-blue-700"
                        />

                        <Card
                            title="Products"
                            value={stats?.totalProducts}
                            color="bg-gradient-to-r from-purple-500 to-purple-700"
                        />

                        <Card
                            title="Customers"
                            value={stats?.totalCustomers}
                            color="bg-gradient-to-r from-green-500 to-green-700"
                        />

                        <Card
                            title="Revenue"
                            value={`₹${stats?.totalRevenue || 0}`}
                            color="bg-gradient-to-r from-orange-500 to-orange-700"
                        />

                    </div>

                    {/* recent orders */}
                    <div className="mt-10 mb-3">
                        <h2 className="text-xl font-bold text-gray-900">
                            Recent Orders
                        </h2>
                        <p className="text-sm text-gray-500">
                            Latest customer activity
                        </p>
                    </div>

                    {/* table */}
                    <div className="hidden md:block bg-white rounded-2xl shadow overflow-hidden text-gray-700">

                        <table className="w-full">

                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="p-4 text-left">Order ID</th>
                                    <th className="p-4 text-left">Amount</th>
                                    <th className="p-4 text-left">Status</th>
                                </tr>
                            </thead>

                            <tbody>

                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="p-6 text-center text-gray-500">
                                            No orders found
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((o) => (
                                        <tr key={o._id} className="border-t hover:bg-gray-50">

                                            <td className="p-4 font-medium text-gray-700">
                                                {o._id}
                                            </td>

                                            <td className="p-4">
                                                ₹{o.total_amount}
                                            </td>

                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(o.status)}`}>
                                                    {o.status}
                                                </span>
                                            </td>

                                        </tr>
                                    ))
                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* mobile */}
                    <div className="md:hidden space-y-3 mt-4">

                        {orders.length === 0 ? (
                            <div className="text-center text-gray-500">
                                No orders found
                            </div>
                        ) : (
                            orders.map((o) => (
                                <div key={o._id} className="bg-white p-4 rounded-xl shadow">

                                    <p className="font-semibold text-gray-900">
                                        #{o._id}
                                    </p>

                                    <p className="text-sm text-gray-600 mt-1">
                                        ₹{o.total_amount}
                                    </p>

                                    <span className={`inline-block mt-2 text-xs px-2 py-1 rounded ${getStatusColor(o.status)}`}>
                                        {o.status}
                                    </span>

                                </div>
                            ))
                        )}

                    </div>

                </>
            )}

        </div>
    );

}