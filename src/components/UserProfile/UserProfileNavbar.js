import React from 'react';
import Logo from "../../images/Homepage_assets/logo.png";

const UserProfileNavbar =(props)=>{
    return(
        <div className="Userpage-navbar">
            <img src={Logo} alt="logo" />
            <span onClick={props.logoutFunc} className="Navbar-logout">Logout</span>
        </div>
    )
}
export default UserProfileNavbar;