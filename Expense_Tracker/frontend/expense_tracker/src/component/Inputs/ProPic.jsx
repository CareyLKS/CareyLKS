import React, { useEffect, useState, useRef } from "react";
import {LuUser, LuUpload, LuTrash} from "react-icons/lu";

const ProfilePic=({image, setImage})=>{
    const inpRef= useRef(null);
    const [preU, setPreu]=useState("");

    useEffect(() => {
        return () => {
            if (preU) {
                URL.revokeObjectURL(preU);
            }
        };
    }, [preU]);

    const handelImgaeChange=(e)=>{
        const file = e.target.files[0];
        if (file){
            setImage(file);
            //gen preview URL
            const preview = URL.createObjectURL(file);
            setPreu(preview);
        }
    };

    const handelRevPic= ()=>{
        if (preU) {
            URL.revokeObjectURL(preU);
        }
        setImage(null);
        setPreu(null);
        if (inpRef.current) {
            inpRef.current.value = "";
        }
    };

    const onChooseFile=()=>{
        if (inpRef.current) {
            inpRef.current.value = "";
            inpRef.current.click();
        }
    };

    return(
        <div className="relative flex items-center justify-center mb-6">
            <input
                ref={inpRef}
                type="file"
                accept="image/*"
                onChange={handelImgaeChange}
                style={{ display: "none" }}
                tabIndex={-1}
                aria-hidden="true"
            />
            {!image?(
                <div className="relative" style={{ width: 112, height: 112 }}>
                    <div
                        className="flex items-center justify-center rounded-full bg-violet-100"
                        style={{ width: 96, height: 96, overflow: "hidden" }}
                    >
                        <LuUser className="text-violet-500" size={34} />
                    </div>
                    <button type="button" 
                    className="absolute right-0 bottom-0 flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-white shadow-md z-10 cursor-pointer" onClick={onChooseFile}>
                        <LuUpload size={16} />
                    </button>
                </div>
            ):(<div className="relative" style={{ width: 112, height: 112 }}>
                <div
                    className="rounded-full bg-violet-100"
                    style={{ width: 96, height: 96, overflow: "hidden" }}
                >
                    <img
                        src={preU}
                        alt="Profile Photo"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                </div>
                <button type="button" className="absolute right-0 bottom-0 flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white shadow-md ring-2 ring-white z-10 cursor-pointer" onClick={handelRevPic}>
                    <LuTrash size={14} />
                </button>
            </div>)}
            
        </div>
    )
}

export default ProfilePic;

