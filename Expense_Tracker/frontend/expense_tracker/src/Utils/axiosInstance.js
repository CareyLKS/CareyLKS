import axios from "axios";
import {BASE_URL} from "./apiPath";

const axiosInstance=axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

//request
axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem("token");
        if (accessToken) config.headers.Authorization=`Bearer ${accessToken}`;
        return config;
    },
    (error)=>{return Promise.reject(error); }
)

//response
axios.interceptors.response.use(
    (response)=> {return response},
    //handel commom erro
    (error)=>{
        if (error.response){
            if (error.response.status===401){//back to login page
                window.location.href="/login";
            }
            else if (error.response.status===500){//sever error
                console.error("Server Error, please try again later");
            }
            else if (error.code==="ECONNABORTED"){console.error("request timeout. PLease try again");} //timeout
            return Promise.reject(error);
        }
    }

);

export default axiosInstance;