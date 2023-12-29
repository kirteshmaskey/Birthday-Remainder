import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setshowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);
    const [isBtnClicked, setIsBtnClicked] = useState(false);

    const [inputValue, setinputValue] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });


    const setVal = (e) => {
        const { name, value } = e.target;

        setinputValue(() => {
            return {
                ...inputValue,
                [name]: value
            }
        })
    };

    const handleUserSignUp = async (e) => {
        e.preventDefault();

        const { name, email, password, cpassword } = inputValue;

        if (name === "") {
            toast.warning("Name is required!");
        } else if (email === "") {
            toast.warning("Email is required!");
        } else if (!email.includes("@")) {
            toast.warning("Invalid email!");
        } else if (password === "") {
            toast.warning("Password is required!");
        } else if (password.length < 6) {
            toast.warning("Password must be 6 character!");
        } else if (cpassword === "") {
            toast.warning("Confirm password is required!");
        }
        else if (cpassword.length < 6) {
            toast.warning("Confirm password must be 6 character!");
        } else if (password !== cpassword) {
            toast.warning("Password and Confirm password are not same!");
        } else {
            setIsBtnClicked(true);
            const data = await fetch(`${BASE_URL}/api/auth/register`, {
                method : "POST",
                headers : {
                  "Content-Type" : "application/json",
                },
                body : JSON.stringify({
                  name, email, password, cpassword
                })
            });


            const res = await data.json();
            setIsBtnClicked(false);
            if (data.status === 201) {
                toast.success("Registration Successfully done!");
                setTimeout(()=>navigate("/"), 1500);
                setinputValue({ ...inputValue, name: "", email: "", password: "", cpassword: "" });
            }
            if(data.status === 422) {
                toast.error(res.message);
            }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="name">Name</label>
                            <input type="text" onChange={setVal} value={inputValue.name} name="name" id="name" placeholder='Enter Your Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={setVal} value={inputValue.email} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!showPassword ? "password" : "text"} value={inputValue.password} onChange={setVal} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setshowPassword(!showPassword)}>
                                    {!showPassword ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input type={!showConfirmPassword ? "password" : "text"} value={inputValue.cpassword} onChange={setVal} name="cpassword" id="cpassword" placeholder='Confirm password' />
                                <div className="showpass" onClick={() => setshowConfirmPassword(!showConfirmPassword)}>
                                    {!showConfirmPassword ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={handleUserSignUp} disabled={isBtnClicked}>{isBtnClicked? "Signing in..." : "Sign In"}</button>
                        <p>Already have an account? <NavLink to="/" className="link">Log In</NavLink></p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Register;