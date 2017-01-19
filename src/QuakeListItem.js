import React, { Component } from 'react';
import moment from 'moment';

class QuakeListItem extends Component {
  render() {
    const qProps = this.props.quakeData.properties;
    return (
      <li className="QuakeListItem">
        <div className="QuakeListItem-mag">
          {qProps.mag >= 2.5 ? <span className="bold">{qProps.mag}</span> : qProps.mag}
        </div>
        <div className="QuakeListItem-place">
          {qProps.place}
        </div>
        <div className="QuakeListItem-time">
          {moment(qProps.time).fromNow()}
        </div>
      </li>
    );
  }
}

export default QuakeListItem;
