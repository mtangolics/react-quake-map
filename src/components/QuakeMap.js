import React from 'react';

import _ from "lodash";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';

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

const QuakeMap = (props) => {
  return (
    <TheGoogleMap
      containerElement={
        <div className="google-map-container" style={{ height: '100%' }} />
      }
      mapElement={
        <div className="google-map-element" style={{ height: '100%' }} />
      }
      onMapLoad={props.handleMapLoad}
      markers={props.markers}
      onMarkerClick={props.onMarkerClick}
      onMarkerClose={props.onMarkerClose}
    />
  );
}

export default QuakeMap;
