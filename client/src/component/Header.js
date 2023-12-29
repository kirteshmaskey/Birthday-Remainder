import React, { useContext, useState } from "react";
import "./style.css";
import { LoginContext } from "./ContextProvider/Context";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Header = () => {
  const { validLogin, setValidLogin } = useContext(LoginContext);
  const [BDButton, setBDButton] = useState(false);

  const navigate = useNavigate();

  const handleListClick = () => {
    setBDButton(false);
    navigate("/dashboard");
  }
  
  const handleDashClick = () => {
    setBDButton(true);
    navigate("/add-birthday");
  }

  const handleUserLogout = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      }
    });

    if (res.status === 201) {
      localStorage.removeItem("usersdatatoken");
      setValidLogin(false);
      navigate("/");
    } else {
      toast.info("Please try again!!");
    }
  };


  return (
    <>
      <header>
        <nav>
          <NavLink to={validLogin? "/dashboard": "/"}>
            <h2 className="text-dark">Birthday Remainder</h2>
          </NavLink>
          {
            validLogin ?
              <div>
                <>
                { BDButton ?
                    <button onClick={handleListClick} className="btn btn-primary dash-btn"> Birthday List </button> 
                  :
                    <button onClick={handleDashClick} className="btn btn-primary dash-btn"> Add </button> 
                  }
                </>
                <button onClick={handleUserLogout} className="btn btn-danger dash-btn"> Logout </button> 
              </div>
            :
              <></>
          }
          
        </nav>
      </header>
    </>
  );
};

export default Header;
