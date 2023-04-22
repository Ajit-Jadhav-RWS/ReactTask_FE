/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import axios from "axios";
const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // call backhand api addToCart
  const addProduct = (product) => {
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
        localStorage.setItem("total", JSON.stringify(res.data.cartItem.total));
        dispatch(addCart(res.data.cartItem.total));
      })
      .catch(function (error) {
        toast.error(error.response.data.status.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      await axios
        .get(`http://localhost:5000/user/getById/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
          },
        })
        .then((res) => {
          const response = res.data.product;
          setData(response);
          setLoading(false);
        })
        .catch((error) => {toast.error(error.response.data.status.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    };
    getProducts();
  }, []);
  const Loading = () => {
    return <>Loading......</>;
  };

  const ShowProducts = () => {
    return (
      <React.Fragment>
        {data.map((product,i) => {
          return (
            <div key={i}>
            <div  className="container">
        <div className="row outline">
          <div className="col-lg-5 col-md-5 col-sm-12">
            <div className="imgbg">
            <Slide>
                    {product.images.map((each, index) => (
                      <img
                        src={each}
                        key={index}
                        className="card-img-top imgsizing"
                        style={{width:350,height:350}}
                        alt={product.title}
                      />
                    ))}
                  </Slide>
            </div>
          </div>
          <div className="col-lg-7 col-md-7 col-sm-12 description">
            <div>
            <h4 className="text-uppercase text-black">{product.category}</h4>
              <h3 className="fw-bold"> {product.title}</h3>
              <p className="lead">{product.description}</p>
              <p className="display-7 fw-bold"> Price: ₹ {product.price}/-</p>
              <p className="lead fw-bold"> Rating: {product.rating}</p>
              <button
                  className="btn btn-outline-info"
                  onClick={() => addProduct(product)}
                >
                  Add to Cart
                </button>
                <NavLink to="/cart" className="btn btn-outline-info ms-2">
                  Go to Cart
                </NavLink>
            </div>
          </div>
        </div>
      </div>
            </div>
          );
        })}
        <Outlet />
      </React.Fragment>
    );
  };
  return (
    <div>
      <div className="container my-5 py-5 ">
        <div className="row">{loading ? <Loading /> : <ShowProducts />}</div>
      </div>
    </div>
  );
};
export default Product;
