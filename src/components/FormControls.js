import React from 'react';
import MagnitudeSlider from './MagnitudeSlider.js';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const FormControls = (props) => {
    return (
      <form className="form-controls">
        <MagnitudeSlider onchange={props.magonchange} value={props.magvalue}/>
        <div className="form-block">
          <label>Timeframe Start</label>
          <DatePicker className="datepicker" onChange={props.onStartDateChange} selected={props.startDate}/>
        </div>
        <div className="form-block">
          <label>Timeframe End</label>
          <DatePicker className="datepicker" onChange={props.onEndDateChange} selected={props.endDate} placeholderText="Present" />
        </div>
      </form>
    );
};

export default FormControls;
