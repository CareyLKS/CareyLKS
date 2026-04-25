import React, { useContext, useState } from "react";
import AuthLayout from "../../component/Layout/AuthLayout.jsx"
import Input from "../../component/Inputs/Inputs.jsx";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../Utils/helper.js";
import axiosInstance from "../../Utils/axiosInstance.js";
import { API_PATHS } from "../../Utils/apiPath.js";
import { userContext } from "../../context/UserContext.jsx";

const Login = ()=>{
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const {updUser}=useContext(userContext);

  const handelLogin = async (e)=>{
    e.preventDefault();
    if(!validateEmail(email)){
      setErr("Please input valid email.");
      return;
    }
    if (!pwd){
      setErr("Please enter password");
      return;
    }
    setErr("");
    //Login API call
    try {
      const resp = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email, pwd,
      });
      const {token, user}=resp.data;
      if (token){
        localStorage.setItem("token",token);
        updUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.resp && err.resp.data.message){
        setErr(err.resp.data.message);
      } else setErr("Something Wrong, Please try again.");
    }
    
  }

  return (
    <AuthLayout> 
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3> Welcome Back </h3>
        <p>Please enter your details to login</p>

        <form onSubmit={handelLogin}>
          <Input
          value={email} onChange={({target})=>setEmail(target.value)} 
          label="Email Address" placeholder="abc@mail.com" type="text"/>

          <Input
          value={pwd} onChange={({target})=>setPwd(target.value)} 
          label="Password" placeholder=">8 Characters" type="password"/>
          
          {err && <p className="mt-2 font-medium" style={{ color: "#dc2626" }}>{err}</p>}

          <button type="submit" className="btn-primary"> Login </button>


          { <p className="">
            Don't have an account?
            <Link className="" to="/signup">SignUp</Link>
          </p> }
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login;