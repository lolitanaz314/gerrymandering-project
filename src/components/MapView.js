import React, { Component } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import dataFile from '../assets/data';
import Markers from './VenueMarkers';
import tennessee from "../assets/tennessee_congressional_districts.json";
import southcarolina from "../assets/southcarolina_congressional.json";
import L from 'leaflet';

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

  zoomState = (state) => {
    var polygon = new L.Polygon(state.geometry.coordinates);
    var bounds = polygon.getBounds();
    var center = bounds.getCenter();
    // var lat = center.lat;
    // var lng = center.lng;
    // var coords = {lat, lng};
    // const map = useMap();
    // map.setView(coords, 50);

    this.setState({
      currentLocation: {lat: center.lat, lng: center.lng}, 
      zoom: 50
    }, function(){ console.log(this.state.currentLocation); });
  }

  clicked = (feature, layer) => {
    // if (feature.properties && feature.properties.popupContent) {
    //   layer.bindPopup(feature.properties.popupContent);
    // }
    //MUST ADD: to feature.properties
        //  ,"popupContent": "THSI IS TENNEESEAEAWADSD"

    // bind click
    layer.on('click', () => this.zoomState(feature));
  }

  /*
  in the render() function the MapContainer() function is returned.
  TileLayer component adds the tiles for the map
  We pass data.venues as props to the Markers component so all markers are displayed on the map
  */

  render() {
    var { currentLocation, zoom } = this.state;

    return (
      <MapContainer center={currentLocation} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
        <GeoJSON data={tennessee} onEachFeature={this.clicked} />
        <GeoJSON data={southcarolina} onEachFeature={this.clicked} />
        <Markers venues={dataFile.venues} />
      </MapContainer>
    );
  }
}

export default MapView;