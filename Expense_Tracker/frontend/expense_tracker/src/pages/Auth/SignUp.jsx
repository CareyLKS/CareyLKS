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
  const navigaste = useNavigate();

  //signup form
  const handelSignUp=async(e)=>{
  }
  return (
    <AuthLayout>
      <h2>Create an Account Today!!</h2>
      <form onSubmit={handelSignUp}>

        <ProfilePic image={proPic} setImage={setProPic}/>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
          value={fName} onChange={({target})=>setfName(target.value)} 
          label="Full Name" placeholder="Carey Lee" type="text"/>
          
          <Input
          value={email} onChange={({target})=>setEmail(target.value)} 
          label="Email Address" placeholder="abc@mail.com" type="text"/>

            <div className="col-span-2">
              <Input
              value={pwd} onChange={({target})=>setPwd(target.value)} 
              label="Password" placeholder=">8 Characters" type="password"/>

              <Input
              value={repwd} onChange={({target})=>setRePwd(target.value)} 
              label="Re-Password" placeholder=">8 Characters" type="password"/>

           </div>
          
        </div>
        {err && <p className="text-red-500">{err}</p>}

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