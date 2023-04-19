/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Link, Outlet } from "react-router-dom";
const Products = (props) => {
  const [data, setDate] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;
  
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const res = await axios.get("https://dummyjson.com/products");
      if (componentMounted) {
        setDate(res.data.products);
        setFilter(res.data.products);
        setLoading(false);
        console.log({filter})
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
        {filter.map((product) => {
          return (
            <>
              <div className="col-md-3 mb-3">
                <div className="card h-100 text-center" key={product.id}>
                  <img
                    src={product.images[0]}
                    className="card-img-top"
                    alt={product.title}
                    height="250px"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text fw-bolder">${product.price}</p>
                    {props.auth === "true" ? 
                      <Link
                        to={`/products/${product.id}`}
                        className="btn btn-outline-dark"
                      >
                        Buy Now
                      </Link>
                     : 
                      <Link to={`/login`} className="btn btn-outline-dark">
                        Buy Now
                      </Link>
                    }
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
