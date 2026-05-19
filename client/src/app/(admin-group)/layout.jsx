"use client";
import Header from "@/components/admin/Header";
import SideBar from "@/components/admin/SideBar";
import { SideBarProvider,useSidebar } from "@/components/admin/SideBarContext";

// handles layout spacing based on a sidebar state

function AdminLayoutContent({children}){
    // access sidebar expand/collapse status
    const {isOpen}=useSidebar();
    return(
        <div className="min-h-screen bg-gray-50">
            {/* header fixed on top */}
            <Header/>
            {/* sidebar panel */}
            <SideBar/>
            <main className={`pt-16 p-6 transition-all duration-300 ${isOpen?"ml-64":"ml-20"}`}>
                {/* pages renders here */}
                {children}
            </main>

        </div>
    );
}

export default function AdminLayout({children}){
    return (
        <SideBarProvider>
            <AdminLayoutContent>
                {children}
            </AdminLayoutContent>
        </SideBarProvider>
    );
}