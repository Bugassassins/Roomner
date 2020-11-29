import React, { useContext,useEffect, useState } from "react";
import UserProfileNavbar from './UserProfileNavbar';
import PersonalInfoForm from './PersonalInfoForm';
import { AuthContext } from "../../App.js";
import firebaseApp from "../../firebaseApp";
import loadgif from "../../images/loadgif.gif"
import axios from "axios"
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
        .then((response)=>{
            axios.get('https://roomnerapi.herokuapp.com/'+userUID)
            .then((response)=>{
                setLoading2(false);
                if(response.data.length===0||response.data==="RoomnerAPI : Error11"||response.data==="RoomnerAPI : Error12"||response.data==="RoomnerAPI : Error13"||response.data==="RoomnerAPI : Error14"){
                    setUserRecommendationArray(null)
                }else{
                    setUserRecommendationArray(response.data)
                }
                // console.log(userRecommendationArray);
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
        handlePing();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[Auth.isNewUser])
    let show;
    if(0) {
    // if(!Auth.isNewUser){
        show = <div className="Homepage-bg">
                <UserProfileNavbar logoutFunc={props.logoutFunc}/>
                <h1>DashBoard</h1>
                {   
                    loading?
                        <img src={loadgif} alt="loading"/>
                    :
                        userObject?
                            <div>
                                <p>NAME:{userObject.name}</p>
                                <p>AGE:{userObject.age}</p>
                                <p>GENDER:{userObject.gender==="1"?"Female":"Male"}</p>
                                <p>SHORT BIO:{userObject.bio}</p>
                                <p>EMAIL:{userObject.email}</p>
                                <p>PHONE: {userObject.phone}</p>
                                <img src={userObject.image} alt="UserImg" />
                            </div>
                        :
                            <h1>Your Data was not stored correctly, Edit again</h1>
                }
                <div>
                    {/* This button will edit your info. and update your array */}
                    <button className="Homepage-btn" onClick={handleEdit}>Edit</button>
                    {/* To reverse Dont Recommend OR To recalculate Scores Array. First Ping after Registration or edit is done automatically */}
                    <button className="Homepage-btn" onClick={handlePing}>PingAPI</button>
                    {/* To Negate the occurance of your score in everyone array */}
                    <button className="Homepage-btn" onClick={handlePingEnd}>Dont Recommend</button>
                </div>
                <div>
                {
                    loading2?
                        <img src={loadgif} alt="loading2"/>
                    :
                        userRecommendationArray?
                            userRecommendationArray.map(([roomatePersonalObj,score],i)=>{
                                return(
                                    <div id={i} key={i}>
                                        <p>PERCENT:{Math.round(score*100)}%</p>
                                        <p>NAME:{roomatePersonalObj.name}</p>
                                        <p>AGE:{roomatePersonalObj.age}</p>
                                        <p>GENDER:{roomatePersonalObj.gender==="1"?"Female":"Male"}</p>
                                        <p>SHORT BIO:{roomatePersonalObj.bio}</p>
                                        <p>EMAIL:{roomatePersonalObj.email}</p>
                                        <p>PHONE: {roomatePersonalObj.phone}</p>
                                        <img src={roomatePersonalObj.image} alt="RoomieImg" />
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
