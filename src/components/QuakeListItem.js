import React from 'react';
import moment from 'moment';


const QuakeListItem = (props) => {
    const qProps = props.quakeData.properties;
    const qGeom = props.quakeData.geometry;

    const isSelected = props.selectedQuakes.includes(props.quakeData.id);
    const clsName = 'quakelist-item clearfix' + (isSelected ? ' highlighted' : '');

    return (
      <li className={clsName}>
        <div className="quake-mag">
          {qProps.mag >= 4 ? <span className="bold">{qProps.mag}</span> : qProps.mag}
        </div>
        <div className="quake-depth">
          {Math.round(qGeom.coordinates[2])}km
        </div>
        <div className="quake-loc">
          {qProps.place}
        </div>
        <div className="quake-time" title={new Date(qProps.time).toISOString()}>
          {moment(qProps.time).fromNow()}
        </div>
      </li>
    );
}

export default QuakeListItem;
