import React from 'react';
const UserProfileNavbar =(props)=>{
    return(
        <div>
            <h1>This User Profile Navbar</h1>
            <button onClick={props.logoutFunc}>Logout</button>
        </div>
    )
}
export default UserProfileNavbar;