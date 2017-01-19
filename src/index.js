import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import './index.css';

axios.get('http://earthquake.usgs.gov/fdsnws/event/1/query',{
    params: {
      'format': 'geojson',
      'starttime': '2017-01-19'
    }
  })
  .then(function (response) {
    initReactApp(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

function initReactApp(data) {
  ReactDOM.render(
    <App data={data}/>,
    document.getElementById('root')
  );
}
