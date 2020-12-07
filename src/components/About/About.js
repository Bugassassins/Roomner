import React, { useState, useContext } from "react";
import { withRouter} from 'react-router-dom'
import { AuthContext } from "../../App.js";
import firebaseApp from "../../firebaseApp";
import HomePageNavbar from '../Homepage/HomePageNavbar';
import "./About.css";
import { DefaultProfile } from "../../images/DefaultProfile";
import github from "../../images/Homepage_assets/github.png";
import mail from "../../images/Homepage_assets/email.png";
import Footnote from "../Footnote";

const About = (props) => {
    const [error, setErrors] = useState("");
    const Auth = useContext(AuthContext);
    const signInWithGoogle = () => {
        const provider = new firebaseApp.auth.GoogleAuthProvider();
        firebaseApp
        .auth()
        .setPersistence(firebaseApp.auth.Auth.Persistence.SESSION)
        .then(() => { 
                firebaseApp
                .auth()
                .signInWithPopup(provider)
                .then(result => {
                    if(result.additionalUserInfo.isNewUser)
                        Auth.setNewUser(true);
                    else
                        Auth.setNewUser(false);
                    Auth.setLoggedIn(true);
                    props.history.push('/user')
                })
                .catch(e => setErrors(e.message))
        })
    }
    return <div>
            <HomePageNavbar handleLogin={signInWithGoogle} />

        <div className="About-container">
            <div className="About-heading">
            <h1 className="Homepage-heading">Meet Our Team</h1>
            </div>

            <div className="About-Cards">
                <div className="About-Card">
                    <img className="About-profile" src={DefaultProfile} alt="..." />
                <div className="About-Card-body">
                    <h3>Utkarsh Kumar Singh</h3>
                    <h5>Team Leader</h5>
                    <p>  <img src={mail} width="20" alt="Email "/> singhutkarsh902@gmail.com</p>
                    <p>  <img src={github} width="20" alt="Github "/><a href="https://github.com/ShubhamBara"> github.com/ShubhamBara</a></p>
                </div>
                </div>
                <div className="About-Card">
                    <img src={DefaultProfile} className="About-profile" alt="..." />
                <div className="About-Card-body">
                    <h3>Shubham Bara</h3>
                    <h5>Team Leader</h5>
                    <p>  <img src={mail} width="20" alt="Email "/> shubhambaraofficial@gmail.com</p>
                    <p>  <img src={github} width="20" alt="Github "/><a href="https://github.com/ShubhamBara"> github.com/ShubhamBara</a></p>
                </div>
                </div>
                <div className="About-Card">
                    <img src={DefaultProfile} className="About-profile" alt="..." />
                <div className="About-Card-body">
                    <h3>Shubham Bara</h3>
                    <h5>Team Leader</h5>
                    <p>  <img src={mail} width="20" alt="Email "/> shubhambaraofficial@gmail.com</p>
                    <p>  <img src={github} width="20" alt="Github "/><a href="https://github.com/ShubhamBara"> github.com/ShubhamBara</a></p>
                </div>
                </div>
            </div>
        </div>

        <span>{error}</span>
        <Footnote />
    </div>
}
export default withRouter(About);