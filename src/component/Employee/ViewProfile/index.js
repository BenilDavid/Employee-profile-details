import React, { useState, useEffect } from 'react'
import { Header, Sidebar, Box } from '../../../common'
import user from '../../../assets/images/user.png';
import './ViewProfile.scss';
import { getCookie } from '../../../Utils/common';
import { useNavigate } from 'react-router-dom';

const ViewProfile = () => {

  const navigate = useNavigate();
  const [userName, setUserName] = useState(getCookie("username"));

  const userDetails = JSON.parse(localStorage.getItem(userName));

  useEffect(() => {
    if (!(userName)) {
      navigate('/login');
    }
    console.log(userDetails);
  }, [])

  const downloadBtn = () => {
    window.print();
  }

  const ExportJson = () => {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userDetails.profileDetails));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "Profile-details.json");
    // dlAnchorElem.click();
  }
  
  if (userDetails.profileDetails) {
    var { name, dob, contact, email, gender, tAddress, pAddress, maritalStatus, profileImage, secondary, seniorSecondary, graduation, role, experience, doj, skills, anualIncome, kyc } = userDetails.profileDetails;
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className='ml-200'>
        <div className='text-center my-3'>
          <h2 className='text-uppercase'>View Profile</h2>
          <div id='ViewContainer' className='container'>
            <Box>
              {userDetails.profileDetails ? (<div className='my-4 mx-3 '>
                <div className="d-flex align-items-center">
                  <img
                    className="profile-picture"
                    src={user}
                    alt="profile picture"
                  />
                  <h4 className="m-0 ms-3">{name}</h4>
                </div>
                <div className='mt-5'>
                  <h4 className='ms-3 text-start fw-bold my-4'>Personal Details</h4>
                  <div className='row ms-3'>
                    <strong className='col-md-3 text-start mt-2'>Date of birth :</strong>
                    <div className='col-md-9 text-start mt-2'>{dob.split('T')[0].split("-").reverse().join("-")}</div>
                    <strong className='col-md-3 text-start mt-2'>Contact :</strong>
                    <div className='col-md-9 text-start mt-2'>{contact}</div>
                    <strong className='col-md-3 text-start mt-2'>Email :</strong>
                    <div className='col-md-9 text-start mt-2'>{email}</div>
                    <strong className='col-md-3 text-start mt-2'>Gender :</strong>
                    <div className='col-md-9 text-start mt-2'>{gender}</div>
                    <strong className='col-md-3 text-start mt-2'>Temporary Address :</strong>
                    <div className='col-md-9 text-start mt-2'>{tAddress}</div>
                    <strong className='col-md-3 text-start mt-2'>Permanent Address :</strong>
                    <div className='col-md-9 text-start mt-2'>{pAddress}</div>
                    <strong className='col-md-3 text-start mt-2'>Marital Status :</strong>
                    <div className='col-md-9 text-start mt-2'>{maritalStatus}</div>
                  </div>
                </div>
                <div className='mt-5'>
                  <h4 className='ms-3 text-start fw-bold my-4'>Education Details</h4>
                  <div className='row ms-3'>
                    <strong className='col-md-3 text-start mt-2'>10th ( % ) :</strong>
                    <div className='col-md-9 text-start mt-2'>{secondary} %</div>
                    <strong className='col-md-3 text-start mt-2'>12th ( % ) :</strong>
                    <div className='col-md-9 text-start mt-2'>{seniorSecondary} %</div>
                    <strong className='col-md-3 text-start mt-2'>University :</strong>
                    <div className='col-md-9 text-start mt-2'>{graduation} %</div>
                  </div>
                </div>
                <div className='mt-5'>
                  <h4 className='ms-3 text-start fw-bold my-4'>Professional Details</h4>
                  <div className='row ms-3'>
                    <strong className='col-md-3 text-start mt-2'>Role :</strong>
                    <div className='col-md-9 text-start mt-2'>{role}</div>
                    <strong className='col-md-3 text-start mt-2'>Experience :</strong>
                    <div className='col-md-9 text-start mt-2'>{experience} years</div>
                    <strong className='col-md-3 text-start mt-2'>DOJ :</strong>
                    <div className='col-md-9 text-start mt-2'>{doj.split('T')[0].split("-").reverse().join("-")}</div>
                    <strong className='col-md-3 text-start mt-2'>Skills :</strong>
                    <div className='col-md-9 text-start mt-2'>{skills}</div>
                    <strong className='col-md-3 text-start mt-2'>Anual Income :</strong>
                    <div className='col-md-9 text-start mt-2'>{anualIncome} LPA</div>
                  </div>
                </div>
                <div className='mt-5'>
                  <h4 className='ms-3 text-start fw-bold my-4'>Professional Details</h4>
                  <div className='row ms-3'>
                    <strong className='col-md-3 text-start mt-2'>kyc :</strong>
                    <div className='col-md-9 text-start mt-2'>{kyc}</div>
                  </div>
                </div>
              </div>) : (<div>Profile Details not submitted</div>)}
            </Box>
          </div>
          {userDetails.profileDetails ? (<div className='d-flex mt-3 justify-content-center align-items-center'>
            <button className='profile-submit-btn' onClick={downloadBtn}>
              Download as PDF
            </button>
            <a className='ms-4 profile-submit-btn' id="downloadAnchorElem" onClick={ExportJson} >export as JSON</a>
          </div>) : ''}

        </div>
      </div>
    </>
  )
}

export default ViewProfile;

