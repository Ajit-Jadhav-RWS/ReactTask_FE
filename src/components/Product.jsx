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
const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const addProduct = (product) => {
    console.log(product)
    dispatch(addCart(product));
  };
  const auth=localStorage.getItem("auth")
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(auth,"--product 1-")
      const getProducts = async () => {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const res = await response.json();
        data[0] = res;
        setLoading(false);
      };
      getProducts();
    
  }, []);
  const Loading = () => {
    return <>Loading......</>;
  };

  const ShowProducts = () => {
    return (
      <React.Fragment>
        {data.map((product) => {
          return (
            <>
              <div className="col-md-6">
                <img
                  src={product.images[0]}
                  className="card-img-top"
                  alt={product.title}
                  height="350px"
                />
              </div>
              <div className="col-md-6">
                <h4 className="text-uppercase text-black">
                  {product.category}
                </h4>
                <h1 className="display-5">{product.title}</h1>
                <p className="lead fw-bold">Rating {product.rating}</p>
                <h3 className="display-6 fw-bold my-4">${product.price}</h3>
                <p className="lead">{product.description}</p>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => addProduct(product)}
                >
                  Add to Cart
                </button>
                <NavLink to="/cart" className="btn btn-outline-dark ms-2">
                  Go to Cart
                </NavLink>
              </div>
            </>
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
