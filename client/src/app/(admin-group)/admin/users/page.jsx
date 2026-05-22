"use client";

import { useEffect,useState } from "react";
import { apiClient,getAuthHeader } from "@/library/helper";
import { toast } from "react-toastify";
import DeleteBtn from "@/components/admin/DeleteBtn.";
import ToggleBtn from "@/components/admin/ToggleBtn";

export default function UsersPage(){
    const [users , setUsers]=useState([]);

    // get users
    const fetchUsers=async()=>{
        try {
            console.log(localStorage.getItem("admin_token"));
            const response=await apiClient.get("/admin/users/",getAuthHeader());

            if (response.data.flag===1) {
                setUsers(response.data.users);
                toast.success(response.data.msg);
                console.log(response.data);
            }else{
                toast.error(response.data.msg);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch users");
        }
    };

    useEffect(()=>{
        fetchUsers();
    },[]);

     return (
        <div className="p-6 text-gray-700">

            <h1 className="text-2xl font-bold mb-4">
                Users Management
            </h1>

            <div className="bg-white shadow rounded-lg overflow-hidden">

                <table className="w-full text-sm ">

                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user._id} className="border-b">

                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">{user.phone || "-"}</td>

                                    {/* TOGGLE */}
                                    <td className="p-3">
                                        <ToggleBtn
                                            id={user._id}
                                            current={user.status}
                                            base_url="/admin/users/toggle"
                                            trueText="Active"
                                            falseText="Blocked"
                                        />
                                    </td>

                                    {/* DELETE */}
                                    <td className="p-3">
                                        <DeleteBtn
                                            delete_url={`/admin/users/${user._id}`}
                                        />
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-4 text-center">
                                    No users found
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>

            </div>
        </div>
    );
}