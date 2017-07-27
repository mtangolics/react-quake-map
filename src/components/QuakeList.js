import React from 'react';

import QuakeListItem from './QuakeListItem';

const QuakeList = (props) => {
    const listItems = props.data.map((quake) =>
      <QuakeListItem quakeData={quake} key={quake.id} selectedQuakes={props.selectedQuakes}/>
    );

    return(
        <div className="list">
            <div className="list-header clearfix">
                <div className="mag header">Mag</div>
                <div className="depth header">Depth</div>
                <div className="loc header">Location</div>
                <div className="time header">Time</div>
            </div>
            <ul className="list-data">
                {listItems}
            </ul>
        </div>
    );
};

export default QuakeList;