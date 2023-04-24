/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addCart, deleteCart } from "../redux/action/index";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import bootstrap from "bootstrap";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const [cartItem, setItem] = useState([]);
  let totalPrice = 0;
  //add quantity
  const addMore = (product) => {
    axios
      .post(
        "http://localhost:5000/user/addToCart",
        {
          email: JSON.parse(localStorage.getItem("email")),
          product,
        },
        {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
        }
      )
      .then((res) => {
        dispatch(addCart(res.data.cartItem.total));
        const temp = res.data.cartItem.product;
        setItem(temp);
        localStorage.setItem("total", JSON.stringify(res.data.cartItem.total));
        console.log(state);
      })
      .catch(function (error) {
        toast.error(error.response.data.status.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  // remove all / quantity
  const removeItem = async (item, action) => {
    axios
      .patch(
        `http://localhost:5000/user/removeFromCart/${item.id}`,
        {
          email: JSON.parse(localStorage.getItem("email")),
          action: action,
        },
        {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
        }
      )
      .then(async (res) => {
        const temp = res.data.cartItem.product;
        setItem(temp);
        dispatch(deleteCart(res.data.cartItem.total));
        localStorage.setItem("total", JSON.stringify(res.data.cartItem.total));
        console.log(state);
      })
      .catch(function (error) {
        toast.error(error.response.data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  // get all
  useEffect(() => {
    const getCartItem = async () => {
      axios
        .get(
          "http://localhost:5000/user/getAllFromCart",
          { params: { email: JSON.parse(localStorage.getItem("email")) } },
          {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
          }
        )
        .then(async (res) => {
          const temp = res.data.cartItem.product;
          setItem(temp);
          console.log(cartItem, temp, "cartitem array");
        })
        .catch(function (error) {
          toast.error(error.response.data.status.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    };
    getCartItem();
  }, []);

  // render component
  const cartItems = (cartItem, i) => {
    const price = cartItem.price.split(",");

    totalPrice += Number(price.join("")) * cartItem.quantity;
    console.log(totalPrice);
    return (
      <div key={i} className="container">
        <div className="row outline">
          <div className="col-lg-5 col-md-5 col-sm-12">
            <div className="imgbg">
              <img
                src={cartItem.thumbnail}
                alt={cartItem.title}
                className="imgmargin"
              />
            </div>
          </div>
          <div className="col-lg-7 col-md-7 col-sm-12 description">
            <div>
              <button
                onClick={() => removeItem(cartItem, "remove")}
                className="btn-close close_btn"
              ></button>
              <h3 style={{ textAlign: "center" }}> {cartItem.title}</h3>
              <p style={{ textAlign: "center" }}>{cartItem.description}</p>
              <p style={{ textAlign: "center" }}>
                {" "}
                Price: ₹ {cartItem.price}/-
              </p>

              <div
                className="input-group"
                style={{ position: "relative", left: "40%" }}
              >
                <span className="input-group-btn">
                  <button
                    onClick={() => {
                      removeItem(cartItem, "quantity");
                    }}
                    type="button"
                    className="quantity-left-minus btn btn-danger btn-number"
                    style={{
                      width: "15px !important",
                      height: "23px",
                      margin: "0px 4px 4px 0px",
                    }}
                  >
                    <span
                      className="glyphicon glyphicon-minus"
                      style={{ position: "absolute", top: "-3px", left: "7px" }}
                    >
                      -
                    </span>
                  </button>
                </span>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  style={{
                    width: "10%",
                    borderWidth: 1,
                    height: "25px",
                    textAlign: "center",
                  }}
                  readOnly
                  value={cartItem.quantity}
                />
                <span className="input-group-btn">
                  <button
                    onClick={() => {
                      addMore(cartItem);
                    }}
                    type="button"
                    className="quantity-right-plus btn btn-success btn-number"
                    style={{
                      width: "15px !important",
                      height: "23px",
                      margin: "-4px 0px 0px 4px",
                    }}
                  >
                    <span
                      className="glyphicon glyphicon-plus"
                      style={{ position: "absolute", top: "-3px", left: "7px" }}
                    >
                      +
                    </span>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // empty cart show
  const emptyCart = () => {
    return (
      <div className="container" style={{ marginTop: 40 }}>
        <h3>Empty Cart</h3>
      </div>
    );
  };

  return (
    <div>
      {cartItem.length === 0 && emptyCart()}
      {cartItem.length !== 0 &&
        cartItem.map((item, i) => {
          return cartItems(item, i);
        })}
      <div className="totalfooter container ">
        <div>
          <h5>Total Price :Rs {totalPrice}</h5>
        </div>
        <div>
          {/* <button className="btn btn-outline-info" onClick={Submit}>Proceed</button> */}
          <Link
            to={`/submit`}
            className="btn btn-outline-info"
            data-mdb-toggle="modal"
            data-mdb-target="#staticBackdrop5"
          >
            Proceed
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Cart;
