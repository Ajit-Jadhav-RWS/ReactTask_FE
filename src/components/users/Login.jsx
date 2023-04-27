import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
  },[]);

  const handleSubmit =  (e) => {
    e.preventDefault();
    axios.post("http://54.197.13.54:5000/user/signIn",{
        email,
        password,
      },{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      }
    )
      .then( (res) => {
        if (res.data.user) {
           toast.success("Login Success !", {
            position: toast.POSITION.TOP_RIGHT,
          });
          window.localStorage.setItem("email",JSON.stringify(res.data.user.email))
          window.localStorage.setItem("ACCESS_TOKEN",JSON.stringify(res.data.accessToken))
          window.localStorage.setItem("auth",JSON.stringify(true))
        window.location.href = "/home";
        }
      }
      
      ).catch(function (error) {
        toast.error(error.response.data.status.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    
  };

  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <div className="inner-div-login">
        {/* user name */}
        <div>
          <label style={{left:-30}}>Email</label>
          <input
          style={{left:30}}
            type="email"
            placeholder="Enter username"
            required
            onChange={(e) => setEmail(e.target.value )}
          />
        </div>

        {/* password */}
        <div>
          <label style={{left:-10}}>Password</label>
          <input
                 style={{left:10}}
            type="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value )}
          />
        </div>

        {/* checkbox */}
        <div>
            <div>
          <input
            type="checkbox"
            id="customCheck1"
            style={{
              position: "relative",
              left: -5,
              top: -5,
              width: 20,
              height: 20,
              marginTop:20
            }}
          />
          <label
            style={{ position: "relative", top: -10 }}
            htmlFor="customCheck1"
          >
            Remember me
          </label>
          </div>
        </div>

        {/* button */}
        <div>
          <button type="submit">Submit</button>
        </div>
      </div>
      <div className="sub-content">
       {/* register */}
       <p style={{ fontFamily: "cursive", fontSize: 15, fontStyle: "italic" }}>
        Don't have an account?<NavLink to="/register">Sign up</NavLink>
        </p>
        </div>
    </form>
  );
}

export default Login;
