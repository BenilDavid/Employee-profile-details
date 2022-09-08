import React, { useState, useEffect } from 'react';
import { Header, Input, Sidebar, StripedTable } from '../../../common';
import tick from '../../../assets/images/accept.png';
import close from '../../../assets/images/close.png';
import './AdminPortal.scss';
import { useNavigate } from "react-router-dom";

const AdminPortal = () => {

    let navigate = useNavigate();

    const [userList, setUserList] = useState([]);
    const [currentEmail, setcurrentEmail] = useState("")

    const headerContent = [
        { label: 'S.No' },
        { label: 'Name' },
        { label: 'Email' },
        { label: 'View' },
        { label: 'Approve' },
        { label: 'Decline' },
        { label: 'Remarks' },
        { label: 'Status' },
    ]

    useEffect(() => {
        let temp = [];
        for (var i = 0; i < localStorage.length; ++i) {
            temp.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
        }

        const newTemp = temp.filter((t) => {
            return t.profileDetails ? t : null;
        })
        setUserList(newTemp);
    }, [])

    useEffect(() => {
        userList.map((user) => {
            if (user.userName === currentEmail) {
                localStorage.removeItem(currentEmail);
                localStorage.setItem(currentEmail, JSON.stringify(user));
            }
        })
    }, [userList])

    function handleApprove(email) {
        setcurrentEmail(email);
        setUserList((current) =>
            current.map((obj) => {
                if (obj.userName === email) {
                    console.log(obj);
                    return {
                        ...obj,
                        status: "Approved",
                    };
                }
                return {
                    ...obj,
                };
            })
        );

    }

    function handleDecline(email) {
        setcurrentEmail(email);
        setUserList((current) =>
            current.map((obj) => {
                if (obj.userName === email) {
                    console.log(obj);
                    return {
                        ...obj,
                        status: "Declined",
                    };
                }
                return {
                    ...obj,
                };
            })
        );
    }

    const ExportJson = () => {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userList));
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "Profile-details.json");
    }

    const handleView = (email) => {
        console.log('email', email);
        navigate("/admin-view", { state: email });
    }
    const handleChange = ({ target: { value } }, email) => {
        setcurrentEmail(email);
        setUserList((current) =>
            current.map((obj) => {
                if (obj.userName === email) {
                    console.log(obj);
                    return {
                        ...obj,
                        remarks: value,
                    };
                }
                return {
                    ...obj,
                };
            })
        );
    }

    return (
        <>
            <Header />
            <Sidebar link={false} />
            <div className='d-flex justify-content-center ml-200'>
                <div className='table-container mx-3 text-center my-3'>
                    <h2 className='text-uppercase'>Admin Portal</h2>
                    <StripedTable headerDetails={headerContent} >
                        {userList.profileDetails !== null ? userList.map(({ remarks, profileDetails: { name, email }, status }, index) => {
                            return (<tr key={index}>
                                <td>{index + 1}</td>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td><button className='btn btn-primary' onClick={() => handleView(email)}>View</button></td>
                                <td><img className='action-img' onClick={() => handleApprove(email)} src={tick} /></td>
                                <td><img className='action-img' onClick={() => handleDecline(email)} src={close} /></td>
                                <td>
                                    {status === "Approved" ? ('-') : (<> <Input
                                        placeholder="Enter here"
                                        name={`${name}Remarks`}
                                        value={remarks}
                                        onChange={(e) => handleChange(e, email)}
                                    /></>)}

                                </td>
                                <td className={status === "Approved" ? "green-font" : "text-error"}>{status || "-"}</td>
                            </tr>)
                        }) : (<tr className='no-profile fw-bold'><td colSpan={'12'}><span>No Profile submitted</span></td></tr>)}
                    </StripedTable>
                </div>
            </div>
            <div className='d-flex mt-3 justify-content-center align-items-center'>
                <a className='ms-4 profile-submit-btn' id="downloadAnchorElem" onClick={ExportJson} >export as JSON</a>
            </div>
        </>
    )
}

export default AdminPortal;