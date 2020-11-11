import React, { useContext } from "react";
import UserProfileNavbar from './UserProfileNavbar';
import Form from './Form';
import { AuthContext } from "../../App.js";
const UserProfile=(props) => {
    const Auth = useContext(AuthContext);
    console.log('This is the protected route')
    let show;
    console.log(Auth.isNewUser);
    if(!Auth.isNewUser){
        show=<div>
                <UserProfileNavbar logoutFunc={props.logoutFunc} />
                <h1>THIS IS PROTECTED ROUTE</h1>
                <p>Dashboard</p>
            </div>
    }
    else
    {
        show=<div>
                <Form logoutFunc={props.logoutFunc}></Form>
            </div>
    }
    return (
    <div>
        {show}
    </div>
    )
}
export default UserProfile;
