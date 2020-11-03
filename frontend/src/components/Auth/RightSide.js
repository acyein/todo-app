import React from 'react';
import './Auth.css';

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="tab-container">
        <span className="tab-text">{props.tabText}</span>
      </div>
    </div>
  );
};

export default RightSide;