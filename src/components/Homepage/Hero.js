import React from "react";
import "./Hero.css"
const Hero =(props)=>{
    return(
        <div className={props.className}>
            <h1 className="Hero-heading">Find Your Ideal Room Partner</h1>
            <p className="Hero-para">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In risus tellus, interdum ac arcu vel, porttitor eleifend odio.</p>
            <button onClick={props.handleLogin} className="Hero-cta">Get Started</button>
        </div>
    )
}
export default Hero;