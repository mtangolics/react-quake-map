import React from 'react';
import moment from 'moment';

const LIST_ITEM_DIV_STYLE = {
  'float': 'left',
  'padding': '10px',
  'width': '50px',
  'textAlign': 'left'
};

const LIST_ITEM_TIME_STYLE = {
  'float': 'right',
  'textAlign': 'left',
  'width': '120px'
};

const LIST_ITEM_LOC_STYLE = {
  'float': 'left',
  'padding': '10px',
  'textAlign': 'left'
};

const LIST_ITEM_STYLE = {
  'borderBottom': '1px solid #ccc',
  'clear': 'both',
  'height': '38px'
};

const QuakeListItem = (props) => {
    const qProps = props.quakeData.properties;
    const qGeom = props.quakeData.geometry;

    return (
      <li className="quakelist-item" style={LIST_ITEM_STYLE}>
        <div className="quake-mag" style={LIST_ITEM_DIV_STYLE}>
          {qProps.mag >= 4 ? <span className="bold">{qProps.mag}</span> : qProps.mag}
        </div>
        <div className="quake-depth" style={LIST_ITEM_DIV_STYLE}>
          {Math.round(qGeom.coordinates[2])}km
        </div>
        <div className="quake-loc" style={LIST_ITEM_LOC_STYLE}>
          {qProps.place}
        </div>
        <div className="quake-time" title={new Date(qProps.time).toISOString()} style={LIST_ITEM_TIME_STYLE}>
          {moment(qProps.time).fromNow()}
        </div>
      </li>
    );
}

export default QuakeListItem;
