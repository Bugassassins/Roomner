import React from "react";

const Questions=(props) => {
    return (
        <div className="form-group">
                <h1>{props.question}</h1>
                {props.options.map((element,i) => {
                    return (<div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name={props.id} id={i} onChange={e=>props.onButtonChange(props.id,e.target.value)}/>
                                <label class="form-check-label">{element}</label>
                            </div>);
                    })}
        </div>
    )
}
export default Questions