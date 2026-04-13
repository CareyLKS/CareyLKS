import React, { useState } from "react";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6";

const Input=({value, onChange, placeholder, label, type})=>{
    const [showPwd,setShowPwd]=useState(false);
    const toggleShowPwd=()=>{
        setShowPwd(!showPwd);
    };
    return(
        <div>
            <label className="text-[13px] text-slate-800" >{label}</label>
            <div className="">
                <input type={type=='password'? showPwd? 'text':'password':type}
                placeholder={placeholder}
                className="w-full bg-transparent outline-0"
                value={value}
                onChange={(e)=>onChange(e)} />

                {type == "password" && (
                    <>
                        {showPwd? (
                            <FaRegEye size={22} 
                            className="text-primary cursor-pointer"
                            onClick={()=>toggleShowPwd()}/>
                        ):(
                            <FaRegEyeSlash size={22} 
                            className="text-slate-400 cursor-pointer"
                            onClick={()=>toggleShowPwd()}/>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Input;