"use client";
import { useEffect,useState } from "react";
import { getAdmins } from "@/library/api-call";
import { apiClient,getAuthHeader } from "@/library/helper";
import { toast } from "react-toastify";
import Link from "next/link";

export default function AdminListingPage(){
    const [admins,setAdmins]=useState([]);
    const [loading,setLoading]=useState(true);

    // fetch admin
    //
    const fetchAdmins =async ()=>{
        setLoading(true);
        const response=await getAdmins();
        setAdmins(response.admins||[]);
        setLoading(false);
    };

    useEffect(()=>{
        fetchAdmins();
    }, []);

    // toggle status

    const updateStatus=async (id)=>{
        try {
            // console.log("hitting");
            const response=await apiClient.patch(
                `/admin/status/${id}`,
                {},
                getAuthHeader()
            );
             if (response.data.flag === 1) {
                toast.success(response.data.msg || "Updated");
                fetchAdmins();
            } else {
                console.log("hitting");
                toast.error(response.data.msg);
            }

        } catch (error) {
            console.log("hitting");
              toast.error("Server error");
        }
    };

      // role assigner
    const roleLabel = (role) => {
        if (role === 0) return "Super Admin";
        if (role === 1) return "Admin";
        if (role === 2) return "Manager";
        return "Unknown";
    };

      return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 text-gray-700">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Admins
                    </h1>
                    <p className="text-sm text-gray-500">
                        Manage system administrators
                    </p>
                </div>

                {/* ADD BUTTON */}
                <Link
                    href="/admin/admin-listing/add"
                    className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
                >
                    + Add Admin
                </Link>

            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block bg-white rounded-2xl shadow border overflow-hidden">

                {loading ? (
                    <div className="p-10 text-center">Loading...</div>
                ) : admins.length === 0 ? (
                    <div className="p-10 text-center text-gray-500">
                        No Admins Found
                    </div>
                ) : (

                    <table className="w-full">

                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Role</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {admins.map((admin) => (
                                <tr key={admin._id} className="border-b hover:bg-gray-50">

                                    <td className="p-3 font-medium">
                                        {admin.name}
                                    </td>

                                    <td className="p-3 text-gray-600">
                                        {admin.email}
                                    </td>

                                    <td className="p-3">
                                        <span className="px-2 py-1 text-xs bg-gray-200 rounded">
                                            {roleLabel(admin.role)}
                                        </span>
                                    </td>

                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs rounded ${
                                            admin.status
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-600"
                                        }`}>
                                            {admin.status ? "Active" : "Inactive"}
                                        </span>
                                    </td>

                                    <td className="p-3 flex gap-2">

                                        {/* EDIT */}
                                        <Link
                                            href={`/admin/admin-listing/edit/${admin._id}`}
                                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Edit
                                        </Link>

                                        {/* TOGGLE */}
                                        <button
                                            onClick={() => updateStatus(admin._id)}
                                            className="bg-black text-white px-3 py-1 rounded text-sm"
                                        >
                                            Toggle
                                        </button>

                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>

                )}

            </div>

            {/* MOBILE CARDS */}
            <div className="md:hidden space-y-4">

                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : admins.length === 0 ? (
                    <div className="text-center text-gray-500">
                        No Admins Found
                    </div>
                ) : (

                    admins.map((admin) => (
                        <div
                            key={admin._id}
                            className="bg-white border rounded-xl p-4 shadow-sm"
                        >

                            <div className="font-semibold text-gray-800">
                                {admin.name}
                            </div>

                            <div className="text-sm text-gray-500">
                                {admin.email}
                            </div>

                            <div className="mt-2 flex gap-2">

                                <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                                    {roleLabel(admin.role)}
                                </span>

                                <span className={`text-xs px-2 py-1 rounded ${
                                    admin.status
                                        ? "bg-green-100 text-green-600"
                                        : "bg-red-100 text-red-600"
                                }`}>
                                    {admin.status ? "Active" : "Inactive"}
                                </span>

                            </div>

                            <div className="mt-3 flex gap-2">

                                <Link
                                    href={`/admin/admin-listing/edit/${admin._id}`}
                                    className="flex-1 bg-blue-600 text-white text-center py-2 rounded"
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={() => updateStatus(admin._id)}
                                    className="flex-1 bg-black text-white py-2 rounded"
                                >
                                    Toggle
                                </button>

                            </div>

                        </div>
                    ))

                )}

            </div>

        </div>
    );
}
