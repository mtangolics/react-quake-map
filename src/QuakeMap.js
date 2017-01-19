import React, { Component } from 'react';

import _ from "lodash";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const TheGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{ lat: 37.7, lng: -98.5 }}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
      />
    ))}
  </GoogleMap>
  ));

class QuakeMap extends Component {

state = {
    markers: this.props.quakeList.map(function(q,idx) {
       return {
         position: {
           lat: q.geometry.coordinates[1],
           lng: q.geometry.coordinates[0]
         },
         key: 'quake' + idx,
         defaultAnimation: 2
       }
     }),
   };

  handleMapLoad = this.handleMapLoad.bind(this);
  handleMapClick = this.handleMapClick.bind(this);

  handleMapLoad(map) {
    //console.log([{position: {lat: 37.7,lng: -98.5},key: 'xffj2424',defaultAnimation: 2}]);
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick(event) {
    console.log('click');
    const nextMarkers = [
      ...this.state.markers,
      {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
      },
    ];
    this.setState({
      markers: nextMarkers,
    });

    if (nextMarkers.length === 3) {
      this.props.toast(
        `Right click on the marker to remove it`,
        `Also check the code!`
      );
    }
  }

  render() {
    console.log(this.state.markers);
    return (
        <TheGoogleMap
          containerElement={
            <div className="googleMapContainer" style={{ height: `100%` }} />
          }
          mapElement={
            <div className="googleMapElement" style={{ height: `100%` }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={this.state.markers}
        />
    );
  }
}

export default QuakeMap;
