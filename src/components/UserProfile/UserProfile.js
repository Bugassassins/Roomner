import React from 'react'
import UserProfileNavbar from './UserProfileNavbar';
const UserProfile=(props) => {
    console.log('This is the protected route')
    return (
    <div>
        <UserProfileNavbar logoutFunc={props.logoutFunc} />
        <h1>THIS IS PROTECTED ROUTE</h1>
        <p>Dashboard</p>
    </div>
    )
}
export default UserProfile;
