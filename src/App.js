import React, { Component } from 'react';
import QuakeListItem from './QuakeListItem';
import QuakeMap from './QuakeMap';
import './App.css';

class App extends Component {
  render() {

    const listItems = this.props.data.features.map((quake) =>
      <QuakeListItem quakeData={quake} key={quake.id}/>
    );

    return (
      <div className="App">
        <div className="App-mapContainer">
          <QuakeMap quakeList={this.props.data.features}/>
        </div>
        <div className="App-listContainer">
          <ul className="App-list">
            {listItems}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
