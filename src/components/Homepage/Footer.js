import React from 'react';
import "./Footer.css";
import Logo from "../../images/Homepage_assets/logo.png"
import Call from "../../images/Homepage_assets/call.png"
import Email from "../../images/Homepage_assets/email.png"

const Footer = () => {
    return(
        <div className="Footer-container">
            <div className="Footer-logo">
                <img src={Logo} alt="logo" />
            </div>
            
            <div className="Footer-links">
                <div className="Footer-links-group">
                    <h3>Get Started</h3>
                    <p>Sign Up</p>
                    <p>Login</p>
                </div>
                <div className="Footer-links-group">
                    <h3>Help</h3>
                    <p>About Us</p>
                    <p>Queries/Feedback</p>
                </div>
            </div>
            <div className="Footer-contact">
                <h3>Contact</h3>
                <p><img src={Call} alt="Phone:"/> +91-0123-456-789</p>
                <p><img src={Email} alt="Email:"/> example@yourmail.com</p>
            </div>
        </div>
    )
}

export default Footer;