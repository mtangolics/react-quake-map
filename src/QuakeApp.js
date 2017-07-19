import React, { Component } from 'react';
import axios from 'axios';
import QuakeListItem from './components/QuakeListItem';
import QuakeMap from './components/QuakeMap';
import FormControls from './components/FormControls';

const APP_STYLE = {
  'clear': 'both'
};

const LIST_CONTAINER_STYLE = {
  'margin': 'auto',
  'width': '50vw',
  'height': '100vh',
  'overflowY': 'auto',
  'float': 'left',
  'position': 'relative'
};

const LIST_ITEM_STYLE = {
  'borderBottom': '1px solid #ccc',
  'clear': 'both'
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
  'height': '100vh',
  'float': 'left'
};

class QuakeApp extends Component {

  constructor() {
    super();
    this.state = {
      data: [],
      minMagnitude: 2.5
    };
  }

  fetchData() {
    let dayAgo = new Date(Date.now() - 86400000);

    axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query',{
      params: {
        'format': 'geojson',
        'starttime': dayAgo.toISOString(),
        'minmagnitude': this.state.minMagnitude
      }
    })
    .then((response) => {
      if(response && response.data) {
        this.setState({
          data: response.data.features
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidUpdate(prevProps,prevState) {
    if(this.state.minMagnitude !== prevState.minMagnitude) {
      this.fetchData();
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const listItems = this.state.data.map((quake) =>
      <QuakeListItem quakeData={quake} key={quake.id} style={LIST_ITEM_STYLE}/>
    );
    return (
      <div style={APP_STYLE} className="QuakeApp">
        <form className="QuakeApp-form">
          <FormControls magonchange={this.handleMagChange} magvalue={this.state.minMagnitude}/>
        </form>
        <div className="QuakeApp-mapContainer" style={MAP_CONTAINER_STYLE}>
          <QuakeMap quakeList={this.state.data}/>
        </div>
        <div className="QuakeApp-listContainer" style={LIST_CONTAINER_STYLE}>
          <div className="QuakeApp-list-header" style={LIST_HEADER_STYLE}>
            <div className="mag-header" style={LIST_HEADER_MAG_STYLE}>Mag</div>
            <div className="depth-header" style={LIST_HEADER_DEPTH_STYLE}>Depth</div>
            <div className="loc-header" style={LIST_HEADER_DIV_STYLE}>Location</div>
            <div className="time-header" style={LIST_HEADER_TIME_STYLE}>Time</div>
          </div>
          <ul className="QuakeApp-list" style={{'marginTop': '38px'}}>
            {listItems}
          </ul>
        </div>
      </div>
    );
  }

  handleMagChange = (val) => {
    console.log('handleMagChange received: ' + val);
    this.setState({
      minMagnitude: val
    });
  }
}

export default QuakeApp;
