import React, { useState } from "react";
import AuthLayout from "../../component/Layout/AuthLayout.jsx"
import Input from "../../component/Inputs/Inputs.jsx";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../Utils/helper.js";
import ProfilePic from "../../component/Inputs/ProPic.jsx";

const SignUp = ()=>{
  const [proPic,setProPic]= useState("");
  const [fName,setfName]= useState("");
  const [email,setEmail]= useState("");
  const [pwd,setPwd]= useState("");
  const [repwd,setRePwd]= useState("");

  const [err, setErr]=useState(null);
  const navigate = useNavigate();

  //signup form
  const handelSignUp=async(e)=>{
    e.preventDefault();
    setErr(null);
    if (fName==""){
      setErr("Please input your name.");
      return;
    }
    if(!validateEmail(email)){
      setErr("Please input valid email.");
      return;
    }
    if (pwd==""){
      setErr(`Please enter password`);
      return;
    }
    if (!repwd){
      setErr("Please enter the Re-passward");
      return;
    }
    if  (repwd!=pwd){
      setErr(`Password not match!`);
      return;
    }
    
    //SignUp API call
  }
  return (
    <AuthLayout>
      <h2>Create an Account Today!!</h2>
      <form onSubmit={handelSignUp}>

        <ProfilePic image={proPic} setImage={setProPic}/>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 m-3">
          <Input
          value={fName} onChange={({target})=>setfName(target.value)} 
          label="Full Name" placeholder="Carey Lee" type="text"/>
          
          <Input
          value={email} onChange={({target})=>setEmail(target.value)} 
          label="Email Address" placeholder="abc@mail.com" type="email"/>

          <Input
          value={pwd} onChange={({target})=>setPwd(target.value)} 
          label="Password" placeholder=">8 Characters" type="password"/>

          <Input
          value={repwd} onChange={({target})=>setRePwd(target.value)} 
          label="Re-Password" placeholder=">8 Characters" type="password"/>

          
        </div>
        {err && <p className="mt-2 font-medium" style={{ color: "#dc2626" }}>{err}</p>}

          <button type="submit" className="btn-primary"> SignUp </button>
         { <p className="">
          Have an account?  
          <Link className="" to="/login"> Login</Link>
          </p> }
      </form>
    </AuthLayout>
  )
}

export default SignUp