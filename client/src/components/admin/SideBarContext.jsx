"use client";
import { createContext,useContext,useState } from "react";

const SideBarContext=createContext();

export function SideBarProvider({children}){
    const [isOpen,setIsOpen]=useState(true);
    return(
        <SideBarContext.Provider value={{isOpen,setIsOpen}}>{children}</SideBarContext.Provider>
    );
}

export function useSidebar(){
    const context=useContext(SideBarContext);

    if (!context) {
        throw new Error('useSidebar must be used within sidebar Provider');
    }
    return context;
}