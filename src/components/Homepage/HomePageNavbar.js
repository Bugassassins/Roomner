import React from 'react';
import "./HomePageNavbar.css";
import logo from "../../images/Homepage_assets/logo.png"
import { Link} from 'react-router-dom'
const HomePageNavbar=(props)=>{
    return(
        <div className="Homepage-navbar-Header">
            <Link to="/"><img className="Homepage-navbar-Logo" src={logo} alt="logo"/></Link>
            <div className="Homepage-navbar-Menu">
            <Link to="/about"><button className="Homepage-navbar-About">About</button></Link>
            <button className="Homepage-navbar-Login" onClick={props.handleLogin}>Login</button>
            </div>
        </div>
    )
}
export default HomePageNavbar;