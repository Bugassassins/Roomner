import React, { useState,useContext } from "react";
import Firebase from "firebase"
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
        Firebase.database().ref('user/'+Auth.User.additionalUserInfo.profile.id).set({
            answer
          }).then(response=>{
            window.location.reload();
          })
          .catch(err=>{
              alert("sorry we screwed up")
          })
    }
    return (
    <div>
        <form onSubmit={writeUserData}>
            <button onClick={props.logoutFunc}>Logout</button>
                {Info.map((value,i)=>{
                    return(<TextArea question={value} changeAnswer={changeAnswer} id={i}></TextArea>)
                })}
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
    )
}
export default Form;