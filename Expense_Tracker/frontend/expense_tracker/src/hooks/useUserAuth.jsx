import { useContext, useEffect } from "react"
import { userContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../Utils/apiPath";
import axiosInstance from "../Utils/axiosInstance";

export const useUserAuth=()=>{
    const {user, updateUser, clearUser} = useContext(userContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if (user) return;
        let isMounted=true;
        const fetchUserInfo = async ()=>{
            try {
                const res=await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
                if (isMounted && res.data) updateUser(res.data);
            } catch (err) {
                console.error("Failed to fetch user info:",err);
                if (isMounted){
                    clearUser();
                    navigate("/login");
                }
            }
        };
        fetchUserInfo();
        return ()=>{
            isMounted=false;
        };
    },[updateUser, clearUser, navigate]);
}