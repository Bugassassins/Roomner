import React from 'react';
import Logo from "../../images/Homepage_assets/logo.png";

const UserProfileNavbar =(props)=>{
    return(
        <div className="Homepage-navbar-Header">
            <img className="Homepage-navbar-Logo" src={Logo} alt="logo" />
            <button onClick={props.logoutFunc} className="Hero-cta">Logout</button>
        </div>
    )
}
export default UserProfileNavbar;