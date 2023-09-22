import React, { useContext, useState } from "react";
import "./style.css";
import { LoginContext } from "./ContextProvider/Context";
import { useNavigate, NavLink } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Header = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
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

    const data = await res.json();

    if (data.status === 201) {
      localStorage.removeItem("usersdatatoken");
      setLoginData(false);
      navigate("/");
    } else {
      console.log("error");
    }
  };


  return (
    <>
      <header>
        <nav>
          <NavLink to="/">
            <h1>Birthday Remainder</h1>
          </NavLink>
          {
            logindata ?
              <div>
                <>
                { BDButton ?
                    <button onClick={handleListClick} className="dash-btn"> Birthday List </button> 
                  :
                    <button onClick={handleDashClick} className="dash-btn"> Add </button> 
                  }
                </>
                <button onClick={handleUserLogout} className="logout-btn"> Logout </button> 
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
