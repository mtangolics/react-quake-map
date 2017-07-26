import React, { Component } from 'react';
import axios from 'axios';
import QuakeListItem from './components/QuakeListItem';
import QuakeMap from './components/QuakeMap';
import FormControls from './components/FormControls';
import moment from 'moment';

const APP_STYLE = {
  'clear': 'both',
  'height': '100vh'
};

const LIST_CONTAINER_STYLE = {
  'margin': 'auto',
  'width': '50vw',
  'height': '100%',
  'overflowY': 'auto',
  'float': 'left',
  'position': 'relative'
};

const LIST_HEADER_DIV_STYLE = {
  'float': 'left',
  'padding': '10px'
};

const LIST_HEADER_MAG_STYLE = {
  'float': 'left',
  'padding': '10px',
  'width': '50px',
  'textAlign': 'left'
};

const LIST_HEADER_DEPTH_STYLE = LIST_HEADER_MAG_STYLE;

const LIST_HEADER_TIME_STYLE = {
  'float': 'right', 
  'textAlign': 'left', 
  'width': '120px',
  'padding': '10px'
};

const LIST_HEADER_STYLE = {
  'position': 'fixed',
  'backgroundColor': 'white',
  'width': '50vw',
  'fontWeight': 'bold'
};

const MAP_CONTAINER_STYLE = {
  'width': '50vw',
  'height': '100%',
  'float': 'left'
};

class QuakeApp extends Component {

  constructor() {
    super();
    this.state = {
      data: [],
      minMagnitude: 2.5,
      startDate: moment().subtract(1, 'days'),
      endDate: null,
      formIsDirty: false
    };
  }

  fetchData() {

    axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query',{
      params: {
        'format': 'geojson',
        'starttime': this.state.startDate.format(),// dayAgo.toISOString(),
        'minmagnitude': this.state.minMagnitude
      }
    })
    .then((response) => {
      if(response && response.data) {
        this.setState({
          data: response.data.features,
          formIsDirty: false
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidUpdate(prevProps,prevState) {
    if(this.state.formIsDirty) {
      this.fetchData();
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const listItems = this.state.data.map((quake) =>
      <QuakeListItem quakeData={quake} key={quake.id}/>
    );
    return (
      <div style={APP_STYLE} className="quake-app">
        <FormControls 
          magonchange={this.handleMagChange} 
          magvalue={this.state.minMagnitude} 
          onStartDateChange={this.handleStartDateChange} 
          onEndDateChange={this.handleEndDateChange} 
          startDate={this.state.startDate} 
          endDate={this.state.endDate}
        />
        <div className="map-container" style={MAP_CONTAINER_STYLE}>
          <QuakeMap quakeList={this.state.data}/>
        </div>
        <div className="list-container" style={LIST_CONTAINER_STYLE}>
          <div className="list-header" style={LIST_HEADER_STYLE}>
            <div className="mag-header" style={LIST_HEADER_MAG_STYLE}>Mag</div>
            <div className="depth-header" style={LIST_HEADER_DEPTH_STYLE}>Depth</div>
            <div className="loc-header" style={LIST_HEADER_DIV_STYLE}>Location</div>
            <div className="time-header" style={LIST_HEADER_TIME_STYLE}>Time</div>
          </div>
          <ul className="list" style={{'marginTop': '38px'}}>
            {listItems}
          </ul>
        </div>
      </div>
    );
  }

  handleStartDateChange = (d) => {

    this.setState({
      startDate: d,
      formIsDirty: !d.isSame(this.state.startDate)
    });
  }

  handleEndDateChange = (d) => {
    this.setState({
      endDate: d,
      formIsDirty: !d.isSame(this.state.endDate)
    });
  }

  handleMagChange = (val) => {
    this.setState({
      minMagnitude: val,
      formIsDirty: val !== this.state.minMagnitude
    });
  }
}

export default QuakeApp;
