/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "swiper/css/autoplay";
const Products = (props) => {
  const [data, setDate] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/user/getAllProduct", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
        },
      });
      if (componentMounted) {
        console.log(res.data.product);
        setDate(res.data.product);
        setFilter(res.data.product);
        setLoading(false);
        console.log({ filter });
      }
      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);
  const Loading = () => {
    return <>Loading......</>;
  };
  const filterProduct = (type) => {
    const list = data.filter((e) => e.category === type);
    setFilter(list);
  };
  // const swiper = useSwiper();
  const ShowProducts = () => {
    return (
      <React.Fragment>
        <div className="button d-flex justify-content-center mb-5 pb-5">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("smartphones")}
          >
            SmartPhones
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("laptops")}
          >
            Laptops
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("fragrances")}
          >
            Fragrances
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("skincare")}
          >
            Skincare
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("groceries")}
          >
            Groceries
          </button>
        </div>
        {filter.map((product,i) => {
          return (
            <>
              <div key={i} className="col-sm-4 mb-4 mb-sm-0">
                <div className="card bg-dark textcolor cardpadding">
                  <Slide>
                    {product.images.map((each, index) => (
                      <img
                        src={each}
                        key={index}
                        className="card-img-top imgsizing"
                        height="300px"
                        alt={product.title}
                      />
                    ))}
                  </Slide>
                  
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text fw-bolder">₹ {product.price}/-</p>
                    {props.auth === true ? (
                      <Link
                        to={`/products/${product.id}`}
                        className="btn btn-primary"
                      >
                        Buy Now
                      </Link>
                    ) : (
                      <Link to={`/login`} className="btn btn-primary">
                        Buy Now
                      </Link>
                    )}
                  </div>
                </div>
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
        <div className="row">
          <div className="col-12 mb-3">
            <h1 className="fw-bolder text-center ">Products</h1>
          </div>
        </div>
        <div className="row">{loading ? <Loading /> : <ShowProducts />}</div>
      </div>
    </div>
  );
};
export default Products;
