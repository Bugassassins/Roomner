import React, { useContext,useEffect, useState } from "react";
import UserProfileNavbar from './UserProfileNavbar';
import PersonalInfoForm from './PersonalInfoForm';
import { AuthContext } from "../../App.js";
import firebaseApp from "../../firebaseApp";
import loadgif from "../../images/loadgif.gif"
import axios from "axios"
const UserProfile=(props) => {
    const Auth = useContext(AuthContext);
    const [userRecommendation,setUserRecommendation]=useState(null);
    const [userObject,setUserObject]=useState({});
    const [loading,setLoading]=useState(false);
    const [loading2,setLoading2]=useState(false);
    const handleEdit=()=>{
        Auth.setNewUser(true)
    }
    const handlePing=()=>{
        axios.get('https://roomnerapi.herokuapp.com/'+JSON.parse(window.sessionStorage.getItem(
            `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
            )).uid)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    const handlePingEnd=()=>{
        axios.get('https://roomnerapi.herokuapp.com/end/'+JSON.parse(window.sessionStorage.getItem(
            `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
            )).uid)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    useEffect(() => {
        setLoading(true);
        setLoading2(true);
        const userDataRef = firebaseApp.database().ref('user/'+JSON.parse(window.sessionStorage.getItem(
            `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
            )).uid);
        userDataRef.on('value', function(userObjRef) {
                setUserObject(userObjRef.val()?userObjRef.val().userPersonalInfoObj:{});
                setLoading(false);
        });
        const recommendationRef = firebaseApp.database().ref('userScore/'+JSON.parse(window.sessionStorage.getItem(
            `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
            )).uid);
        recommendationRef.on('value', function(userScoreArrayRef) {
                setUserRecommendation(userScoreArrayRef.val()?userScoreArrayRef.val().scoresArray:null);
                setLoading2(false);
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
                <button className="Hero-cta" onClick={handlePing}>PingAPI</button>
                <button className="Hero-cta" onClick={handlePingEnd}>Dont Recommend</button>
                {loading2?<img src={loadgif} alt="loading"/>:null}
                {
                    userRecommendation?
                        userRecommendation.map((ele)=><p><b>{ele[1]+" -> "+ele[0]}</b></p>)
                    :
                    <p>Press Ping API</p>
                }
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
