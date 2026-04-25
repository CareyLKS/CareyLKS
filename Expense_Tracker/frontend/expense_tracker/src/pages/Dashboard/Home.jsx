import React, { useEffect, useState } from "react";
import DashboardLayout from "../../component/Layout/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/apiPath";
import InfoCard from "../../component/Cards/InfoCard";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from "../../Utils/helper";

const Home = ()=>{
  useUserAuth();
  const navigate=useNavigate();
  const [DashBL, setDashBL]=useState(null);
  const [Load, setLoad]=useState(false);
  const fetchDashBDAta=async()=>{
    if (Load) return;
    setLoad(true);
    try {
      const res=await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
      if (res.data) setDashBL(res.data);
    } catch (err) {
      console.log("Something went wrong in loading. Please try again",err);
    }
    finally{setLoad(false);}
  };

  useEffect(()=>{
    fetchDashBDAta();
    return()=>{};
  },[])

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
           icon={<IoMdCard/>}
           label="Total Balance"
           value={addThousandsSeparator(DashBL?.totalBalance)}
           color="bg-primary"/>
        </div>

      </div>
    </DashboardLayout>

  )
}

export default Home;