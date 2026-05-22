"use client";

import { apiClient, getAuthHeader } from "@/library/helper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminProfilePage() {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [passwords, setPasswords] = useState(
        {
            oldPassword: "",
            newPassword: ""
        }
    );

    // get profile

    const fetchProfile =async ()=>{
        try {
            const response=await apiClient.get(
                "/admin/profile",
                getAuthHeader()
            );

            if (response.data.flag===1) {
                setAdmin(response.data.admin);
            }else{
                toast.error(response.data.msg);
            }
        } catch (error) {
            toast.error("failed to load profile");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(()=>{
        fetchProfile();
    },[]);

    // change password

    const changePassword=async ()=>{
        try {
            console.log("hitting");
            const response=await apiClient.put(
                "/admin/change-password",
                passwords,
                getAuthHeader()
            );
            console.log(response.data);
            if (response.data.flag==1) {
                toast.success(response.data.msg);
                setShowModal(false);
                setPasswords({ oldPassword:"",newPassword:""});
            }else{
                toast.error(response.data.msg);
            }
        } catch (error) {
            console.log(error);
            toast.error("password change failed");
        }
    };


     if (loading) {
        return (
            <div className="p-6 text-center">
                Loading profile...
            </div>
        );
    }
      return (
        <div className="min-h-screen bg-gray-100 p-6 text-gray-700">

            {/* profile card */}
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">

                <h1 className="text-2xl font-bold mb-6">
                    Admin Profile
                </h1>

                <div className="space-y-5">

                    <div>
                        <p className="text-gray-500 text-sm">Name</p>
                        <p className="text-lg font-semibold">{admin?.name}</p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Email</p>
                        <p className="text-lg font-semibold">{admin?.email}</p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Role</p>
                        <p className="text-lg font-semibold">
                            {admin?.role === 0
                                ? "Super Admin"
                                : admin?.role === 1
                                    ? "Admin"
                                    : "Manager"}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Status</p>
                        <p className={`text-lg font-semibold ${admin?.status ? "text-green-600" : "text-red-500"}`}>
                            {admin?.status ? "Active" : "Inactive"}
                        </p>
                    </div>

                </div>

                {/* button to trigger modal*/}
                <button
                    onClick={() => setShowModal(true)}
                    className="mt-6 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
                >
                    Change Password
                </button>

            </div>

            {/* modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">

                    {/* BACKDROP */}
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    
                    ></div>

                    {/* modal box */}
                    <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 z-10">

                        <h2 className="text-xl font-bold text-center mb-5">
                            Change Password
                        </h2>

                        <div className="space-y-4">

                            <input
                                type="password"
                                placeholder="Enter Old Password"
                                value={passwords.oldPassword}
                                // defaultValue=""
                                onChange={(e) =>
                                    setPasswords({
                                        ...passwords,
                                        oldPassword: e.target.value
                                    })
                                }
                                autoComplete="off"
                                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />

                            <input
                                type="password"
                                placeholder="Enter New Password"
                                value={passwords.newPassword}
                                onChange={(e) =>
                                    setPasswords({
                                        ...passwords,
                                        newPassword: e.target.value
                                    })
                                }
                                autoComplete="off"
                                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />

                        </div>

                        <div className="flex justify-end gap-3 mt-6">

                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={changePassword}
                                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                            >
                                Update
                            </button>

                        </div>

                    </div>
                </div>
            )}

        </div>
    );

}