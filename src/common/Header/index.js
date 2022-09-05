import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import './Header.scss';
import logout from '../../assets/images/logout.png'
import { deleteCookie } from "../../Utils/common";
export const Header = () => {
    let navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
        deleteCookie("username");
    }
    return (
        <nav class="navbar px-4 navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Dash<span className="blue-font">board</span></a>
                {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button> */}
                {/* <div class="collapse navbar-collapse" id="navbarSupportedContent"> */}
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li> */}
                    </ul>
                    <form class="d-flex">

                        <span className="cursor-pointer" onClick={handleLogout}> <img className="logout-img" src={logout} /> Logout</span>
                        {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
                    </form>
                {/* </div> */}
            </div>
        </nav>
    );
}
