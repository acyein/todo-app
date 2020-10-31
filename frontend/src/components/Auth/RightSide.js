import React from 'react';

export const RightSide = props => {
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