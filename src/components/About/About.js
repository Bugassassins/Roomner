import React, { useState, useContext } from "react";
import { withRouter} from 'react-router-dom'
import { AuthContext } from "../../App.js";
import firebaseApp from "../../firebaseApp";
import HomePageNavbar from '../Homepage/HomePageNavbar';
import "./About.css";
import Utkarsh from "../../images/Homepage_assets/Utkarsh.png";
import Shridhar from "../../images/Homepage_assets/Shridhar.png";
import Vidit from "../../images/Homepage_assets/Vidit.png";
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
                    <img className="About-profile" src={Utkarsh} alt="..." />
                <div className="About-Card-body">
                    <h3>Utkarsh Kumar Singh</h3>
                    <h5>Team Leader</h5>
                    <p>  <img src={mail} width="20" alt="Email "/> singhutkarsh902@gmail.com</p>
                    <p>  <img src={github} width="20" alt="Github "/><a href="https://github.com/singhutkarsh902"> github.com/singhutkarsh902</a></p>
                </div>
                </div>
                <div className="About-Card">
                    <img src={Shridhar} className="About-profile" alt="..." />
                <div className="About-Card-body">
                        <h3>Shridhar Thakur</h3>
                    <h5>Member</h5>
                        <p>  <img src={mail} width="20" alt="Email " /> thakur.shridhar3093@gmail.com</p>
                        <p>  <img src={github} width="20" alt="Github " /><a href="https://github.com/shridhar-t"> github.com/shridhar-t</a></p>
                </div>
                </div>
                <div className="About-Card">
                    <img src={Vidit} className="About-profile" alt="..." />
                <div className="About-Card-body">
                    <h3>Vidit Chopra</h3>
                    <h5>Member</h5>
                        <p>  <img src={mail} width="20" alt="Email " /> vidit1500@gmail.com</p>
                        <p>  <img src={github} width="20" alt="Github " /><a href="https://github.com/viditchopra1500"> github.com/viditchopra1500</a></p>
                </div>
                </div>
            </div>
        </div>

        <span>{error}</span>
        <Footnote />
    </div>
}
export default withRouter(About);