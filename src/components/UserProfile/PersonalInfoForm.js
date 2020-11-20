import React, { useState,useContext } from "react";
import firebaseApp from "../../firebaseApp"
import { AuthContext } from "../../App.js";
import TextArea from "./text-area";
const PersonalInfoForm=(props) => {
    const userSessionData=JSON.parse(window.sessionStorage.getItem(
        `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
    ))
    const [userPersonalInfo,setUserPersonalInfo]=useState({email:userSessionData.email});
    const Info=["name","age","image","gender","shortBio","phone"];
    const Auth = useContext(AuthContext);
    const handleFormChange=(keyName,value)=>{
        setUserPersonalInfo((prev)=>{
            return {...prev,[keyName]:value};
        })
    }
    const writeUserData=(e)=>{
        e.preventDefault();
        firebaseApp.database().ref('user/'+userSessionData.uid).set({
            userPersonalInfoObj:userPersonalInfo
        }).then(response=>{
            Auth.setNewUser(false);
        }).catch(err=>{
            alert("sorry we screwed up")
        })
    }
    return (
    <div>
        <form onSubmit={writeUserData}>
            <button onClick={props.logoutFunc} className="Hero-cta">Logout</button>
            <h1>Don't refresh page It will lead to bad things</h1>
            <h1>Don't Submit Empty also. It will lead to bad things</h1>
                {Info.map((value,i)=>{
                    if(value==="gender"){
                        return (<div id={i} key={i} onChange={(event)=>{
                            handleFormChange(value,event.target.value)
                        }}>
                            <h1>{value}</h1>
                            <input type="radio" value={0} name="gender"/> Male
                            <input type="radio" value={1} name="gender"/> Female
                        </div>)
                    }else{
                        return(<TextArea key={i} question={value} changeAnswer={handleFormChange} id={i}></TextArea>)
                    }
                })}
            <button type="submit" className="Hero-cta">Submit</button>
        </form>
    </div>
    )
}
export default PersonalInfoForm;