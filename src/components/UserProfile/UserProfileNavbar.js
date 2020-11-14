import React from 'react';
const UserProfileNavbar =(props)=>{
    return(
        <div>
            <h1>This User Profile Navbar</h1>
            <button onClick={props.logoutFunc} className="Hero-cta">Logout</button>
        </div>
    )
}
export default UserProfileNavbar;