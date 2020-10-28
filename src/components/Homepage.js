import React, { useState, useContext } from "react";
import { AuthContext } from "../App.js";
import  firebase  from 'firebase/app';
import 'firebase/auth'
import { withRouter} from 'react-router-dom'

const Homepage = ({history}) => {
    const [error, setErrors] = useState("");
    const Auth = useContext(AuthContext);
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => { 
                firebase
                .auth()
                .signInWithPopup(provider)
                .then(result => {
                console.log(result)
                history.push('/user')
                Auth.setLoggedIn(true)
                })
                .catch(e => setErrors(e.message))
        })
    }
    return (
        <div>
            <h1>THIS IS HOMEPAGE</h1>
            <button onClick={() =>{signInWithGoogle()} } className="googleBtn" type="button">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="logo"
                />
                Login With Google
            </button>
            <span>{error}</span>
        </div>
    );
};

export default withRouter(Homepage);
