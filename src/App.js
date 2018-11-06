import React, {
  Component
} from 'react';

import {
  Map,
  TileLayer,
  Marker,
  Popup
} from 'react-leaflet';

import './App.css';

class App extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  }


  render() {
    const position = [this.state.lat, this.state.lng];

    return (
    <Map className="map" center = { position } zoom = { this.state.zoom }>
      <TileLayer url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" 
      />
      <Marker position = { position } >
        <Popup>
          A pretty CSS3 popup. <br/> Easily customizable. 
        </Popup> 
      </Marker> 
    </Map>
    );
  }
}

export default App;