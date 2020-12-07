import React from "react";
import "./Hero.css"
const Hero =(props)=>{
    return(
        <div className={props.className}>
            <h1 className="Hero-heading">Find Your Ideal Room Partner</h1>
            <p className="Hero-para">
                Roomner helps you to find the ideal Room Partner for you based on your personality. Just signup and answer some queries and we will find the ideal matches for you. After all, a good roommate complimenting your personality often leads to a lifelong storehouse of fond memories.<br /><br />
                You will need to use your Google Account to sign up.
            </p>
            <button onClick={props.handleLogin} className="Hero-cta">Get Started</button>
        </div>
    )
}
export default Hero;