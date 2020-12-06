import React, { useState } from 'react';
import Background from "../../images/card-bg.png";
import Google from "../../images/Google.png";
import Facebook from "../../images/Facebook.png";
import cancel from "../../images/cancel.png";

const ProfileCard = (props) => {
    const userRecommendationArray = props.userRecommendationArray;
    const [selected, setSelected] = useState(-1);

    const cardExpand = (i) => {
        setSelected(i);
    }

    const cardShrink = () => {
        setSelected(-1);
    }

    let show;
    if(selected === -1) {
        show = 
            userRecommendationArray.map(([roomatePersonalObj, score], i) => {
                return (
                    <div id={i} key={i} className="Recommendations-Card" onClick={() => cardExpand(i)} style={{ backgroundImage: `url(${Background})`}}>
                        <img src={roomatePersonalObj.img} height="200" alt="RoomieImg" />
                        <p className="Recommendations-name">{roomatePersonalObj.name}</p>
                        <div className="Recommendations-footer">
                            <p className="Recommendations-score">{Math.round(score * 100)}%</p>
                        </div>
                    </div>
                )
            })
    }
    else {
        const [roomatePersonalObj, score] = userRecommendationArray[selected];
        show = 
            <div className="Card-Expand">
                <div className="Card-left">
                <img src={roomatePersonalObj.img} height="200" alt="RoomieImg" />
                <h3>{Math.round(score * 100)}% Match</h3>
                </div>
                <div className="Card-right">
                <div className="Card-back">
                    <img src={cancel} alt="back" onClick={cardShrink}/>
                </div>
                <div className="Card-body">
                    <h1>{roomatePersonalObj.name}</h1>
                    <p><span>AGE </span>{roomatePersonalObj.age} years</p>
                    <p><span>GENDER </span>{roomatePersonalObj.gender === "1" ? "Female" : "Male"}</p>
                    <p><span>BIO</span>
                        <br />{roomatePersonalObj.bio}
                    </p>
                    <p><span>EMAIL </span>{roomatePersonalObj.email}
                    </p>
                    <div className="Card-buttons">
                        <a href={`mailto:${roomatePersonalObj.email}`} target="_blank" rel="noopener noreferrer">
                            <img src={Google} alt="Google" />
                        </a>
                        <a href={roomatePersonalObj.fb} target="_blank" rel="noopener noreferrer">
                            <img src={Facebook} alt="Facebook" />
                        </a>
                    </div>
                </div>
                </div>
            </div>
    }

    return(
        <>
            {show}
        </>
    )
}

export default ProfileCard;