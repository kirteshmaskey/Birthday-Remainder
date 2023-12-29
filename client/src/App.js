import Header from "./component/Header";
import Login from "./component/Login";
import Register from "./component/Register";
import Dashboard from "./component/Dashboard";
import Error from "./component/Error";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BirthdayForm from "./component/BirthdayForm";
import { ToastContainer } from "react-toastify";
const BASE_URL = process.env.REACT_APP_BASE_URL;

function App() {
  const navigate = useNavigate();

  const validateUser = async () => {
    let token = localStorage.getItem("usersdatatoken");
    if (token) {
      const res = await fetch(`${BASE_URL}/api/auth/validuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });

      if (res.status === 201) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    validateUser();
  }, []);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-birthday" element={<BirthdayForm />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
