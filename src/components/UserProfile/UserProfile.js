import React, { useContext,useEffect, useState } from "react";
import UserProfileNavbar from './UserProfileNavbar';
import Form from './Form';
import { AuthContext } from "../../App.js";
import firebaseApp from "../../firebaseApp";
import loadgif from "../../images/loadgif.gif"
const UserProfile=(props) => {
    const Auth = useContext(AuthContext);
    const [userArray,setUserArray]=useState([]);
    const [loading,setLoading]=useState(false);
    const handleEdit=()=>{
        Auth.setNewUser(true)
    }
    useEffect(() => {
        setLoading(true);
        const userDataRef = firebaseApp.database().ref('user/'+JSON.parse(window.sessionStorage.getItem(
            `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
            )).uid);
        userDataRef.on('value', function(userArrayRef) {
                setUserArray(userArrayRef.val()?userArrayRef.val().answer:null);
                setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    let show;
    console.log("Is it new User :" + Auth.isNewUser);
    if(!Auth.isNewUser){
        show=<div>
                <UserProfileNavbar logoutFunc={props.logoutFunc} />
                {loading?<img src={loadgif} alt="loading"/>:<h1>DashBoard</h1>}
                {   userArray?
                    userArray.map((ele,i)=>{
                        return <h1 key={i}>{ele}</h1>
                    })
                    :<h1>I told you bad things will happen. Click on Edit and fill again</h1>
                }
                <button className="Hero-cta" onClick={handleEdit}>Edit</button>
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
