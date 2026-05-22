"use client";

import { useEffect,useState } from "react";
import { useParams } from "next/navigation";
import { apiClient,getAuthHeader } from "@/library/helper";
import { toast } from "react-toastify";

export default function OrderDetailsPage(){
    const params =useParams();

    const [order,setOrder]=useState(null);

    // fetch single order

    const fetchOrder=async()=>{
        try {
            const response=await apiClient.get(`/order/admin/details/${params.order_id}`,getAuthHeader());
            if (response.data.flag==1) {
                setOrder(response.data.order);
            }else{
                toast.error(response.data.msg);
            }
        } catch (error) {
             console.log(error);
            toast.error("Failed to fetch order");
        }
    };

    useEffect(()=>{
        if (params.order_id) {
            fetchOrder();
        }
    },[params.order_id]);

    if (!order) {
        return (
            <div className="p-6 text-lg font-semibold text-gray-700">
                Loading.....
            </div>
        );
    }

     return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 text-gray-700">

            {/* Header */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">

                <h1 className="text-2xl font-bold text-gray-900">
                    Order Details
                </h1>

                <p className="text-sm text-gray-500 mt-1 break-all">
                    Order ID: {order._id}
                </p>

            </div>

            {/* Customer Details */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">

                <h2 className="text-lg font-semibold mb-4">
                    Customer Details
                </h2>

                <div className="grid sm:grid-cols-2 gap-5">

                    <div>

                        <p className="text-sm text-gray-500">
                            Name
                        </p>

                        <p className="font-medium text-gray-900 mt-1">
                            {order.user_id?.name || "N/A"}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">
                            Email
                        </p>

                        <p className="font-medium text-gray-900 mt-1">
                            {order.user_id?.email || "N/A"}
                        </p>

                    </div>

                </div>

            </div>

            {/* Products */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">

                <div className="p-6 border-b border-gray-200">

                    <h2 className="text-lg font-semibold">
                        Ordered Products
                    </h2>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[700px]">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Product
                                </th>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    SKU
                                </th>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Qty
                                </th>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Original
                                </th>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Discounted
                                </th>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Final
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {order.products?.map((item, index) => (

                                <tr
                                    key={index}
                                    className="border-b border-gray-100"
                                >

                                    {/* product */}
                                    <td className="px-4 py-4">

                                        <div className="flex items-center gap-3">

                                            <img
                                                   src={`${process.env.NEXT_PUBLIC_ASSET_PATH}/images/products/main_images/${item.image}`}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-lg border"
                                            />

                                            <div>

                                                <p className="font-medium text-gray-900">
                                                    {item.name}
                                                </p>

                                                <p className="text-xs text-green-600 mt-1">
                                                    {item.discount_percentage}% OFF
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    {/* sku */}
                                    <td className="px-4 py-4 text-sm text-gray-700">
                                        {item.sku_id}
                                    </td>

                                    {/* qty */}
                                    <td className="px-4 py-4 text-sm text-gray-700">
                                        {item.qty}
                                    </td>

                                    {/* original */}
                                    <td className="px-4 py-4 text-sm text-gray-700">
                                        ₹{item.original_price}
                                    </td>

                                    {/* discounted */}
                                    <td className="px-4 py-4 text-sm text-gray-700">
                                        ₹{item.discounted_price}
                                    </td>

                                    {/* final */}
                                    <td className="px-4 py-4 font-semibold text-gray-900">
                                        ₹{item.final_price}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                <h2 className="text-lg font-semibold mb-5">
                    Order Summary
                </h2>

                <div className="space-y-4">

                    <div className="flex items-center justify-between text-sm">

                        <span className="text-gray-500">
                            Subtotal
                        </span>

                        <span className="font-medium">
                            ₹{order.subtotal}
                        </span>

                    </div>

                    <div className="flex items-center justify-between text-sm">

                        <span className="text-gray-500">
                            Discount
                        </span>

                        <span className="font-medium text-green-600">
                            - ₹{order.discount_total}
                        </span>

                    </div>

                    <div className="flex items-center justify-between text-lg font-semibold border-t pt-4">

                        <span>
                            Total Amount
                        </span>

                        <span>
                            ₹{order.total_amount}
                        </span>

                    </div>

                    <div className="pt-4 border-t">

                        <div className="flex items-center justify-between mb-3">

                            <span className="text-gray-500 text-sm">
                                Payment Method
                            </span>

                            <span className="font-medium">
                                {order.payment_method}
                            </span>

                        </div>

                        <div className="flex items-center justify-between mb-3">

                            <span className="text-gray-500 text-sm">
                                Payment Status
                            </span>

                            <span className="font-medium">
                                {order.payment_status}
                            </span>

                        </div>

                        <div className="flex items-center justify-between">

                            <span className="text-gray-500 text-sm">
                                Order Status
                            </span>

                            <span className="font-medium">
                                {order.status}
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}