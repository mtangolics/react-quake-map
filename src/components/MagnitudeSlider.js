import React from 'react';

const MagnitudeSlider = (props) => {
    return (
      <div className="magnitude-slider form-block">
        <label>Min Magnitude</label>
        <input type="range" min="1" max="10" step="0.5" value={props.value} onChange={(e) => props.onchange(Number(e.target.value))} />
        <span className="bold">{props.value}</span>
      </div>
    );
};

export default MagnitudeSlider;
