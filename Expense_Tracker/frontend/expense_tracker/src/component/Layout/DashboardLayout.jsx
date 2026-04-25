import React, { Children, useContext } from "react";
import { userContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({children, activeMenu}) =>{
    const {user}=useContext(userContext);
    return (
        <div className="">
            <Navbar activeMenu={activeMenu}/>
            {user && (
                <div className="flex">
                    <div className="max-lg:hidden">
                        <SideMenu activeMenu={activeMenu}/>
                    </div>
                    <div className="grow mx-5">{children}</div>
                </div>
            )}
        </div>
    )
}

export default DashboardLayout;