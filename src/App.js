import Header from "./components/Header";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Login from "./components/users/Login";
import Logout from "./components/users/Logout";
import Home from "./components/Home";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Submit from "./components/Submit";
import { Routes, Route } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoutes";
import { useEffect } from "react";
import SignUp from "./components/users/Register";
function App() {
  
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("auth")) === true) {
      console.log(JSON.parse(localStorage.getItem("auth")));
    }
  }, []);
  const auth = JSON.parse(localStorage.getItem("auth"));
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/register" element={<SignUp />} />
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/products/:id" element={<Product />} />
          <Route exact path="/cart" element={<Cart auth={auth} />} />
          <Route exact path="/submit" element={<Submit />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
