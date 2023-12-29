import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "./ContextProvider/Context";
import { useNavigate } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const today = new Date().toISOString().split("T")[0];

const BirthdayForm = () => {
  const { validLogin, setValidLogin } = useContext(LoginContext);
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
  });
  const navigate = useNavigate();

  const getValue = (val) => {
    const { name, value } = val.target;
    setInputValue(() => {
      return {
        ...inputValue,
        [name]: value,
      };
    });
  };

  const handleFormInput = async (e) => {
    e.preventDefault();

    const { name, email, phone, dob } = inputValue;

    if (name === "") {
      toast.warning("Name is required!");
    } else if (email === "") {
      toast.warning("Email is required!");
    } else if (!email.includes("@")) {
      toast.warning("Invalid email");
    } else if (phone === "") {
      toast.warning("Phone is required!");
    } else if (dob === "") {
      toast.warning("Date of Birth is required");
    } else {
      const token = localStorage.getItem("usersdatatoken");

      const res = await fetch(`${BASE_URL}/api/set-dob`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          dob,
        }),
      });
      const data = await res.json();

      if (res.status === 201) {
        toast.success(data.message);
        setInputValue({
          ...inputValue,
          name: "",
          email: "",
          phone: "",
          dob: "",
        });
      }
      if (res.status === 422) {
        toast.error(data.message);
      }
    }
  };

  useEffect(() => {
    if (!validLogin) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Enter Details Below</h1>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="name">
                Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                onChange={getValue}
                value={inputValue.name}
                name="name"
                id="name"
                placeholder="Birthday Person Name"
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                onChange={getValue}
                value={inputValue.email}
                name="email"
                id="email"
                placeholder="Birthday Person Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="phone">
                Phone Number <span className="text-danger">*</span>
              </label>
              <input
                value={inputValue.phone}
                onChange={getValue}
                name="phone"
                id="phone"
                placeholder="Birthday Person Phone Number"
              />
            </div>

            <div className="form_input">
              <label htmlFor="dob">
                Date of Birth <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                value={inputValue.dob}
                onChange={getValue}
                name="dob"
                id="dob"
                max={today}
                placeholder="Date of Birth"
              />
            </div>

            <button className="btn" onClick={handleFormInput}>
              Save
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default BirthdayForm;
