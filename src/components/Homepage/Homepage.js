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
                    <Card src={step1} head="Sign Up" des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et urna a libero iaculis ultricies. Quisque vitae tempor metus. Curabitur."/>
                    <Card src={step2} head="Answer" des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et urna a libero iaculis ultricies. Quisque vitae tempor metus. Curabitur."/>
                    <Card src={step3} head="Connect" des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et urna a libero iaculis ultricies. Quisque vitae tempor metus. Curabitur."/> 
            </div>

            <div className="Homepage-banner">
                <div className="Homepage-banner-image">
                        <img src={step4} alt="step 4" />
                </div>
                <div className="Homepage-banner-text">
                        <h1>Keep Your Personal Information Secure</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu nulla mauris. Mauris sit amet arcu eleifend, tincidunt risus sit amet, rhoncus lectus. Fusce feugiat consectetur interdum. Aenean semper congue nulla in sollicitudin. Morbi a urna semper, venenatis erat at, condimentum elit. Phasellus vestibulum commodo tempor. Vestibulum ultricies volutpat lorem, et euismod mi pharetra sed.</p>
                </div>
            </div>

            <button className="Homepage-btn">Get Started</button>
        </div>

        <div className="Homepage-footer">
            <Footer />
        </div>

        <Footnote />
        </div>
    );
};

export default withRouter(Homepage);
