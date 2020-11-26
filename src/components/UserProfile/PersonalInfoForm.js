import React, { useState,useContext } from "react";
import firebaseApp from "../../firebaseApp"
import { AuthContext } from "../../App.js";
import TextArea from "./text-area";
import Questions from "./Questions";
import {Info, Quest, Options} from "./QuesArray";
import Logo from "../../images/Homepage_assets/logo.png";
import Visible from "../../images/Form_assests/visible.svg";
import Start from "../../images/Form_assests/start.png";
import "./PersonalInfoForm.css";

const PersonalInfoForm=(props) => {
    const userSessionData=JSON.parse(window.sessionStorage.getItem(
        `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
    ))
    let [result,setResult]=useState(Array.from({length: 16},()=> Array.from({length: 3}, () => 0)));
    const [curQuest,setCurQuest]=useState(-1);
    const [userPersonalInfo,setUserPersonalInfo]=useState({email:userSessionData.email});
    
    const Auth = useContext(AuthContext);
    const handleFormChange=(keyName,value)=>{
        setUserPersonalInfo((prev)=>{
            return {...prev,[keyName]:value};
        })
    }
    const handleAnswerQuestion=(()=>{
        setCurQuest(0);
    })
    const onButtonChange=(id,value,ind)=>{
        value=parseInt(value);
        result[id][ind]=value;
        setResult(
            result
        );
    }
    const writeUserData=(e)=>{
        e.preventDefault();
        firebaseApp.database().ref('user/'+userSessionData.uid).set({
            userPersonalInfoObj:userPersonalInfo,
            answerArray:result,
            recommend:1
        }).then(response=>{
            props.handlePing();
            Auth.setNewUser(false);
        }).catch(err=>{
            alert("sorry we screwed up")
        })
    }
    let form;
    if(curQuest===-1){
        form=  <div>
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
                                        <label for="male" className="form-radio">Male</label>
                                        <input type="radio" id="female" value={1} name="gender" />
                                        <label for="female" className="form-radio">Female</label>
                                    </div>
                                </div>)
                            }else{
                                return(<TextArea key={i} question={ele} changeAnswer={handleFormChange} id={i}></TextArea>)
                            }
                        })}
                    <p className="form-visiblity">
                        <img src={Visible} alt="..." /> This info will be visible to others
                    </p>
                    <button type="button" className="Homepage-btn" onClick={handleAnswerQuestion}>Next</button>
                </div>
    }
    else{
        let button;
        if(curQuest===Quest.length-1){
            button=<button type="button" className="Homepage-btn" onClick={(e)=>writeUserData(e)}>submit</button>
        }
        else{
            button=<button type="button" className="Homepage-btn" onClick={()=>setCurQuest(curQuest+1)}>next</button>
        }
        form=   <div>
                <Questions key={curQuest} question={Quest[curQuest]} options={Options[curQuest]} onButtonChange={onButtonChange} id={curQuest}></Questions>
                {button}
                </div>
    }
    return (
        <div className="form-bg">
            <div className="form-header">
                <img className="Homepage-navbar-Logo" src={Logo} alt="logo" />
            </div>
            <div className="form-container">
                <div className="form-image-conatiner">
                    <img src={Start} alt="Get Started" className="form-image" />
                </div>
                <div className="form-body">
                    <h1 className="form-title">Lets get you started</h1>
                    {form}
                </div>
            </div>
        </div>
    )
}
export default PersonalInfoForm;

// 