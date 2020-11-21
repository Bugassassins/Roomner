import React, { useState,useContext } from "react";
import firebaseApp from "../../firebaseApp"
import { AuthContext } from "../../App.js";
import TextArea from "./text-area";
import Questions from "./Questions";

const PersonalInfoForm=(props) => {
    const userSessionData=JSON.parse(window.sessionStorage.getItem(
        `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
    ))
    let [result,setResult]=useState(Array.from({length: 20},()=> Array.from({length: 3}, () => 0)));
    const [curQuest,setCurQuest]=useState(-1);
    const [userPersonalInfo,setUserPersonalInfo]=useState({email:userSessionData.email});
    const Info=["name","age","image","gender","shortBio","phone"];
    const Quest=["abc","def","ghi","jkl","mno","pqr","stu","vwx","yza"];
    const Options=[["1","2","3","4"],["1","2","3","4"],["1","2","3","4"],["1","2","3","4"],["1","2","3","4"],["1","2","3","4"],["1","2","3","4"],["1","2","3","4"],["1","2","3","4"]];
    const Auth = useContext(AuthContext);
    const handleFormChange=(keyName,value)=>{
        setUserPersonalInfo((prev)=>{
            return {...prev,[keyName]:value};
        })
    }
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
            answerArray:result

        }).then(response=>{
            if(curQuest===-1)
                setCurQuest(0);
            else
                Auth.setNewUser(false);
        }).catch(err=>{
            alert("sorry we screwed up")
        })
    }
    let form;
    if(curQuest===-1){
        form=  <form onSubmit={writeUserData}>
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
        {form}
        </div>
    )
}
export default PersonalInfoForm;

// 