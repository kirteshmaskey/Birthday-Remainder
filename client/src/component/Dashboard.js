import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import BirthdayList from "./BirthdayList";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Dashboard = () => {
  const { logindata, setLoginData } = useContext(LoginContext);

  const [data, setData] = useState(false);

  const navigate = useNavigate();

  const validateUser = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch(`${BASE_URL}/api/auth/validuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });

    const data = await res.json();

    if (data.status === 401 || !data) {
      navigate("*");
    } else {
      setLoginData(data);
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      validateUser();
      setData(true);
    }, 2000);
  }, []);

  return (
    <>
      {data ? (
        <>
          <BirthdayList />
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default Dashboard;
