import React, { useContext,useEffect, useState } from "react";
import UserProfileNavbar from './UserProfileNavbar';
import PersonalInfoForm from './PersonalInfoForm';
import { AuthContext } from "../../App.js";
import firebaseApp from "../../firebaseApp";
import loadgif from "../../images/loadgif.gif";
import axios from "axios";
import "./UserProfile.css";

const UserProfile=(props) => {
    const Auth = useContext(AuthContext);
    const [userObject,setUserObject]=useState({});
    const [loading,setLoading]=useState(false);
    const [loading2,setLoading2]=useState(false);
    const [userRecommendationArray,setUserRecommendationArray]=useState(null);
    const userUID=JSON.parse(window.sessionStorage.getItem(
        `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
        )).uid;
    const handleEdit=()=>{
        Auth.setNewUser(true)
    }
    const handlePing=()=>{
        var updates = {};
        setLoading2(true);
        updates['user/'+userUID+'/recommend']=1;
        firebaseApp.database().ref().update(updates)
        .then((responseF)=>{
            axios.get('https://roomnerapi.herokuapp.com/'+userUID)
            .then((response)=>{
                setLoading2(false);
                if(response.data.length===0||response.data==="RoomnerAPI : Error11"||response.data==="RoomnerAPI : Error12"||response.data==="RoomnerAPI : Error13"||response.data==="RoomnerAPI : Error14"){
                    setUserRecommendationArray(null)
                }else{
                    setUserRecommendationArray(response.data)
                }
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
    const handlePingWithoutRecommend=()=>{
        setLoading2(true);
        axios.get('https://roomnerapi.herokuapp.com/'+userUID)
        .then((response)=>{
            setLoading2(false);
            if(response.data.length===0||response.data==="RoomnerAPI : Error11"||response.data==="RoomnerAPI : Error12"||response.data==="RoomnerAPI : Error13"||response.data==="RoomnerAPI : Error14"){
                setUserRecommendationArray(null)
            }else{
                setUserRecommendationArray(response.data)
            }
            console.log(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    const handlePingEnd=()=>{
        var updates = {};
        setLoading2(true);
        updates['user/'+userUID+'/recommend']=0;
        firebaseApp.database().ref().update(updates)
        .then((response)=>{
            axios.get('https://roomnerapi.herokuapp.com/end/'+userUID)
            .then((response)=>{
                setLoading2(false);
                setUserRecommendationArray(null)
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
        firebaseApp.database().ref('user/'+userUID).once('value')
        .then((userObjRef)=>{
            setUserObject(userObjRef.val()?userObjRef.val().userPersonalInfoObj:{});
            setLoading(false);
        })
        handlePingWithoutRecommend();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[Auth.isNewUser])
    let show;
    // if(0) {
    if(!Auth.isNewUser){
        show = <div className="Userpage-container">
                <UserProfileNavbar logoutFunc={props.logoutFunc}/>
                {/* <h1>DashBoard</h1> */}
                <div className="Profile">
                {   
                    loading?
                        <img src={loadgif} alt="loading"/>
                    :
                        userObject?
                            <div>
                                <img src={userObject.img} height="200" alt="UserImg" />
                                <h1 className="Profile-name">{userObject.name}</h1>
                                <div className="Profile-bio">
                                    <h4>BIO</h4>
                                    <p>{userObject.bio}</p>
                                </div>
                                <div className="Profile-text">
                                    <span>AGE </span>{userObject.age} years
                                </div>
                                <div className="Profile-text">
                                    <span>GENDER </span>{userObject.gender==="1"?"Female":"Male"}
                                </div>
                                <div className="Profile-text">
                                    <span>EMAIL </span>{userObject.email}
                                </div>
                                <div>
                                    <span>FACEBOOK </span>{userObject.fb}
                                </div>
                            </div>
                        :
                            <h1>Your Data was not stored correctly, Edit again</h1>
                }
                    <div>
                        {/* This button will edit your info. and update your array */}
                        <button className="Profile-btn" onClick={handleEdit}>Edit Profile</button>
                        <br />
                        {/* To reverse Dont Recommend OR To recalculate Scores Array. First Ping after Registration or edit is done automatically */}
                        <button className="Profile-btn" onClick={handlePing}>Find Matches</button>
                        <br />
                        {/* To Negate the occurance of your score in everyone array */}
                        <button className="Profile-btn" onClick={handlePingEnd}>Dont Recommend me anymore</button>
                        <br />
                    </div>
                </div>
                <div className="Recommendations">
                {
                    loading2?
                        <img className="loading-gif-2" src={loadgif} alt="loading2" height="70" width="70"/>
                    :
                        userRecommendationArray?
                            userRecommendationArray.map(([roomatePersonalObj,score],i)=>{
                                return(
                                    <div id={i} key={i} className="Recommendations-Card">
                                        <img src={roomatePersonalObj.img} height="200" alt="RoomieImg" />
                                        <p>PERCENT:{Math.round(score*100)}%</p>
                                        <p>NAME:{roomatePersonalObj.name}</p>
                                        <p>AGE:{roomatePersonalObj.age}</p>
                                        <p>GENDER:{roomatePersonalObj.gender==="1"?"Female":"Male"}</p>
                                        <p>SHORT BIO:{roomatePersonalObj.bio}</p>
                                        <p>EMAIL:{roomatePersonalObj.email}</p>
                                        <p>FACEBOOK: {roomatePersonalObj.fb}</p>
                                    </div>
                                )
                            })
                        :
                            <p>Sorry no POSITIVE matches found, Press Ping API again</p>
                }
                </div>
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
