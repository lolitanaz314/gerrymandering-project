import React, { Component, useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import dataFile from '../assets/data';
import Markers from './VenueMarkers';
import tennessee from "../assets/tennessee_congressional_districts.json";
import southcarolina from "../assets/southcarolina_congressional.json";
import tennesseeOutline from "../assets/tennessee.json";
import southcarolinaOutline from "../assets/southcarolina.json";
import L from 'leaflet';

/*
currentLocation contains fallback coordinates of the center of the United States
"zoom" default value is set to 5
These settings will make the map center on the middle of the US with a zoom level of 5 on page load
*/

// class MapView extends Component {
function MapView(props) {
  // constructor(props) {
    // super(props);
    // this.state = {
    //   currentLocation: { lat: 39.8283, lng: -98.5795 },
    //   zoom: 5,
    // }
    const [ currentLocation, setLocation] = useState({center: { lat: 39.8283, lng: -98.5795 }, zoom: 5, name: 'USA' });
  // }

  // zoomState = (state) => {
  function zoomState(state){
    var polygon = new L.Polygon(state.geometry.coordinates);
    var bounds = polygon.getBounds();
    var center = bounds.getCenter();
    var latitude = center.lng;
    var longitude = center.lat;
    var coords = {lat: latitude, lng: longitude};

    // this.setState({
    //   currentLocation: {lat: center.lat, lng: center.lng}, 
    //   zoom: 50
    // }, function(){ console.log(this.state.currentLocation); });

    console.log(coords);
    setLocation({
      center: coords, zoom: 7, name: state.properties.name
    });
  }

  function MyComponent() {
    const map = useMap();
    // map.setZoom(currentLocation.zoom);
    // map.panTo(currentLocation.center);
    map.setView(currentLocation.center, currentLocation.zoom);
    return null;
  }

  // clicked = (feature, layer) => {
  function clicked (feature, layer){
    // if (feature.properties && feature.properties.popupContent) {
    //   layer.bindPopup(feature.properties.popupContent);
    // }
    //MUST ADD: to feature.properties
        //  ,"popupContent": "THSI IS TENNEESEAEAWADSD"

    // bind click
    // layer.on('click', () => this.zoomState(feature));
    layer.on('click', () => zoomState(feature));
  }

  /*
  in the render() function the MapContainer() function is returned.
  TileLayer component adds the tiles for the map
  We pass data.venues as props to the Markers component so all markers are displayed on the map
  */

  // render() {
    // var { currentLocation, zoom } = this.state;

    return (
      <MapContainer center={currentLocation.center} zoom={currentLocation.zoom}>
        <MyComponent />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
        <GeoJSON data={tennessee}/>
        <GeoJSON data={southcarolina}/>
        <GeoJSON data={tennesseeOutline} onEachFeature={clicked} //i added both so i can calculate the center of the polygon
        />
        <GeoJSON data={southcarolinaOutline} onEachFeature={clicked} />
        <Markers venues={dataFile.venues} />
      </MapContainer>
    );
  // }
}

export default MapView;