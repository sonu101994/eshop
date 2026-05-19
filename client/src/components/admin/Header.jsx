"use client";

import { logoutAdmin,lsToAdmin } from "@/redux/reducers/AdminReducers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useSidebar } from "./SideBarContext";

export default function Header(){
    // dispatcher for actions
    const dispatcher=useDispatch();

    // dropdown menu show and hide
    const [isProfileOpen,setIsProfileOpen]=useState(false);

    // navigation handler
    const router=useRouter();

    // current admin state from redux store
    const admin=useSelector((state)=>state.admin);

    // redirect to login
    const logoutHandler=()=>{
        dispatcher(logoutAdmin());
        router.push("/admin/login");;
    }

    useEffect(()=>{
        const lsAdmin=localStorage.getItem("admin");
        const lsToken=localStorage.getItem("admin_token");

        if(lsAdmin==null&&lsToken==null){
            router.push("/admin/login");
        }else{
             dispatcher(lsToAdmin());
        }
           
        
    },[]);

    // sidebar state
    const {isOpen }=useSidebar();

    return(
          <header
            className={`fixed top-0 right-0 h-16 bg-white border-b border-gray-200 z-40 transition-all duration-300
            ${isOpen ? "lg:left-64" : "lg:left-20"}
            left-0`}

        >
             <div className="h-full px-3 sm:px-4 lg:px-6">

                <div className="flex items-center justify-between h-full gap-3">

                    {/* left part-logo */}
                    <div className="flex items-center min-w-0">

                        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 truncate">
                            eShop Admin
                        </h1>

                    </div>

                    {/* right part */}
                    <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">

                        {/* search bar-desktop */}
                        <div className="hidden md:block">

                            <div className="relative">

                                {/* search input */}
                                <input
                                    type="text"
                                    placeholder="Search here..."
                                    className="w-48 lg:w-72 pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                />

                                {/* search icon */}
                                <svg
                                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>

                            </div>

                        </div>

                        {/* notifications */}
                        <button className="relative flex items-center justify-center h-10 w-10 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition">

                            {/* bell icon */}
                            <svg
                                className="h-5 w-5 sm:h-6 sm:w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>

                            {/* not read yet */}
                            <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 animate-bounceScale animate-bounceScale"></span>

                        </button>

                        {/* admin account */}
                        <div className="relative">

                            {/* set profile state */}
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 sm:gap-3 rounded-xl p-1.5 sm:p-2 hover:bg-gray-100 transition"
                            >

                                {/* Profile logo */}
                                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                                    A
                                </div>

                                {/* admin details */}
                                <div className="hidden lg:block text-left min-w-0">

                                    <p className="text-sm font-medium text-gray-900 truncate max-w-[140px]">
                                        {admin.data?.name}
                                    </p>

                                    <p className="text-xs text-gray-500 truncate max-w-[180px]">
                                        {admin.data?.email}
                                    </p>

                                </div>

                                {/* dropdown arrow */}
                                <svg
                                    className={`hidden sm:block h-5 w-5 text-gray-500 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>

                            </button>

                            {/* dropdown menu */}
                            {isProfileOpen && (

                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-gray-200 py-2 z-50 overflow-hidden">

                                    {/* mobile admin info */}
                                    <div className="lg:hidden px-4 py-3 border-b border-gray-100">

                                        <p className="text-sm font-semibold text-gray-900 truncate">
                                            {admin.data?.name}
                                        </p>

                                        <p className="text-xs text-gray-500 truncate mt-1">
                                            {admin.data?.email}
                                        </p>

                                    </div>

                                    {/* redirect to profile */}
                                    <Link
                                        href="/admin/profile"
                                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        Profile Settings
                                    </Link>

                                    {/*route to settings */}
                                    <Link
                                        href="/admin/settings"
                                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        Settings
                                    </Link>

                                    <hr className="my-2 border-gray-100" />

                                    {/* Logout button */}
                                    <button
                                        className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                                        onClick={logoutHandler}
                                    >
                                        Logout
                                    </button>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </div>
        </header>
    )
}