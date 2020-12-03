import React, {  useState } from "react";import "./Questions.css";
import { Radio } from "./Radio";
import { RadioButton } from "./RadioButton";

const Questions=(props) => {
    const [curChoice1,setCurChoice1]=useState(props.response[0]);
    const [curChoice2,setCurChoice2]=useState(props.response[1]);
    const [curChoice3,setCurChoice3]=useState(props.response[2]);
    if(curChoice3===0)
        setCurChoice3(25);
    // console.log(curChoice1);
    // console.log(props.response);
    return (
        <div className="form-group">
                <h1 className="form-title">{props.question}</h1>
                <h1 className="form-name">Your Answer</h1>
                <div className="form-options">
                {props.options.map((element,i) => {
                    return (
                        <div className="form-check" >
                            <label className="form-check-label">{element}</label>
                            <Radio value={i} id={props.id} ind={0} selected={curChoice1}  onChange={(id,val,ind) => {setCurChoice1(val);props.onButtonChange(id,val,ind)} }/>
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
                                <Radio value={i} id={props.id} ind={1} selected={curChoice2}  onChange={(id,val,ind) => {setCurChoice2(val);props.onButtonChange(id,val,ind)} }/>
                            </div>);
                    })}
                    </div>
                    <br />
                    <h1 className="form-name">Importance</h1>
                    <div className="form-importance">
                        <RadioButton value={25} id={props.id} ind={2} selected={curChoice3}  onChange={(id,val,ind) => {setCurChoice3(val);props.onButtonChange(id,val,ind)} } text="A little"/>
                        <RadioButton value={50} id={props.id} ind={2} selected={curChoice3}  onChange={(id,val,ind) => {setCurChoice3(val);props.onButtonChange(id,val,ind)} } text="Moderately"/>
                        <RadioButton value={75} id={props.id} ind={2} selected={curChoice3}  onChange={(id,val,ind) => {setCurChoice3(val);props.onButtonChange(id,val,ind)} } text="Very"/>
                    </div>
        </div>
    )
}
export default Questions
