import React, { useContext,useEffect, useState } from "react";
import UserProfileNavbar from './UserProfileNavbar';
import PersonalInfoForm from './PersonalInfoForm';
import { AuthContext } from "../../App.js";
import firebaseApp from "../../firebaseApp";
import loadgif from "../../images/loadgif.gif"
const UserProfile=(props) => {
    const Auth = useContext(AuthContext);
    const [userObject,setUserObject]=useState({});
    const [loading,setLoading]=useState(false);
    const handleEdit=()=>{
        Auth.setNewUser(true)
    }
    useEffect(() => {
        setLoading(true);
        const userDataRef = firebaseApp.database().ref('user/'+JSON.parse(window.sessionStorage.getItem(
            `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
            )).uid);
        userDataRef.on('value', function(userObjRef) {
                setUserObject(userObjRef.val()?userObjRef.val().userPersonalInfoObj:{});
                setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    let show;
    if(!Auth.isNewUser){
        show = <div className="Homepage-bg">
                <UserProfileNavbar logoutFunc={props.logoutFunc} />
                {loading?<img src={loadgif} alt="loading"/>:<h1>DashBoard</h1>}
                {   userObject?
                    <div>
                        <p>NAME:{userObject.name}</p>
                        <p>AGE:{userObject.age}</p>
                        <p>GENDER:{userObject.gender==="1"?"Female":"Male"}</p>
                        <p>SHORT BIO:{userObject.shortBio}</p>
                        <p>EMAIL:{userObject.email}</p>
                        <img src={userObject.image} alt="UserImg" />
                    </div>
                    :<h1>I told you bad things will happen. Click on Edit and fill again</h1>
                }
                <button className="Hero-cta" onClick={handleEdit}>Edit</button>
            </div>
    }
    else
    {
        show=<div>
                <PersonalInfoForm logoutFunc={props.logoutFunc}></PersonalInfoForm>
            </div>
    }
    return (
    <div>
        {show}
    </div>
    )
}
export default UserProfile;
