import React, { useContext, useMemo, useState } from "react";
import {SIDE_MENU_DATA} from "../../Utils/data";
import { userContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Utils/apiPath";
import CharAvatar from "../Cards/CharAvatar";



const SideMenu=({activeMenu})=>{
    const {user, clrUser}= useContext(userContext);
    const navigate = useNavigate();
    const hendelClick = (route)=>{
        if (route==="logout") {
            handelLogout();
            return;
        }
        navigate(route);
    }
    const handelLogout = ()=>{
        localStorage.clear();
        clrUser();
        navigate("/login");
    }
    return(
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200 p-4">
            <div className="mb-6">
                {user?.proPicURL? (
                    <img src={user?.proPicURL||""} alt="Profile Image"
                    className="w-14 h-14 rounded-full object-cover mb-2"/>):
                    (<CharAvatar fullName={user?.fName} width="w-20" height="h-20" style="text-xl"/>)
                }
                <h5 className="text-sm font-medium text-gray-800">
                    {user?.fName || ""}
                </h5>
            </div>
            {SIDE_MENU_DATA.map((item,index)=>{
                return <button key={`menu_${index}`}
                className={`w-full flex items-center gap-4 text-[15px] cursor-pointer
                ${activeMenu==item.label? "text-white bg-primary": "bg-green-50"}
                py-3 px-6 rounded-lg mb-3`}
                onClick={()=>hendelClick(item.path)}>
                    <item.icon className="cursor-pointer"/>
                    {item.label}
                </button>
            })}
        </div>
    )
}

export default SideMenu;