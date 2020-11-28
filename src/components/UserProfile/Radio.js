import PropTypes from "prop-types";
import React, { Component } from "react";
import "./radio.css";

export class Radio extends Component {
  state = {};

  render() {
    const { selected, onChange, text, value ,id,ind} = this.props;
    return (
      <div
        className="modern-radio-container"
        onClick={() => {
          onChange(id,value,ind);
        }}
      >
        <div
          className={`radio-outer-circle ${value !== selected && "unselected"}`}
        >
          <div
            className={`radio-inner-circle ${value !== selected &&
              "unselected-circle"}`}
          />
        </div>
        <div className="helper-text">{text}</div>
      </div>
    );
  }
}

Radio.propTypes = {
  text: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  ind: PropTypes.number.isRequired
};