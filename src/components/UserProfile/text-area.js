import React from "react";

const TextArea=(props) => {
    return (
        <div className="form-group">
                <h1 className="form-name">{props.question[0]}</h1>
                <input type="text" 
                className="form-control"
                onChange={e=>props.changeAnswer(props.question[1],e.target.value)}
                />
            </div>
    )
}
export default TextArea