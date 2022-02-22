import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
//import dataFile from '../assets/data';
import Markers from './VenueMarkers';
import Navigation from './Navigation';
import tennessee from "../assets/tennessee_congressional_districts.json";
import southcarolina from "../assets/southcarolina_congressional.json";
import tennesseeOutline from "../assets/tennessee.json";
import southcarolinaOutline from "../assets/southcarolina.json";
import Sidebar from './Sidebar';
import L from 'leaflet';
import MarkerPopup from './MarkerPopup';

/*
currentLocation contains fallback coordinates of the center of the United States
"zoom" default value is set to 5
These settings will make the map center on the middle of the US with a zoom level of 5 on page load
*/

const myComponentStyle = {
  lineHeight: 10,
  position: 'absolute',
  top: 30, //66
  color: 'blue'
}

const MapView = (props) => {
  const [currentLocation, setLocation] = useState({
    center: { lat: 39.8283, lng: -98.5795 },
    zoom: 5,
    name: 'USA',
    prev: null,
    layer: null
  });

  //sidebar
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false); // reset the state of the sidebar

  //district hovering
  const [onselect, setOnselect] = useState({});
  // const style = (feature => {
  //   return ({
  //     fillColor: mapPolygonColorToDensity(feature.properties.POPULATION),
  //     weight: 1,
  //     opacity: 1,
  //     color: 'white',
  //     dashArray: '2',
  //     fillOpacity: 0.5
  //   });
  // });
  // const mapPolygonColorToDensity = (density => {
  //   return density > 3023 ? '#a50f15' : density > 676 ? '#de2d26' : density > 428
  //   ? '#fb6a4a' : density > 236 ? '#fc9272' : density > 23 ? '#fcbba1' : '#fee5d9';
  // })

  //district hovering functions
  const highlight = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature
      // ,
      // mouseout: resetHighlight
    });
  }
  
  const highlightFeature = (e => {
    console.log('hovering')
    var layer = e.target;
    const pop = layer.feature.properties.POPULATION;
    const county = layer.feature.properties.DISTRICT;
    setOnselect({
      population: pop,
      district: county
    });
    // layer.setStyle({
    //   weight: 1,
    //   color: "black",
    //   fillOpacity: 1
    // });
  });

  // const resetHighlight = (e => {
  //   setOnselect({});
  //   e.target.setStyle(style(e.target.feature));
  // })

  //zoom state functions
  /*
    clicked is called when user clicks on a state from the map. Used from GEOJson feature.
  */
  function clicked(feature, layer) {
    // bind click
    layer.on('click', () => zoomState(feature, layer));
    // console.log("Clicked");
  }

  function zoomState(state, layer) {
    var polygon = new L.Polygon(state.geometry.coordinates);
    var bounds = polygon.getBounds();
    var center = bounds.getCenter();
    var latitude = center.lng;
    var longitude = center.lat;
    var coords = { lat: latitude, lng: longitude };
    var prev = currentLocation.layer;

    console.log(state.properties.name);

    setLocation({
      center: coords, zoom: 7, name: state.properties.name, layer: layer, prev: prev
    });
    handleShow();
    // state.data = state.properties.name.toLowerCase();
    document.getElementsByClassName("info-box")[0].classList.remove('hidden');
    document.getElementsByClassName("legend")[0].classList.remove('hidden');
  }

  function MyComponent() {
    const map = useMap();
    if(currentLocation.prev){
      map.addLayer(currentLocation.prev);
    }
    //pan & zoom
    map.setView(currentLocation.center, currentLocation.zoom);
    if(currentLocation.layer){
      map.removeLayer(currentLocation.layer);
    }
    return null;
  }

  /*
  in the render() function the MapContainer() function is returned.
  TileLayer component adds the tiles for the map
  We pass data.venues as props to the Markers component so all markers are displayed on the map
  */

  return (
    <div style={myComponentStyle} id='map'>
      <Navigation zoomState={zoomState} />
      <MapContainer center={currentLocation.center} zoom={currentLocation.zoom} zoomControl={false}>
        <MyComponent />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
        <GeoJSON data={tennessee} onEachFeature={highlight}/>
        <GeoJSON data={southcarolina} onEachFeature={highlight}/>
        <GeoJSON data={tennesseeOutline} onEachFeature={clicked}/>
        <GeoJSON data={southcarolinaOutline} onEachFeature={clicked}/>
        <Sidebar show={show} handleClose={handleClose} name={currentLocation.name} />

        <div className="info-box hidden">
          {!onselect.district && (
            <div className = "census-info-hover">
              <strong>Kenya population density</strong>
              <p>Hover on each county for more details</p>
            </div>
          )}
          
          {onselect.district && (
            <ul className = "census-info">
              <li><strong>District {onselect.district}</strong></li><br />
              <li>Total Population:{onselect.population} (I beleive is wrong)</li>
            </ul>
          )}
        </div>
      </MapContainer>
    </div>
  );
}

export default MapView