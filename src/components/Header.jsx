/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Header = () => {
  const state = useSelector((state) => state.handleCart);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const total=JSON.parse(localStorage.getItem("total"));
  useEffect(() => {
    console.log(auth, "=auth=");
    localStorage.setItem("total",JSON.stringify(total))
  }, [auth,total]);
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg bg-white py-3 shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-4" to="/">
            A-Mart
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav_home" aria-current="page" to="/home">
                  Home
                </Link>
              </li>
            </ul>
            <div className="buttons">
              {auth === false ? (
                <Link to="/login" className="btn btn-outline-success ms-2">Login
                </Link>
              ) : (
                <Link to="/logout" className="btn btn-outline-danger ms-2">Logout
                </Link>
              )}
            </div>
            <div className="buttons">
            {auth === false ? (
                <Link to="/register" className="btn btn-outline-dark ms-2">Resister
                </Link>
              ) : <></>}
            </div>
            <div className="buttons">
              <Link to="/cart" className="btn btn-outline-dark ms-2">Cart ({state})
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </React.Fragment>
  );
};
export default Header;
