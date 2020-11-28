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
        var updates = {};
        updates['user/'+JSON.parse(window.sessionStorage.getItem(
            `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
            )).uid+'/recommend']=1;
        firebaseApp.database().ref().update(updates)
        .then((response)=>{
            axios.get('https://roomnerapi.herokuapp.com/'+JSON.parse(window.sessionStorage.getItem(
                `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
                )).uid)
            .then((response)=>{
                console.log(response.data);
            })
            .catch((error)=>{
                console.log(error);
            })
        })
        .catch((error)=>{
            console.log("Error here")
        })
    }
    const handlePingEnd=()=>{
        var updates = {};
        updates['user/'+JSON.parse(window.sessionStorage.getItem(
                `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
                )).uid+'/recommend']=0;
        firebaseApp.database().ref().update(updates)
        .then((response)=>{
            axios.get('https://roomnerapi.herokuapp.com/end/'+JSON.parse(window.sessionStorage.getItem(
                `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
                )).uid)
            .then((response)=>{
                console.log(response.data);
            })
            .catch((error)=>{
                console.log(error);
            })
        })
        .catch((error)=>{
            console.log("Error here")
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
    // if(0) {
    if(!Auth.isNewUser){
        show = <div className="Homepage-bg">
                <UserProfileNavbar logoutFunc={props.logoutFunc} />
                {loading?<img src={loadgif} alt="loading"/>:<h1>DashBoard</h1>}
                {   userObject?
                    <div>
                        <p>NAME:{userObject.name}</p>
                        <p>AGE:{userObject.age}</p>
                        <p>GENDER:{userObject.gender==="1"?"Female":"Male"}</p>
                        <p>SHORT BIO:{userObject.bio}</p>
                        <p>EMAIL:{userObject.email}</p>
                        <img src={userObject.image} alt="UserImg" />
                    </div>
                    :<h1>I told you bad things will happen. Click on Edit and fill again</h1>
                }
                {/* This button will edit your info. and update your array */}
                <button className="Homepage-btn" onClick={handleEdit}>Edit</button>
                {/* To reverse Dont Recommend OR To recalculate Scores Array. First Ping after Registration or edit is done automatically */}
                <button className="Homepage-btn" onClick={handlePing}>PingAPI</button>
                {/* To Negate the occurance of your score in everyone array */}
                <button className="Homepage-btn" onClick={handlePingEnd}>Dont Recommend</button>
                {loading2?<img src={loadgif} alt="loading"/>:null}
                {
                    userRecommendation?
                        userRecommendation.map((ele,i)=><p id={i} key={i}><b>{ele[1]+" -> "+ele[0]}</b></p>)
                    :
                    <p>Press Ping API</p>
                }
            </div>
    }
    else
    {
        show=<div>
                <PersonalInfoForm logoutFunc={props.logoutFunc} handlePing={handlePing}></PersonalInfoForm>
            </div>
    }
    return (
    <div>
        {show}
    </div>
    )
}
export default UserProfile;
