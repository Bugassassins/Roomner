import React, { useState, useContext } from "react";
import { AuthContext } from "../../App.js";
import firebaseApp from "../../firebaseApp";
import { withRouter} from 'react-router-dom'
import HomePageNavbar from './HomePageNavbar';
import Hero from "./Hero"
import bedImg from "../../images/Homepage_assets/Graphic.png"
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
                console.log(result)
                Auth.setLoggedIn(true)
                props.history.push('/user')
                })
                .catch(e => setErrors(e.message))
        })
    }
    return (
        <div>
            <HomePageNavbar handleLogin={signInWithGoogle} />
            <div className="Homepage-div">
                <img src={bedImg} className="Homepage-bed-image" alt="bedimage" />
                <Hero className="Homepage-hero" handleLogin={signInWithGoogle}/>
                <span>{error}</span>
            </div>
        </div>
    );
};

export default withRouter(Homepage);
