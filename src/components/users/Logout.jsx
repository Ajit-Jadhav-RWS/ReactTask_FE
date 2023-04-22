import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Logout(props) {
    window.localStorage.setItem("auth",JSON.stringify(false))
    window.localStorage.removeItem("ACCESS_TOKEN")
    localStorage.removeItem("total");
    window.localStorage.removeItem("email")
    if(props==="expired"){
      
      toast.error("Please Login !!",{
        position: toast.POSITION.TOP_RIGHT,
      })
    window.location.href = "/login";
    }else{
      toast.success("Logged out success !!",{
        position: toast.POSITION.TOP_RIGHT,
      })
    window.location.href = "/home";
    }

}

export default Logout;
