"use client";

import { useEffect, useState } from "react";
import { apiClient ,getAuthHeader } from "@/library/helper";
import { toast } from "react-toastify";
import { useRouter, useParams } from "next/navigation";

export default function EditAdminPage(){

    const { admin_id }=useParams();
    const router = useRouter();
    console.log(admin_id);

    const [ loading, setLoading ]=useState(true);

    const [form,setForm]=useState(
        {
            name:"",
            email:"",
            role:1,
            status:true
        }
    );

    // fetch single admin
    const fetchAdmin=async ()=>{
        try {
            console.log("hitting");
            const response=await apiClient.get(
                `/admin/single/${admin_id}`,
                getAuthHeader()
            );
            console.log(response.data);

            if (response.data.flag===1) {
                setForm(response.data.admin);
            }
            else{
                toast.error(response.data.msg);
            }
        } catch (error) {
            console.log(error);
             toast.error("Error fetching admin");
        } finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchAdmin();
    },[admin_id]);

    // change handle

   const handleChange=(e)=>{
    const {name ,value}=e.target;

    setForm(
        {
            ...form,
            [name]:value
        }
    );
   };

//    submit form handler

const submitHandler=async(e)=>{
    e.preventDefault();
    try {
        const response=await apiClient.put(
            `/admin/update/${admin_id}`,
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
        console.log(error);
         toast.error("Update failed");
    }
};

 if (loading) {
        return (
            <div className="p-6 text-center">
                Loading...
            </div>
        );
    };


     return (
        <div className="min-h-screen bg-gray-50 p-6 text-gray-700">

            <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">

                <h1 className="text-2xl font-bold mb-5">
                    Edit Admin
                </h1>

                <form onSubmit={submitHandler} className="space-y-4">

                    {/* NAME */}
                    <div>
                        <label className="text-sm text-gray-600">Name</label>
                        <input
                            name="name"
                            value={form.name || ""}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* EMAIL (readonly) */}
                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            value={form.email || ""}
                            disabled
                            className="w-full border p-2 rounded bg-gray-100"
                        />
                    </div>

                    {/* ROLE */}
                    <div>
                        <label className="text-sm text-gray-600">Role</label>
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value={1}>Admin</option>
                            <option value={2}>Manager</option>
                        </select>
                    </div>

                    {/* STATUS */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={form.status}
                            onChange={() =>
                                setForm({ ...form, status: !form.status })
                            }
                        />
                        <span>Active</span>
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded"
                    >
                        Update Admin
                    </button>

                </form>

            </div>

        </div>
    );

}


