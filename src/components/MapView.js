import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import dataFile from '../assets/data';
import Markers from './VenueMarkers';
import Navigation from './Navigation';
import tennessee from "../assets/tennessee_congressional_districts.json";
import southcarolina from "../assets/southcarolina_congressional.json";
import tennesseeOutline from "../assets/tennessee.json";
import southcarolinaOutline from "../assets/southcarolina.json";
import L from 'leaflet';
import MarkerPopup from "./MarkerPopup"

/*
currentLocation contains fallback coordinates of the center of the United States
"zoom" default value is set to 5
These settings will make the map center on the middle of the US with a zoom level of 5 on page load
*/

const myComponentStyle = {
  lineHeight: 10,
  position: 'absolute',
  top:30, //66
  height: 30,
  color: 'blue'
}

const MapView = ({show, handleShow}) => {
  const [ currentLocation, setLocation] = useState({center: { lat: 39.8283, lng: -98.5795 }, zoom: 5, name: 'USA' });

  function zoomState(state) {
    var polygon = new L.Polygon(state.geometry.coordinates);
    var bounds = polygon.getBounds();
    var center = bounds.getCenter();
    var latitude = center.lng;
    var longitude = center.lat;
    var coords = {lat: latitude, lng: longitude};

    console.log(coords);
    setLocation({
      center: coords, zoom: 7, name: state.properties.name
    });
  }

  function MyComponent() {
    const map = useMap();
    //pan & zoom
    map.setView(currentLocation.center, currentLocation.zoom);
    return null;
  }

  /*
    clicked is called when user clicks on a state from the map. Used from GEOJson feature.
  */
  function clicked(feature, layer){
    // bind click
    layer.on('click', () => zoomState(feature));
    layer.on('click', () => handleShow());
    // console.log("Clicked");
  }

  /*
  in the render() function the MapContainer() function is returned.
  TileLayer component adds the tiles for the map
  We pass data.venues as props to the Markers component so all markers are displayed on the map
  */

    return (
      <div style={myComponentStyle}>
        <Navigation/>
        <MapContainer className='google-maps' center={currentLocation.center} zoom={currentLocation.zoom} zoomControl={false}>
          <MyComponent />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" /> 
          <GeoJSON data={tennessee}/>
          <GeoJSON data={southcarolina}/>
          
          <GeoJSON data={tennesseeOutline} onEachFeature={clicked}>
            {/* <MarkerPopup data="hello" /> */}
          </GeoJSON>
          <GeoJSON data={southcarolinaOutline} onEachFeature={clicked}>
            {/* <MarkerPopup data="hello" /> */}
          </GeoJSON>
          <Markers venues={dataFile.venues} />
        </MapContainer>
      </div>
    );
}

export default MapView