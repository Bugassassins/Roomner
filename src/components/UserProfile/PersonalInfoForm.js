import React, { useState,useContext } from "react";
import firebaseApp from "../../firebaseApp"
import { AuthContext } from "../../App.js";
import TextArea from "./text-area";
import Questions from "./Questions";
import {Info, Quest, Options} from "./QuesArray";
import UserProfileNavbar from "./UserProfileNavbar";

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
        if(ind===2)
            value=(result[id][ind]?0:1);
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
                    <button type="button" className="Hero-cta" onClick={handleAnswerQuestion}>Answer Questions</button>
                </div>
    }
    else{
        let button;
        if(curQuest===Quest.length-1){
            button=<button type="button" className="Hero-cta" onClick={(e)=>writeUserData(e)}>submit</button>
        }
        else{
            button=<button type="button" className="Hero-cta" onClick={()=>setCurQuest(curQuest+1)}>next</button>
        }
        form=   <div>
                <Questions key={curQuest} question={Quest[curQuest]} options={Options[curQuest]} onButtonChange={onButtonChange} id={curQuest}></Questions>
                {button}
                </div>
    }
    return (
        <div>
            <UserProfileNavbar />
            {form}
        </div>
    )
}
export default PersonalInfoForm;

// 