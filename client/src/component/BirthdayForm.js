import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const BirthdayForm = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
  });

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
    } else if (dob === "") {
      toast.warning("Date of Birth is required");
    } else {
      const token = localStorage.getItem("usersdatatoken");
      
      const res = await fetch(`${BASE_URL}/api/set-dob`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token
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
      if(res.status === 422) {
        toast.error(data.message);
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Enter Details Below</h1>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="name">Name</label>
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
              <label htmlFor="email">Email</label>
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
              <label htmlFor="phone">Phone Number</label>
              <input
                value={inputValue.phone}
                onChange={getValue}
                name="phone"
                id="phone"
                placeholder="Birthday Person Phone Number"
              />
            </div>

            <div className="form_input">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                value={inputValue.dob}
                onChange={getValue}
                name="dob"
                id="dob"
                placeholder="Date of Birth"
              />
            </div>

            <button className="btn" onClick={handleFormInput}>
              Save
            </button>
            
          </form>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default BirthdayForm;
