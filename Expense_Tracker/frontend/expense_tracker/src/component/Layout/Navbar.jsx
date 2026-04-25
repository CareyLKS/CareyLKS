import React from "react";
import { useState } from "react";
import {HiOutlineMenu, HiOutlineX} from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar=({activeMenu})=>{
    const [openSMenu, setOpenSMenu]=useState(false);
    return(
        <div className="flex gap-5 bg-white border border-b
         border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky">
            <button className="block lg:hidden text-black" onClick={()=>{setOpenSMenu(!openSMenu);}}>
                {openSMenu?(<HiOutlineX className="text-2xl"/>):
                (<HiOutlineMenu className="text-2xl"/>)}
            </button>
            <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
            {openSMenu&&(
                <div className="fixed top-16 left-0 bg-white z-40 shadow-md lg:hidden" >
                        <SideMenu activeMenu={activeMenu}/>
                </div>
                )
            }
        </div>
    )
}

export default Navbar;