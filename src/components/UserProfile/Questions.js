import React from "react";
import "./Questions.css";

const Questions=(props) => {
    return (
        <div className="form-group">
                <h1 className="form-title">{props.question}</h1>
                <h1 className="form-name">Your Answer</h1>
                <div className="form-options">
                {props.options.map((element,i) => {
                    return (
                        <div className="form-check">
                            <label className="form-check-label">{element}</label>
                            <input className="form-check-input" type="radio" name={props.id + 0} key={i} value={i} onChange={e => props.onButtonChange(props.id, e.target.value, 0)} />
                        </div>);
                    })}
                </div>
                    <br />
                    <h1 className="form-name">Your ideal roommate would say</h1>
                    <div className="form-options">
                    {props.options.map((element,i) => {
                    return (
                            <div className="form-check">
                                <label className="form-check-label">{element}</label>
                                <input className="form-check-input" type="radio" name={props.id+1} key={i} value={i} onChange={e=>props.onButtonChange(props.id,e.target.value,1)}/>
                            </div>);
                    })}
                    </div>
                    <br />
                    <h1 className="form-name">Importance</h1>
                    <div className="form-importance">
                        <input id="importance1" type="radio" name={props.id + 2} key={0} value={25} onChange={e => props.onButtonChange(props.id, e.target.value, 2)} />
                        <label htmlFor="importance1" >A little</label>

                        <input id="importance2" type="radio" name={props.id + 2} key={1} value={50} onChange={e => props.onButtonChange(props.id, e.target.value, 2)} />
                        <label htmlFor="importance2" >Somewhat</label>
                        
                        <input id="importance3" type="radio" name={props.id + 2} key={2} value={75} onChange={e => props.onButtonChange(props.id, e.target.value, 2)} />
                        <label htmlFor="importance3" >Very</label>
                    </div>
        </div>
    )
}
export default Questions
