import React, { Component } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import dataFile from '../assets/data';
import Markers from './VenueMarkers';
import tennessee from "../assets/tennessee_congressional_districts.json";
import southcarolina from "../assets/southcarolina.json"

/*
currentLocation contains fallback coordinates of the center of the United States
"zoom" default value is set to 5
These settings will make the map center on the middle of the US with a zoom level of 5 on page load
*/

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: 39.8283, lng: -98.5795 },
      zoom: 5,
    }
  }
  /*
  in the render() function the MapContainer() function is returned.
  TileLayer component adds the tiles for the map
  We pass data.venues as props to the Markers component so all markers are displayed on the map
  */

  

  render() {
    const { currentLocation, zoom } = this.state;
    var state1 = tennessee

    var testing2 = southcarolina

    return (
      <MapContainer center={currentLocation} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
        <GeoJSON data={state1} />
        <GeoJSON data={testing2} />
        <Markers venues={dataFile.venues} />
      </MapContainer>
    );
  }
}

export default MapView;