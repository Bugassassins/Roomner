import React, { useState,useContext } from "react";
import firebaseApp from "../../firebaseApp"
import { AuthContext } from "../../App.js";
import TextArea from "./text-area";
import Questions from "./Questions";
const Form=(props) => {
    let [answer, setAnswer] = useState([]);
    let [result,setResult]=useState([]);
    const Info=["Name","Email","Age","Gender","Short Bio","Home City","Home State","Stream", "Branch","Profile pic","Phone no." ,"School"];
    const Quest=["abc","def","ghi","jkl","mno","pqr","stu","vwx","yza"];
    const Options=[["1","2","3","4"],["1","2","3","4"],["1","2","3","4"],["1","2","3","4"],["1","2","3","4"],["1","2","3","4"],["1","2","3","4"],["1","2","3","4"],["1","2","3","4"]];
    const Importance=["0","25","50","100"];
    const Auth = useContext(AuthContext);
    const changeAnswer=(id,value)=>{
        answer[id]=value
        setAnswer(
            answer
        );
    }
    const onButtonChange=(id,value)=>{
        result[id]=value;
        setResult(
            result
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
                {Quest.map((value,i)=>{
                    return(<Questions key={i} question={value} options={Options[i]} imp={Importance[i]} onButtonChange={onButtonChange} id={i}></Questions>)
                })}
            <button type="submit" className="Hero-cta">Submit</button>
        </form>
    </div>
    )
}
export default Form;