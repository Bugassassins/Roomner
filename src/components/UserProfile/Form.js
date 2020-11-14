import React, { useState,useContext } from "react";
import firebaseApp from "../../firebaseApp"
import { AuthContext } from "../../App.js";
import TextArea from "./text-area";
const Form=(props) => {
    let [answer, setAnswer] = useState([]);
    const Info=["Name","Email","Age","Gender","Short Bio","Home City","Home State","Stream", "Branch","Profile pic","Phone no." ,"School"];
    const Auth = useContext(AuthContext);
    const changeAnswer=(id,value)=>{
        answer[id]=value
        setAnswer(
            answer
        );
    }
    const writeUserData=(e)=>{
        e.preventDefault();
        firebaseApp.database().ref('user/'+JSON.parse(window.sessionStorage.getItem(
            `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
            )).uid).set({
            answer
          }).then(response=>{
            Auth.setNewUser(false);
          })
          .catch(err=>{
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
                    return(<TextArea key={i} question={value} changeAnswer={changeAnswer} id={i}></TextArea>)
                })}
            <button type="submit" className="Hero-cta">Submit</button>
        </form>
    </div>
    )
}
export default Form;