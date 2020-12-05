import React from 'react';
import Logo from "../../images/Homepage_assets/logo.png";

const UserProfileNavbar =(props)=>{
    return(
        <div className="Userpage-navbar">
            <img src={Logo} alt="logo" />
            <button onClick={props.logoutFunc}>Logout</button>
        </div>
    )
}
export default UserProfileNavbar;