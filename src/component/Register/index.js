import React, { useState } from 'react';
import './Register.scss';
import {Input} from '../../common'
import { useNavigate } from "react-router-dom";
import useValidator from "../../service/useValidator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleArrowLeft
} from "@fortawesome/free-solid-svg-icons";

function Register() {
    let navigate = useNavigate();

    const [validator, showValidationMessage] = useValidator();

    const [loginDetails, setLoginDetails] = useState({
        userName: "",
        password: "",
        confirmPassword: "",
        status: "",
        profileDetails: null,
    });

    function handleChange({ target: { name, value } }) {
        setLoginDetails({ ...loginDetails, [name]: value });
    }

        //handle Submit
    const registerSubmit = (e) => {
        e.preventDefault();
        if (validator.allValid()) {
            localStorage.setItem(loginDetails.userName, JSON.stringify(loginDetails));
          navigate('/login');
        } else {
            showValidationMessage(true);
        }
    };

    return (
        <div className="App">
            <div className='container'>
                <h1 className='my-5'>Create Account</h1>
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
                    <div className='my-4'>
                        <Input
                            type='password'
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={loginDetails.confirmPassword}
                            onChange={handleChange}
                            eye={true}
                        />
                        <span className='text-error'>
                            {validator.message(
                                "password",
                                loginDetails.confirmPassword,
                                `required|checkPassword:${loginDetails.password}`,
                                {
                                    validators: {
                                        checkPassword: {
                                            message: "Given :attribute does not match the new password",
                                            rule: function (val, params) {
                                                return val === params[0];
                                            },
                                        },
                                    },
                                }
                            )}
                        </span>
                    </div>
                </div>
                <div onClick={() => navigate('/')} className='cursor-pointer'> <FontAwesomeIcon className="cursor-pointer" icon={faCircleArrowLeft} /> <span className='text-error'>Back to login</span></div>
                {/* <div className='text-error cursor-pointer' onClick={handleClick}>Go Back</div> */}
                <div className='d-flex mt-3 justify-content-center'>
                    <button className='submit-btn' onClick={registerSubmit}>
                        submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;
