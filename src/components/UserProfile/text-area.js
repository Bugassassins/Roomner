import React from "react";

const TextArea=(props) => {
    return (
        <div className="form-group">
                <h1>{props.question}</h1>
                <input type="text" 
                className="form-control"
                onChange={e=>props.changeAnswer(props.id,e.target.value)}
                />
            </div>
    )
}
export default TextArea