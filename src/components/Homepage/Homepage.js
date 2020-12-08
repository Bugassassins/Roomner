import React, { useState, useContext } from "react";
import { AuthContext } from "../../App.js";
import firebaseApp from "../../firebaseApp";
import { withRouter} from 'react-router-dom'
import HomePageNavbar from './HomePageNavbar';
import Hero from "./Hero"
import Card from "./Card"
import Footer from "./Footer"
import Footnote from "../Footnote"
import bedImg from "../../images/Homepage_assets/Graphic.png"
import step1 from "../../images/Homepage_assets/step 1.png"
import step2 from "../../images/Homepage_assets/step 2.png"
import step3 from "../../images/Homepage_assets/step 3.png"
import step4 from "../../images/Homepage_assets/step 4.png"
import "./Homepage.css"
const Homepage = (props) => {
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
    return (
        <div className="bg-grey">
        <div className="Homepage-bg">
            <HomePageNavbar handleLogin={signInWithGoogle} />
            <div className="Homepage-div">
                <img src={bedImg} className="Homepage-bed-image" alt="bedimage" />
                <span>{error}</span>
                <Hero className="Homepage-hero" handleLogin={signInWithGoogle} />   
            </div>
        </div>

        <div className="Homepage-container">
            <p className="Homepage-heading">Finding the Perfect Roommate has Never Been Easier</p>

            <div className="Homepage-cards">
                    <Card src={step1} head="Sign Up" des="Register yourself with your google account and provide some basic information about you to get started."/>
                    <Card src={step2} head="Answer" des="Answer a curated set of questions about your personality and your expectations from your roommate."/>
                    <Card src={step3} head="Connect" des="Choose form the best matches and connect with your potential roommates through facebook profiles."/> 
            </div>

            <div className="Homepage-banner">
                <div className="Homepage-banner-image">
                        <img src={step4} alt="step 4" />
                </div>
                <div className="Homepage-banner-text">
                        <h1>Keep Your Personal Information Secure</h1>
                        <p>We understand that some of the questions asked might be a little personal which people will not want to share with everyone. But don't worry we will never share your answers with anyone. Other users can only see your basic and contact information such as facebook profile and email. We care about your privacy and always work towards protecting it.</p>
                </div>
            </div>

            <button className="Homepage-btn" onClick={signInWithGoogle}>Get Started</button>
        </div>

        <div className="Homepage-footer">
            <Footer />
        </div>

        <Footnote />
        </div>
    );
};

export default withRouter(Homepage);
