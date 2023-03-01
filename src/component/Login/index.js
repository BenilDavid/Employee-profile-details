import React, { useState } from 'react';
import './Login.scss';
import { Input, Popup } from '../../common'
import { useNavigate } from "react-router-dom";
import useValidator from "../../service/useValidator";
import { setCookie } from '../../Utils/common';

function Login() {
    
    let navigate = useNavigate();

    // const [toggleEye, setToggleEye] = useState(0);
    const [validator, showValidationMessage] = useValidator();
    const [showPopup, setShowPopup] = useState(false);
    
    const [loginDetails, setLoginDetails] = useState({
        userName: "",
        password: "",
    });
    
    const userDetails = JSON.parse(localStorage.getItem(loginDetails.userName));

    function handleClick() {
        navigate("/register");
    }

    function handleChange({target : {name, value}}) {
        setLoginDetails({ ...loginDetails, [name]: value });
    }

    //handle Submit
    const loginSubmit = (e) => {
        e.preventDefault();
        if (validator.allValid()) {

            if (loginDetails.userName === 'admin@gmail.com' && loginDetails.password === 'Admin@123'){
                navigate("/admin");
            }else{
                if (userDetails){
                    if (userDetails.password === loginDetails.password && userDetails.userName === loginDetails.userName){
                        setShowPopup(true);
                        setTimeout(() => {
                            setShowPopup(false);
                            navigate("/profile");
                        }, 2000);
                        setCookie("username", userDetails.userName, 1);
                    }else{
                        alert('password incorrect')
                    }
                  
                }else{
                    setShowPopup(true);
                    setTimeout(() => {
                        setShowPopup(false);
                    }, 2000);
                }
            }
        } else {
            showValidationMessage(true);
        }
    };

    return (
        <div className="App">
            <Popup
                isOpen={showPopup}
                message={userDetails ? "SUCCESS" : "FAILURE" }
                image={userDetails ? "tick" : "close"}
                size="sm"
                message2={userDetails ? "Congratulations User has Logged in Successfully" : "User not registered"}
            />
            <div className='container'>
                <h1 className='my-5'>Login Here!</h1>
                <div>
                    <div className='my-4'>
                        <Input 
                            label="User Name" 
                            placeholder="User Name"
                            name="userName"
                            value={loginDetails.userName}
                            onChange={handleChange} 
                            />
                        <span className='text-error'>
                             {validator.message(
                            "email",
                            loginDetails.userName,
                            "required|email"
                            )}
                        </span>
                    </div>
                    <div className='my-4'>
                        <Input 
                            type='password'
                            label="Password" 
                            placeholder="Password"
                            name="password"
                            value={loginDetails.password}
                            onChange={handleChange} 
                            eye={true}
                            />
                        <span className='text-error'>
                            {validator.message(
                                "password",
                                loginDetails.password,
                                "required|max:20"
                            )}
                        </span>
                    </div>
                </div>
                <div>Not Registered ? <span className='cursor-pointer text-error' onClick={handleClick}>create an account</span></div>
                <div className='d-flex mt-3 justify-content-center'>
                    <button className='submit-btn' onClick={loginSubmit}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
