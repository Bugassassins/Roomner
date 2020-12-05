import React, { useState, useContext } from "react";
import { withRouter} from 'react-router-dom'
import { AuthContext } from "../../App.js";
import firebaseApp from "../../firebaseApp";
import HomePageNavbar from '../Homepage/HomePageNavbar';
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
        <h1>About us</h1>
        <span>{error}</span>
    </div>
}
export default withRouter(About);