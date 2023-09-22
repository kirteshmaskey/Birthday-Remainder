import React, { useState } from 'react'
import { NavLink ,useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import "./style.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Login = () => {

    const [showPassword, setshowPassword] = useState(false);
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });

    const history = useNavigate();

    const setVal = (e) => {
        const { name, value } = e.target;

        setInputValue(() => {
            return {
                ...inputValue,
                [name]: value
            }
        })
    };


    const loginuser = async(e) => {
        e.preventDefault();

        const { email, password } = inputValue;

        if (email === "") {
            toast.warning("Email is required!");
        } else if (!email.includes("@")) {
            toast.warning("Invalid email");
        } else if (password === "") {
            toast.warning("Password is required!");
        } else if (password.length < 6) {
            toast.warning("Password must be 6 character long!");
        } else {
            const data = await fetch(`${BASE_URL}/api/auth/login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                     email, password
                })
            });

            const res = await data.json();

            if(data.status === 201){
                localStorage.setItem("usersdatatoken",res.result.token);
                history("/dashboard")
                setInputValue({...inputValue,email:"",password:""});
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
                        <h1>Welcome Back, Log In</h1>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={inputValue.email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!showPassword ? "password" : "text"} onChange={setVal} value={inputValue.password} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setshowPassword(!showPassword)}>
                                    {!showPassword ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={loginuser}>Login</button>
                        <p>Don't have an Account? <NavLink to="/register" className="link">Sign Up</NavLink> </p>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Login;