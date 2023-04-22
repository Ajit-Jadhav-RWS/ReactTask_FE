import React from "react";
import Products from "./Products";

const Home = () => {
  const auth=JSON.parse(localStorage.getItem("auth"))
  return (
    <div className="home">
      <div className="card text-bg-dark text-white border-0">
        <img
          src="/images/bg.jpg"
          className="card-img"
          alt="Background"
          height="650px"
        />
        <div className="card-img-overlay">
            <h5 style={{fontSize:35,color:"black"}}>Welcome !!!</h5>
            <p className="card-text" style={{fontFamily:"cursive",fontSize:20,marginTop:20,color:"black"}}>Every product is special</p>
            <p className="card-text" style={{fontFamily:"monospace",fontSize:40,color:"GrayText",position:"relative",top:"38%",left:"17%"}}>A-Mart</p>
        </div>
      </div>
      <Products auth={auth}/>
    </div>
  );
};
export default Home;
