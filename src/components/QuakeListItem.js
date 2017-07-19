import React, { Component } from 'react';
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

class QuakeListItem extends Component {
  render() {
    const qProps = this.props.quakeData.properties;
    const qGeom = this.props.quakeData.geometry;

    return (
      <li className="QuakeListItem">
        <div className="QuakeListItem-mag" style={LIST_ITEM_DIV_STYLE}>
          {qProps.mag >= 4 ? <span className="bold">{qProps.mag}</span> : qProps.mag}
        </div>
        <div className="QuakeListItem-depth" style={LIST_ITEM_DIV_STYLE}>
          {Math.round(qGeom.coordinates[2])}km
        </div>
        <div className="QuakeListItem-place" style={LIST_ITEM_DIV_STYLE}>
          {qProps.place}
        </div>
        <div className="QuakeListItem-time" title={new Date(qProps.time).toISOString()} style={LIST_ITEM_TIME_STYLE}>
          {moment(qProps.time).fromNow()}
        </div>
      </li>
    );
  }
}

export default QuakeListItem;
