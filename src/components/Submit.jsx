/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import check from"../check.jpg"
import { useEffect} from "react";

import { useDispatch } from "react-redux";
import { deleteCart } from "../redux/action/index";
import axios from "axios";
function Submit() {
  
  const dispatch = useDispatch();
useEffect(()=>{
  axios
  .delete(
    "http://54.197.13.54:5000/user/removeAll",
    { params: { email: JSON.parse(localStorage.getItem("email")) } },
    {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE",
    }
  )
  .then(async (res) => {
    //localStorage.setItem("total",JSON.stringify(0))
    const total=0;
  dispatch(deleteCart(total));
    console.log(res.data)
  })
  .catch(function (error) {
  })
},[])
  return (
    <>
      <div className="bgimagesubmit">
        <div className="imgsizesubmit" >
          <img src={check} className="imgheight" alt="img" />
        </div>
        <h1 className="heading">Thankyou for Shopping</h1>
      </div>
    </>
  );
}

export default Submit;
