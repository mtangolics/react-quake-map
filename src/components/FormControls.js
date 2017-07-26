import React from 'react';
import MagnitudeSlider from './MagnitudeSlider.js';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const LABEL_STYLE = {
  'display': 'inline-block',
  'margin': '0 10px 0 10px'
}

const FormControls = (props) => {
    return (
      <form className="form-controls">
        <MagnitudeSlider onchange={props.magonchange} value={props.magvalue}/>
        <label style={LABEL_STYLE}>Timeframe Start</label>
        <DatePicker onChange={props.onStartDateChange} selected={props.startDate}/>
        <label style={LABEL_STYLE}>Timeframe End</label>
        <DatePicker onChange={props.onEndDateChange} selected={props.endDate} placeholderText="Present" />
      </form>
    );
};

export default FormControls;
