import React from "react";

const TextArea=(props) => {
    return (
        <div class="form-group">
                <label>{props.question}</label>
                <input type="text" 
                class="form-control"
                onChange={e=>props.changeAnswer(props.id,e.target.value)}
                />
            </div>
    )
}
export default TextArea