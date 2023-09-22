import Header from "./component/Header";
import Login from "./component/Login";
import Register from "./component/Register";
import Dashboard from "./component/Dashboard";
import Error from "./component/Error";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./component/ContextProvider/Context";
import "bootstrap/dist/css/bootstrap.min.css";
import BirthdayList from "./component/BirthdayList";
import BirthdayForm from "./component/BirthdayForm";

function App() {
  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);

  const navigate = useNavigate();

  const validateUser = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": token,
      },
    });

    const data = await res.json();

    if (data.status === 401 || !data) {
      console.log("Invalid user");
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
          <Header />

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/birthday-list" element={<BirthdayList />} />
            <Route path="/add-birthday" element={<BirthdayForm />} />
            <Route path="*" element={<Error />} />
          </Routes>
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
}

export default App;
