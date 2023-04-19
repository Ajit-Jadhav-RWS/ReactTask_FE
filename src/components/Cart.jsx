import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteCart } from "../redux/action/index";
const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  console.log(state);
  const handleClose = (item) => {
    dispatch(deleteCart(item));
  };
  const cartItems = (cartItem) => {
    return (
      <div style={{backgroundColor:"lightgray"}} key={cartItem.id}>
        <div className="container" style={{padding:10}}>
          <button
            onClick={() => handleClose(cartItem)}
            className="btn-close float-end"
            arial-label="Close"
          ></button>
          <div className="row">
            <div className="col-md-4">
              <img
                src={cartItem.images[0]}
                alt={cartItem.title}
                height="200px"
                width="180px"
              />
            </div>
            <div className="col-md-4" style={{marginTop:30}}>
              <h3 style={{fontFamily:"sans-serif"}}>{cartItem.title}</h3>
              <p style={{fontSize:20,color:"darkred"}}>Price: ${cartItem.price}</p>
              <p style={{fontSize:20,color:"royalblue"}}>Quantity: {cartItem.qty}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const emptyCart = () => {
    return (
      <div className="container" style={{marginTop:40}}>
        <h3>Empty Cart</h3>
      </div>
    );
  };
  return (
    <div>
      {state.length === 0 && emptyCart()}
      {state.length !== 0 && state.map(cartItems)}{" "}
    </div>
  );
};
export default Cart;
