import React from 'react';
import MagnitudeSlider from './MagnitudeSlider.js';

const FormControls = (props) => {
    return (
      <MagnitudeSlider onchange={props.magonchange} value={props.magvalue}/>
    );
};

export default FormControls;
