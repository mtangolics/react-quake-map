import React, { Component } from 'react';

import _ from "lodash";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';


const QUAKE_INFO_STYLE = {
  a: {
    'fontSize': '11px',
    'textAlign': 'left'
  },
  h5: {
    'marginBottom': '10px'
  },
  td: {
    'paddingLeft': '0',
    'fontSize': '11px',
    'textAlign': 'left'
  }
};

const TheGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{ lat: 37.7, lng: -98.5 }} // center of US
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onClick={() => props.onMarkerClick(marker)}
        >
        {marker.showInfo && (
          <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
            {marker.infoContent}
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
  ));

class QuakeMap extends Component {

  constructor() {
    super();

    this.state = {
      markers: this.markerizeProps(this.props)
    };
  }

  handleMapLoad = this.handleMapLoad.bind(this);
  handleMarkerClick = this.handleMarkerClick.bind(this);
  handleMarkerClose = this.handleMarkerClose.bind(this);

  markerizeProps(props) {
    if(props == null || props.quakeList == null) {
      return [];
    }
    return props.quakeList.map(function(q,idx) {
         return {
           position: {
             lat: q.geometry.coordinates[1],
             lng: q.geometry.coordinates[0]
           },
           key: 'quake' + idx,
           defaultAnimation: 2,
           infoContent: (
             <div className="quakeInfo">
               <h5 style={QUAKE_INFO_STYLE.h5}>{q.properties.title}</h5>
               <table>
                 <tbody>
                   <tr><td style={QUAKE_INFO_STYLE.td}>Tsunami:</td><td>{q.properties.tsunami === 0 ? 'No' : 'Yes'}</td></tr>
                   <tr><td style={QUAKE_INFO_STYLE.td}>Alert Level:</td><td>{q.properties.alert ? q.properties.alert : 'None'}</td></tr>
                   <tr><td style={QUAKE_INFO_STYLE.td}><a style={QUAKE_INFO_STYLE.a} href={q.properties.url} target="_blank">More Details</a></td></tr>
                 </tbody>
               </table>
             </div>
           )
         }
       });
  }

  handleMapLoad(map) {
    this._mapComponent = map;
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }

  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
          };
        }
        return marker;
      }),
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      markers: this.markerizeProps(nextProps)
    });
  }

  render() {
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
          onMarkerClick={this.handleMarkerClick}
          onMarkerClose={this.handleMarkerClose}
        />
    );
  }
}

export default QuakeMap;
