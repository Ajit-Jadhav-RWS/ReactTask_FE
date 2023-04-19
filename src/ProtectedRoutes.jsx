/* eslint-disable react-hooks/exhaustive-deps */
import {Outlet } from "react-router-dom";
import axios from 'axios'
import { useState,useEffect } from "react";
import Logout from "./components/users/Logout";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoutes = () => {
  
  const [userData,setUser]=useState({})
   
  useEffect(()=>{
    axios.get("http://localhost:5000/user/verify",{
      headers: {
        "accesstoken": localStorage.getItem("ACCESS_TOKEN"), 
        "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
      }
     }
      )
        .then((res) => {
           setUser(res.data.result)
        }
        
        ).catch(function (error) {
         setUser(null)
        });
    

  },[])
  return userData!==null ? <Outlet /> :Logout("expired")
};

export default ProtectedRoutes;