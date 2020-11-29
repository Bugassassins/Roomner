import React, { useState,useContext } from "react";
import firebaseApp from "../../firebaseApp"
import { AuthContext } from "../../App.js";
import TextArea from "./text-area";
import Questions from "./Questions";
import {Info, Quest, Options} from "./QuesArray";
import Logo from "../../images/Homepage_assets/logo.png";
import Visible from "../../images/Form_assests/visible.svg";
import Hidden from "../../images/Form_assests/hidden.svg";
import Start from "../../images/Form_assests/start.png";
import Tea from "../../images/Form_assests/tea.png";
import "./PersonalInfoForm.css";

const PersonalInfoForm=(props) => {
    const userSessionData=JSON.parse(window.sessionStorage.getItem(
        `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
    ))
    const [result,setResult]=useState(Array.from({length: 16},()=> Array.from({length: 3}, () => 0)));
    const [curQuest,setCurQuest]=useState(-2);
    const [userPersonalInfo,setUserPersonalInfo]=useState({email:userSessionData.email});
    
    const Auth = useContext(AuthContext);
    const handleFormChange=(keyName,value)=>{
        setUserPersonalInfo((prev)=>{
            return {...prev,[keyName]:value};
        })
    }
    const handleGetStarted=(()=>{
        setCurQuest(-1);
    })
    const handleAnswerQuestion = (() => {
        setCurQuest(0);
    })
    const onButtonChange=(id,value,ind)=>{
        value=parseInt(value);
        console.log(value,id,ind);
        let temp=result;
        temp[id][ind]=value;
        setResult(
            temp
        );
    }
    const writeUserData=(e)=>{
        e.preventDefault();
        firebaseApp.database().ref('user/'+userSessionData.uid).set({
            userPersonalInfoObj:userPersonalInfo,
            answerArray:result,
            recommend:1
        }).then(response=>{
            Auth.setNewUser(false);
        }).catch(err=>{
            alert(err);
        })
    }
    let form;
    if(curQuest===-2){
        form = <div className="form-container">
                <div className="form-image-conatiner">
                    <img src={Start} alt="Get Started" className="form-image" />
                </div>
                <div className="form-body">
                    <h1 className="form-title">Lets get you started</h1>
                    <p>Don't refresh page It will lead to bad things</p>
                    <p>Don't Submit Empty also. It will lead to bad things</p>
                        {Info.map((ele,i)=>{
                            if(ele[1]==="gender"){
                                return (<div id={i} key={i} onChange={(event)=>{
                                    handleFormChange(ele[1],event.target.value)
                                }}>
                                    <h1 className="form-name">{ele[0]}</h1>
                                    <div className="form-radio-container">
                                        <input type="radio" id="male" value={0} name="gender" />
                                        <label htmlFor="male" className="form-radio">Male</label>
                                        <input type="radio" id="female" value={1} name="gender" />
                                        <label htmlFor="female" className="form-radio">Female</label>
                                    </div>
                                </div>)
                            }else{
                                return(<TextArea key={i} question={ele} changeAnswer={handleFormChange} id={i}></TextArea>)
                            }
                        })}
                    <p className="form-visiblity">
                        <img src={Visible} alt="..." /> This info will be visible to others
                    </p>
                    <button type="button" className="Homepage-btn" onClick={handleGetStarted}>Next</button>
                </div>
                </div>
    }
    else if(curQuest===-1) {
        form = <div className="form-container">
                <div className="form-image-container">
                    <img src={Tea} alt="About Yourself" className="form-image-tea" />
                </div>
                <div className="form-body">
                    <h1 className="form-title">Tell us About Yourself</h1>
                    <div className="form-text">
                        In order to find people that compliment your personality we need you to answer some questions. Also tell us what answer you expect from your ideal roommate and how important is the specfic question for you in finding the correct roommate. 
                    </div>
                    <p className="form-visiblity">
                        <img src={Hidden} alt="..." /> Others will not be able to see this info untill you allow them to
                    </p>
                    <button type="button" className="Homepage-btn" onClick={handleAnswerQuestion}>Next</button>
                </div>
                </div>
    }
    else{
        let button;
        if(curQuest===Quest.length-1){
            button=<button type="button" className="Homepage-btn" onClick={(e)=>writeUserData(e)}>Submit</button>
        }
        else{
            button=<button type="button" className="Homepage-btn" onClick={()=>setCurQuest(curQuest+1)}>Next</button>
        }
        form=  <div className="form-container"> 
                <div className="form-image-hide">
                    <img src={Start} alt="Get Started" className="form-image" />
                </div>
                <div className="form-body">
                <Questions key={curQuest} response={result[curQuest]} question={Quest[curQuest]} options={Options[curQuest]} onButtonChange={onButtonChange} id={curQuest}></Questions>
                <button type="button" className="Homepage-btn" onClick={()=>setCurQuest(curQuest-1)}>Back</button>
                
                {button}
                </div>
               </div> 
    }
    return (
        <div className="form-bg">
            <div className="form-header">
                <img className="Homepage-navbar-Logo" src={Logo} alt="logo" />
            </div>
            {form}
        </div>
    )
}
export default PersonalInfoForm;

// 