import React from 'react';

const MagnitudeSlider = (props) => {
    return (
      <div className="magnitude-slider">
        <label>Min Magnitude
          <input type="range" min="1" max="10" step="0.5" value={props.value} onChange={(e) => props.onchange(Number(e.target.value))} />
          <span>{props.value}</span>
        </label>
      </div>
    );
};

export default MagnitudeSlider;
