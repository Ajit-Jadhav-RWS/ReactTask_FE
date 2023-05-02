import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
function SignUp() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/user/signUp",
        {
          first_name,
          last_name,
          email,
          password,
        },
        {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.saveUser) {
          toast.success("Registered Success !", {
            position: toast.POSITION.TOP_RIGHT,
          });
          // window.localStorage.setItem("token", res.data.saveUser);
          window.location.href = "/login";
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.response.data.status.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <form className="form-logout" onSubmit={handleSubmit}>
      <h3>Register</h3>
      <div className="inner-div-logout">
        <div>
          <label style={{ left: -20 }}>First name</label>
          <input
            style={{ left: 15 }}
            type="text"
            placeholder="First name"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div>
          <label style={{ left: -20 }}>Last name</label>
          <input
            style={{ left: 18 }}
            type="text"
            placeholder="Last name"
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <label style={{ left: -44 }}>Email</label>
          <input
            style={{ left: 39 }}
            type="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label style={{ left: -25 }}>Password</label>
          <input
            style={{ left: 20 }}
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">Register</button>
        </div>
      </div>
      <div className="sub-contaner">
        <p style={{ fontFamily: "cursive", fontSize: 15, fontStyle: "italic" }}>
          Already registered <NavLink to="/login">Login?</NavLink>
        </p>
      </div>
    </form>
  );
}

export default SignUp;