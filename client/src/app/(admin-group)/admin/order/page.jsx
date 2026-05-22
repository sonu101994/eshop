"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getOrders } from "@/library/api-call";
import { apiClient, getAuthHeader } from "@/library/helper";
import { toast } from "react-toastify";
import { FiSearch } from "react-icons/fi";

export default function OrderPage() {

    const [orders, setOrders] = useState([]);
    const fetchOrders = async () => {
        console.log("hitting");
        const { orders } = await getOrders();
        console.log("orders",orders);
        setOrders(orders || []);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // update status
    const updateStatus = async (id, status) => {
        try {
            const response = await apiClient.patch(
                `/order/admin/status/${id}`,
                { status },
                getAuthHeader()
            );

            if (response.data.flag === 1) {
                toast.success("status updated");
                fetchOrders();
            } else {
                toast.error(res.data.msg);
            }
        } catch (error) {
            console.log(error);
            toast.error("Update failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-3 sm:p-5 lg:p-6 text-gray-700">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Orders
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Manage all customer orders easily
                    </p>
                </div>

            </div>

            {/* Search / Info bar */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-6">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    {/* search */}
                    <div className="relative w-full lg:max-w-md">

                        <FiSearch
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />

                        <input
                            type="text"
                            placeholder="Search order..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                        />

                    </div>

                    {/* total */}
                    <div className="text-sm text-gray-500">
                        Total:
                        <span className="font-semibold text-black ml-1">
                            {orders.length}
                        </span>{" "}
                        {orders.length === 1 ? "Order" : "Orders"}
                    </div>

                </div>
            </div>

            {/* TABLE (Desktop) */}
            <div className="hidden xl:block bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>
                                {[
                                    "Order ID",
                                    "Customer",
                                    "Amount",
                                    "Status",
                                    "Payment",
                                    "Action"
                                ].map((head) => (
                                    <th
                                        key={head}
                                        className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase"
                                    >
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {orders.map((order) => (

                                <tr key={order._id} className="hover:bg-gray-50">

                                    <td className="px-6 py-5 font-medium text-gray-800">
                                        #{order._id.slice(-6)}
                                    </td>

                                    <td className="px-6 py-5">
                                        <p className="font-semibold">{order.user_id?.name}</p>
                                        <p className="text-xs text-gray-500">{order.user_id?.email}</p>
                                    </td>

                                    <td className="px-6 py-5 font-semibold">
                                        ₹{order.total_amount}
                                    </td>

                                    {/* STATUS */}
                                    <td className="px-6 py-5">

                                        <select
                                            value={order.status}
                                            onChange={(e) =>
                                                updateStatus(order._id, e.target.value)
                                            }
                                            className="border rounded-lg px-2 py-2 text-sm"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>

                                    </td>

                                    <td className="px-6 py-5">
                                        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                                            {order.payment_method}
                                        </span>
                                    </td>

                                    <td className="px-6 py-5">

                                        <Link
                                            href={`/admin/order/${order._id}`}
                                            className="bg-black text-white px-4 py-2 rounded-lg text-sm"
                                        >
                                            View
                                        </Link>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>
            </div>

            {/* MOBILE CARDS */}
            <div className="xl:hidden space-y-4">

                {orders.map((order) => (

                    <div
                        key={order._id}
                        className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4"
                    >

                        {/* top */}
                        <div className="flex justify-between items-start">

                            <div>
                                <h2 className="font-semibold">
                                    #{order._id.slice(-6)}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {order.user_id?.name}
                                </p>
                            </div>

                            <Link
                                href={`/admin/order/${order._id}`}
                                className="bg-black text-white px-3 py-1 rounded-lg text-xs"
                            >
                                View
                            </Link>

                        </div>

                        {/* amount */}
                        <div className="mt-3">
                            <p className="text-sm text-gray-500">Amount</p>
                            <p className="font-semibold">₹{order.total_amount}</p>
                        </div>

                        {/* status */}
                        <div className="mt-3">

                            <p className="text-sm text-gray-500 mb-1">Status</p>

                            <select
                                value={order.status}
                                onChange={(e) =>
                                    updateStatus(order._id, e.target.value)
                                }
                                className="w-full border rounded-lg px-2 py-2 text-sm"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}
