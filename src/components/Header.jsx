/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Header = () => {
  const state = useSelector((state) => state.handleCart);
  const auth = localStorage.getItem("auth");
  useEffect(() => {
    console.log(typeof auth, "=Header=");
  }, [auth]);
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
                <Link className="nav-link active" aria-current="page" to="/home">
                  Home
                </Link>
              </li>
            </ul>
            <div className="buttons">
              {auth === "false" ? (
                <Link to="/login" className="btn btn-outline-dark">
                  <i className="fa fa-sign-in me-1"></i>Login
                </Link>
              ) : (
                <Link to="/logout" className="btn btn-outline-dark">
                  <i className="fa fa-sign-in me-1"></i>Logout
                </Link>
              )}
            </div>
            <div className="buttons">
              <Link to="/register" className="btn btn-outline-dark ms-2">
                <i className="fa fa-user-plus me-1"></i>Register
              </Link>
            </div>
            <div className="buttons">
              <Link to="/cart" className="btn btn-outline-dark ms-2">
                <i className="fa fa-shopping-cart me-1"></i>Cart ({state.length}
                )
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
