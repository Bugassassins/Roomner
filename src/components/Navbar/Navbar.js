import React, { useContext } from "react";
import { AuthContext } from "../../App";

const Navbar = (props) => {
    const {isLoggedIn} = useContext(AuthContext);
    return (
        <ul className="nav">
            {  isLoggedIn?(
                    <li>
                        <p>THIS IS THE LOGGED IN NAVBAR</p>
                        <button onClick={props.logoutFunc}>LOG OUT</button>
                    </li>
                ):<p>THIS IS THE LOGGED OUT NAVBAR</p>
            }
        </ul>
    )
}


export default Navbar;
