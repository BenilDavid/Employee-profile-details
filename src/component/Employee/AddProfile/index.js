import React, { useState, useEffect } from 'react'
import { Popup, Header, Sidebar, Box, Input, CustomDatePicker, CustomSelect, TextArea, DropZone } from '../../../common'
import useValidator from "../../../service/useValidator";
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../../Utils/common';

const EmployeeProfile = () => {
    
    let navigate = useNavigate();
    const [validator, showValidationMessage] = useValidator();
    const [showPopup, setShowPopup] = useState(false);
    const [showAdminPopup, setShowAdminPopup] = useState(false);

    const [userName, setuserName] = useState(getCookie("username"));
    const [employeeDetails, setEmployeeDetails] = useState({
        name: '',
        dob: '',
        contact: '',
        email: userName,
        gender: '',
        tAddress: '',
        pAddress: '',
        maritalStatus: '',
        profileImage: '',

        secondary: '',
        seniorSecondary: '',
        graduation: '',

        role: '',
        experience: '',
        doj: '',
        skills: '',
        anualIncome: '',
        kyc: '',
    })
    const [localUserDetails, setlocalUserDetails] = useState(JSON.parse(localStorage.getItem(userName)));

    const genderOptions = [{ id: 1, label: 'Male' }, { id: 2, label: 'Female' }];
    const maritalStatusOptions = [{ id: 1, label: 'Married' }, { id: 2, label: 'Un-married' }];

    useEffect(() => {
        console.log(localUserDetails);
        if(localUserDetails.status === "Approved"){
            setShowAdminPopup(true);
            setTimeout(() => {
                setShowAdminPopup(false);
            }, 3000);
        }else if(localUserDetails.status === "Declined"){
            setShowAdminPopup(true);
            setTimeout(() => {
                setShowAdminPopup(false);
            }, 3000);
        }
       
        if (!userName) {
            navigate('/login');
        }
        if ((userName) && (localUserDetails.profileDetails)) {
            updatePage();
        }
    }, [])

    useEffect(() => {
        localStorage.removeItem(userName);
        localStorage.setItem(userName, JSON.stringify(localUserDetails));
    }, [localUserDetails])


    const updatePage = () => {
        setEmployeeDetails((prev) => {
            return {
                ...prev,
                name: localUserDetails.profileDetails.name,
                dob: moment(localUserDetails.profileDetails.dob),
                contact: localUserDetails.profileDetails.contact,
                email: localUserDetails.profileDetails.email,
                gender: localUserDetails.profileDetails.gender,
                tAddress: localUserDetails.profileDetails.tAddress,
                pAddress: localUserDetails.profileDetails.pAddress,
                maritalStatus: localUserDetails.profileDetails.maritalStatus,
                profileImage: localUserDetails.profileDetails.profileImage,

                secondary: localUserDetails.profileDetails.secondary,
                seniorSecondary: localUserDetails.profileDetails.seniorSecondary,
                graduation: localUserDetails.profileDetails.graduation,

                role: localUserDetails.profileDetails.role,
                experience: localUserDetails.profileDetails.experience,
                doj: moment(localUserDetails.profileDetails.doj),
                skills: localUserDetails.profileDetails.skills,
                anualIncome: localUserDetails.profileDetails.anualIncome,
                kyc: localUserDetails.profileDetails.kyc,
            };
        })
    }

    // disable dates
    const handleDisableDateDob = (current) => {
        let year = new Date();
        let cal = year.getFullYear() - 16;
        let customDate = moment().format(`${cal}-MM-DD`);
        return current && current > moment(customDate, "YYYY-MM-DD");
    };
    const handleDisableDateDoj = (current) => {
        let year = new Date();
        let cal = year.getFullYear();
        let customDate = moment().format(`${cal}-MM-DD`);
        return current && current > moment(customDate, "YYYY-MM-DD");
    };

    // change date
    const handleChangeDate = (name, value) => {
        setEmployeeDetails((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // store employee details 
    const handleChange = ({ target: { name, value } }) => {
        setEmployeeDetails((prev) => ({ ...prev, [name]: value }));
    }

    // handle dropdown select
    const handleFormChange = (e) => {
        console.log(e);
        if (e.name === 'gender') {
            setEmployeeDetails((prev) => ({ ...prev, [e.name]: e.value === 1 ? "Male" : "Female" }));
        } else if (e.name === 'maritalStatus') {
            setEmployeeDetails((prev) => ({ ...prev, [e.name]: e.value === 1 ? "Married" : "Un-married" }));
        }
    }

    //  handle uploaded iamges
    const handleMediaFiles = (data, val) => {
        setEmployeeDetails((prev) => ({ ...prev, [val]: data[0].path }));
    };

    const profileOnSubmit = (e) => {
        e.preventDefault();
        if (validator.allValid()) {
            setlocalUserDetails((prev) => ({ ...prev, profileDetails: employeeDetails }));
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 2000);
        }
        else {
            showValidationMessage(true);
        }
    }

    return (
        <>
            <Popup
                isOpen={showPopup}
                message={"SUCCESS"}
                image={"tick"}
                size="sm"
                message2={"Profile details submitted Successfully"}
            />
            <Popup
                isOpen={showAdminPopup}
                message={localUserDetails.status === "Approved" ? "SUCCESS" : "FAILURE"}
                image={localUserDetails.status === "Approved" ? "tick" : "close"}
                size="sm"
                message2={localUserDetails.status === "Approved" ? "Your Profile details are approved by Admin" : "Your Profile details are declined by Admin"}
            />
            <Header />
            <Sidebar />
            <div className=' ml-200'>
                <div className='text-center my-3'>
                    <h2 className='text-uppercase'>Employee Profile Details</h2>
                    <div className='container'>
                        <Box className='mt-4' title="Personal Details">
                            <div className='row'>
                                <div className='col-md-5 my-3'>

                                    <Input
                                        label="Name"
                                        placeholder="Name"
                                        name="name"
                                        value={employeeDetails.name}
                                        onChange={handleChange}
                                    />
                                    <span className='text-error'>
                                        {validator.message(
                                            "name",
                                            employeeDetails.name,
                                            "required|alpha_space|max:25"
                                        )}
                                    </span>
                                </div>
                               
                                <div className='col-md-5 my-3'>
                                    <label className='label'>
                                        Date of birth <span className="text-error">*</span>
                                    </label>
                                    <CustomDatePicker
                                        placeholder="Enter here"
                                        name="dob"
                                        value={employeeDetails.dob}
                                        disabledDate={handleDisableDateDob}
                                        onChange={(value) => handleChangeDate("dob", value)}
                                        customDateOption={true}
                                        defaultYear={"2006"}
                                    />
                                    <span className='text-error'>
                                        {validator.message(
                                            "dob",
                                            employeeDetails.dob,
                                            "required"
                                        )}
                                    </span>
                                </div>
                                <div className='col-md-5 my-3'>
                                    <Input
                                        label="Contact"
                                        placeholder="Contact"
                                        name="contact"
                                        value={employeeDetails.contact}
                                        onChange={handleChange}
                                    />
                                    <span className='text-error'>
                                        {validator.message(
                                            "contact",
                                            employeeDetails.contact,
                                            "required|phone"
                                        )}
                                    </span>
                                </div>
                                <div className='col-md-5 my-3'>
                                    <Input
                                        label="Email"
                                        placeholder="Email"
                                        name="email"
                                        value={employeeDetails.email}
                                        onChange={handleChange}
                                    />
                                    <span className='text-error'>
                                        {validator.message(
                                            "email",
                                            employeeDetails.email,
                                            "required|email"
                                        )}
                                    </span>
                                </div>
                                <div className='col-md-5 my-3'>
                                    <CustomSelect
                                        label='Gender'
                                        placeholder="Select"
                                        name="gender"
                                        value={employeeDetails.gender}
                                        onChange={handleFormChange}
                                        optionsList={genderOptions}
                                    />
                                    <span className='text-error'>
                                        {validator.message(
                                            "gender",
                                            employeeDetails.gender,
                                            "required"
                                        )}
                                    </span>
                                </div>
                                <div className='col-md-5 my-3'>
                                    <CustomSelect
                                        label='Marital Status'
                                        placeholder="Select"
                                        name="maritalStatus"
                                        value={employeeDetails.maritalStatus}
                                        onChange={handleFormChange}
                                        optionsList={maritalStatusOptions}
                                    />
                                    <span className='text-error'>
                                        {validator.message(
                                            "marital Status",
                                            employeeDetails.maritalStatus,
                                            "required"
                                        )}
                                    </span>
                                </div>
                                <div className='col-md-5 my-3'>
                                    <label className='label'>
                                        Temporary Address <span className="text-error">*</span>
                                    </label>
                                    <TextArea
                                        placeholder="Enter here"
                                        name="tAddress"
                                        value={employeeDetails.tAddress}
                                        onChange={handleChange}
                                    />
                                    <span className='text-error'>
                                        {validator.message(
                                            "Temporary address",
                                            employeeDetails.tAddress,
                                            "required|max:80"
                                        )}
                                    </span>
                                </div>
                                <div className='col-md-5 my-3'>
                                    <label className='label'>
                                        Permanent Address <span className="text-error">*</span>
                                    </label>
                                    <TextArea
                                        placeholder="Enter here"
                                        name="pAddress"
                                        value={employeeDetails.pAddress}
                                        onChange={handleChange}
                                    />
                                    <span className='text-error'>
                                        {validator.message(
                                            "Permanent address",
                                            employeeDetails.pAddress,
                                            "required|max:80"
                                        )}
                                    </span>
                                </div>

                                <div className='col-md-10 my-3'>
                                    <label className='label'>
                                        Upload Profile Picture <span className="text-error">*</span>
                                    </label>
                                    <DropZone
                                        name="profileImage"
                                        value={employeeDetails.profileImage}
                                        accept="image/*"
                                        maxFile={1}
                                        onChange={(e) => handleMediaFiles(e, "profileImage")}
                                    />
                                    <span className='text-error'>
                                        {validator.message(
                                            "Profile image",
                                            employeeDetails.profileImage,
                                            "required"
                                        )}
                                    </span>
                                </div>
                            </div>

                        </Box>
                        <Box title='Education Qualification'>
                            <div className='row'>
                                <div className='col-md-5 my-3'>
                                    <Input
                                        label="Secondary"
                                        placeholder="10th ( % )"
                                        name="secondary"
                                        value={employeeDetails.secondary}
                                        onChange={handleChange}
                                    />
                                    <span className='text-error'>
                                        {validator.message(
                                            "secondary",
                                            employeeDetails.secondary,
                                            "required|numeric|min:0,num|max:100,num"
                                        )}
                                    </span>
                                </div>
                                <div className='col-md-5 my-3'>
                                    <Input
                                        label="Senior Secondary"
                                        placeholder="12th ( % )"
                                        name="seniorSecondary"
                                        value={employeeDetails.seniorSecondary}
                                        onChange={handleChange}
                                    />
                                    <span className='text-error'>
                                        {validator.message(
                                            "seniorSecondary",
                                            employeeDetails.seniorSecondary,
                                            "required|numeric|min:0,num|max:100,num"
                                        )}
                                    </span>
                                </div>
                                <div className='col-md-5 my-3'>
                                    <Input
                                        label="Graduation"
                                        placeholder="UG ( % )"
                                        name="graduation"
                                        value={employeeDetails.graduation}
                                        onChange={handleChange}
                                    />
                                    <span className='text-error'>
                                        {validator.message(
                                            "graduation",
                                            employeeDetails.graduation,
                                            "required|numeric|min:0,num|max:100,num"
                                        )}
                                    </span>
                                </div>
                            </div>
                        </Box>
                        <Box title='Professional Details'>
                            <div className='row'>
                                <div className='col-md-5 my-3'>
                                    <Input
                                        label="Role"
                                        placeholder="Role"
                                        name="role"
                                        value={employeeDetails.role}
                                        onChange={handleChange}
                                    />
                                    <span className='text-error'>
                                        {validator.message(
                                            "role",
                                            employeeDetails.role,
                                            "required|max:20"
                                        )}
                                    </span>
                                </div>
                                <div className='col-md-5 my-3'>
                                    <Input
                                        label="Experience"
                                        placeholder="Experience"
                                        name="experience"
                                        value={employeeDetails.experience}
                                        onChange={handleChange}
                                    />
                                    <span className='text-error'>
                                        {validator.message(
                                            "role",
                                            employeeDetails.experience,
                                            "required|numeric|min:0,num|max:40,num"
                                        )}
                                    </span>
                                </div>
                                <div className='col-md-5 my-3'>
                                    <label className='label'>
                                        Date of Joining <span className="text-error">*</span>
                                    </label>
                                    <CustomDatePicker
                                        placeholder="Enter here"
                                        name="doj"
                                        value={employeeDetails.doj}
                                        disabledDate={handleDisableDateDoj}
                                        onChange={(value) => handleChangeDate("doj", value)}
                                        customDateOption={true}
                                        defaultYear={"2022"}
                                    />
                                    <span className='text-error'>
                                        {validator.message(
                                            "doj",
                                            employeeDetails.doj,
                                            "required"
                                        )}
                                    </span>
                                </div>
                                <div className='col-md-5 my-3'>
                                    <Input
                                        label="Skills"
                                        placeholder="Skills"
                                        name="skills"
                                        value={employeeDetails.skills}
                                        onChange={handleChange}
                                    />
                                    <span className='text-error'>
                                        {validator.message(
                                            "skills",
                                            employeeDetails.skills,
                                            "required|max:40"
                                        )}
                                    </span>
                                </div>
                                <div className='col-md-5 my-3'>
                                    <Input
                                        label="Anual Income"
                                        placeholder="Anual Income ( LPA )"
                                        name="anualIncome"
                                        value={employeeDetails.anualIncome}
                                        onChange={handleChange}
                                    />
                                    <span className='text-error'>
                                        {validator.message(
                                            "anualIncome",
                                            employeeDetails.anualIncome,
                                            "required|numeric|min:0,num|max:80,num"
                                        )}
                                    </span>
                                </div>
                            </div>
                        </Box>

                        <Box title='Kyc Documents'>
                            <div className='row'>
                                <div className='col-md-10 my-3'>
                                    <label className='label'>
                                        Upload Aathar/PAN card <span className="text-error">*</span>
                                    </label>
                                    <DropZone
                                        name="kyc"
                                        value={employeeDetails.kyc}
                                        accept="image/*"
                                        maxFile={1}
                                        onChange={(e) => handleMediaFiles(e, "kyc")}
                                    />
                                    <span className='text-error'>
                                        {validator.message(
                                            "Profile image",
                                            employeeDetails.kyc,
                                            "required"
                                        )}
                                    </span>
                                </div>
                            </div>

                        </Box>

                        <div className='d-flex mt-3 justify-content-center'>
                            <button className='profile-submit-btn' onClick={profileOnSubmit}>
                                submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default EmployeeProfile;