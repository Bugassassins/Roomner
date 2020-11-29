import PropTypes from "prop-types";
import React, { Component } from "react";
import "./radio.css";

export class RadioButton extends Component {
    state = {};

    render() {
        const { selected, onChange, text, value, id, ind } = this.props;
        return (
            <div
                className="radio-btn-container"
                onClick={() => {
                    onChange(id, value, ind);
                }}
            >
                <div className={`radio-btn ${value !== selected && "unselected-btn"}`}>
                    <div className="radio-label">{text}</div>
                </div>
            </div>
        );
    }
}

RadioButton.propTypes = {
    text: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    ind: PropTypes.number.isRequired
};