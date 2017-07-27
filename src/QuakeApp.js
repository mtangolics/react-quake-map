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
      formIsDirty: false,
      selectedQuakes: [],
      mapMarkers: []
    };
  }

  fetchData() {

      var params = {
        'format': 'geojson',
        'starttime': this.state.startDate.format(),
        'minmagnitude': this.state.minMagnitude
      };

      if(this.state.endDate !== null) {
        params['endtime'] = this.state.endDate.format()
      }

    axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query',{
      params
    })
    .then((response) => {
      if(response && response.data) {
        this.setState({
          data: response.data.features,
          mapMarkers: this.markerizeData(response.data.features),
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
            <QuakeMap onMarkerClick={this.handleMarkerClick} onMarkerClose={this.handleMarkerClose} markers={this.state.mapMarkers} handleMapLoad={this.handleMapLoad} />
          </div>
          <div className="list-container col-md-6">
            <QuakeList data={this.state.data} selectedQuakes={this.state.selectedQuakes} />
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

  handleMarkerClose = (targetMarker) => {
    this.setState({
      mapMarkers: this.state.mapMarkers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
      selectedQuakes: this.state.selectedQuakes.filter((id) => { return id !== targetMarker.key })
    });
  }

  handleMarkerClick = (targetMarker) => {
    this.setState({
      mapMarkers: this.state.mapMarkers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
          };
        }
        return marker;
      }),
      selectedQuakes: !this.state.selectedQuakes.includes(targetMarker.key) ? [...this.state.selectedQuakes,targetMarker.key] : this.state.selectedQuakes 
    });
  }

  handleMapLoad = (map) => {
    this._mapComponent = map;
  }

  markerizeData(quakeList) {
    if(quakeList == null) {
      return [];
    }
    return quakeList.map((q,idx) => {
         return {
           position: {
             lat: q.geometry.coordinates[1],
             lng: q.geometry.coordinates[0]
           },
           key: q.id,
           defaultAnimation: 2,
           infoContent: (
             <div className="quake-info">
               <h5>{q.properties.title}</h5>
               <table>
                 <tbody>
                   <tr><td>Tsunami:</td><td>{q.properties.tsunami === 0 ? 'No' : 'Yes'}</td></tr>
                   <tr><td>Alert Level:</td><td>{q.properties.alert ? q.properties.alert : 'None'}</td></tr>
                   <tr><td><a href={q.properties.url} target="_blank">More Details</a></td></tr>
                 </tbody>
               </table>
             </div>
           )
         }
       });
  }
}

export default QuakeApp;
