import React from "react";

const Questions=(props) => {
    return (
        <div className="form-group">
                <h1>{props.question}</h1>
                {props.options.map((element,i) => {
                    return (
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name={props.id} key={i} value={i} onChange={e=>props.onButtonChange(props.id,e.target.value,0)}/>
                                <label className="form-check-label">{element}</label>
                            </div>);
                    })}
                    <h1> </h1>
                    <div>HOW YOUR IDEAL PERSON SHOULD RESPOND?</div>
                    <h1> </h1>
                    {props.options.map((element,i) => {
                    return (
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name={props.id+1} key={i} value={i} onChange={e=>props.onButtonChange(props.id,e.target.value,1)}/>
                                <label className="form-check-label">{element}</label>
                            </div>);
                    })}
                    <h1> </h1>
                    <div className="form-check">
                        <label className="form-check-label" >Score : 25</label>
                        <input className="form-check-input" type="radio" name={props.id+2} key={0} value={25} onChange={e=>props.onButtonChange(props.id,e.target.value,2)}/>
                        <label className="form-check-label" >Score : 50</label>
                        <input className="form-check-input" type="radio" name={props.id+2} key={1} value={50} onChange={e=>props.onButtonChange(props.id,e.target.value,2)}/>
                        <label className="form-check-label" >Score : 75</label>
                        <input className="form-check-input" type="radio" name={props.id+2} key={2} value={75} onChange={e=>props.onButtonChange(props.id,e.target.value,2)}/>
                    </div>
        </div>
    )
}
export default Questions