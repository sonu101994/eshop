"use client";

import { toast } from "react-toastify";
import { apiClient,getAuthHeader } from "@/library/helper";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddAdminPage(){
    const router=useRouter();

    const [form,setForm]=useState(
        {
            name:"",
            email:"",
            password:"",
            role:1
        }
    );

    const handleChange =(e)=>{
        setForm(
            {
                ...form,
                [e.target.name]:e.target.value
            }
        );
    };

    //  form submit handler

    const submitHandler=async (e) =>{
        e.preventDefault();

        try {
            const response=await apiClient.post(
                "/admin/register",
                form,
                getAuthHeader()
            );

            if (response.data.flag===1) {
                toast.success(response.data.msg);
                router.push("/admin/admin-listing");
            }else{
                toast.error(response.data.msg);
            }

        } catch (error) {
              toast.error("Something went wrong");
        }
    };

     return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow text-gray-700">

            <h1 className="text-xl font-bold mb-4">Add Admin</h1>

            <form onSubmit={submitHandler} className="space-y-3">

                <input
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    name="email"
                    placeholder="Email"
                    autoComplete="off"
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <select
                    name="role"
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                >
                    <option value={1}>Admin</option>
                    <option value={2}>Manager</option>
                </select>

                <button className="bg-black text-white px-4 py-2 rounded w-full">
                    Create Admin
                </button>

            </form>

        </div>
    );
}