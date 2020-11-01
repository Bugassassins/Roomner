import React from 'react';
import "./HomePageNavbar.css";
import logo from "../../images/Homepage_assets/logo.png"
const HomePageNavbar=(props)=>{
    return(
        <div class="Homepage-navbar-Header">
            <img className="Homepage-navbar-Logo" src={logo} alt="logo"/>
            <div className="Homepage-navbar-Menu">
            <button className="Homepage-navbar-About">About</button>
            <button className="Homepage-navbar-Login" onClick={props.handleLogin}>Login</button>
            </div>
        </div>
    )
}
export default HomePageNavbar;