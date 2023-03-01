import React, { useState } from "react";
import "./sidebar.scss";
import { Nav, NavItem, NavLink } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser, faUsersViewfinder
} from "@fortawesome/free-solid-svg-icons";
import { getCookie } from "../../Utils/common";
import user from '../../assets/images/user.png'
export const Sidebar = ({ link = true }) => {
    let navigate = useNavigate();

    // const [userName, setuserName] = useState();
    const userDetails = JSON.parse(localStorage.getItem(getCookie("username")));

    const [sidebarLinks, setSidebarLinks] = useState([
        {
            id: 1,
            label: 'Profile',
            to: '/profile',
            icon: faUser,
            active: true
        },
        {
            id: 2,
            label: 'View',
            to: '/view',
            icon: faUsersViewfinder,
            active: false
        },
    ]);

    function handleActive(value, to) {
        setSidebarLinks((current) =>
            current.map((obj) => {
                if (obj.id === value) {
                    return {
                        ...obj,
                        active: true,
                    };
                }
                return {
                    ...obj,
                    active: false,
                };
            })
        );
        navigate(to);
    }

    return (
        <>
            <Nav className="sidebar-container" vertical>
                {link ? (
                    <>
                        <div className="d-flex p-2 justify-content-between align-items-center my-3">
                            {/* <FontAwesomeIcon icon={faUser} /> */}
                            <img className="user-image me-2" src={user} alt="" />
                            <div><span className="text-muted">Welcome,</span> <span className="text-center">{userDetails.userName.split("@")[0] || ""}</span></div>
                            </div>
                        {sidebarLinks.map(({ id, label, to, icon, active }) => {
                            return ( <>
                                <NavItem key={id} className={active ? "nav-active nav-item" : "nav-inActive nav-item"} onClick={() => handleActive(id, to)}>
                                    <FontAwesomeIcon icon={icon} />
                                    <NavLink
                                        className="nav-link"
                                    >
                                        {label}
                                    </NavLink>
                                </NavItem>
                                </>)
                        })}
                    </>
                ) : (
                        <NavItem className="nav-item">
                            <FontAwesomeIcon icon={faUser} />
                            <NavLink
                                className="nav-link"
                            >
                                Admin
                            </NavLink>
                        </NavItem>
                )}
            </Nav>
        </>
    );
}
