import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import QuakeList from './components/QuakeList';
import QuakeMap from './components/QuakeMap';
import FormControls from './components/FormControls';

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
        'starttime': this.state.startDate.format(),
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
    return (
      <div className="quake-app container-fluid">
        <div className="row">
          <FormControls 
            magonchange={this.handleMagChange} 
            magvalue={this.state.minMagnitude} 
            onStartDateChange={this.handleStartDateChange} 
            onEndDateChange={this.handleEndDateChange} 
            startDate={this.state.startDate} 
            endDate={this.state.endDate}
          />
        </div>
        <div className="row">
          <div className="map-container col-md-6">
            <QuakeMap quakeList={this.state.data} />
          </div>
          <div className="list-container col-md-6">
            <QuakeList data={this.state.data} />
          </div>
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
