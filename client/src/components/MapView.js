import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// assets
import tennessee from "../assets/json/tennessee_congressional.json";
import southcarolina from "../assets/json/southcarolina_congressional.json";
import colorado from "../assets/json/colorado_congressional.json";
import tennesseeOutline from "../assets/json/tennessee.json";
import southcarolinaOutline from "../assets/json/southcarolina.json";
import coloradoOutline from "../assets/json/colorado.json";
// import tennesseeCounty from "../assets/json/tennessee_counties.json"
// import southcarolinaPrecinct from "../assets/json/southcarolina_precincts.json"
// import southcarolinaCounty from "../assets/json/southcarolina_counties.json"
import './style/Legend.css';

// components
import Navigation from './Navigation';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import Legend from './Legend';

/*
currentLocation contains fallback coordinates of the center of the United States
"zoom" default value is set to 5
These settings will make the map center on the middle of the US with a zoom level of 5 on page load
*/

const MapView = (props) => {
  const [currentLocation, setLocation] = useState({
    center: { lat: 39.8283, lng: -98.5795 },
    zoom: 5,
    name: 'USA',
    layer: null, //this is used to remove geojson layer -> might need to delete later on
    view: 'election',
    districtbord: true,
    precinctbord: false,
    countybord: false
  });

  //left sidebar
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

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

  // bottom drawer
  const [isVisible, setIsVisible] = useState(false);
  const openDrawer = () => setIsVisible(true);
  const closeDrawer = () => setIsVisible(false);

  // the modal stuff (District comparison)
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const showModal = () => {
    setIsOpenModal(true);
  };
  const hideModal = () => {
    setIsOpenModal(false);
  };

  //district hovering functions
  const highlight = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature
      // mouseout: resetHighlight
    });
  }
  
  const highlightFeature = (e => {
    var layer = e.target;
    const pop = layer.feature.properties.POPULATION;
    const district = layer.feature.properties.DISTRICT;
    const incumbent = layer.feature.properties.INCUMBENT;
    const lean = layer.feature.properties.LEAN;
    const white = layer.feature.race.white;
    const black = layer.feature.race.black;
    const native = layer.feature.race.native;
    const asian = layer.feature.race.asian;
    const islander = layer.feature.race.islander;
    const hispanic = layer.feature.race.hispanic;
    setOnselect({
      population: pop,
      district: district,
      incumbent: incumbent,
      lean: lean,
      white: white,
      black: black,
      native: native,
      asian: asian,
      islander: islander,
      hispanic: hispanic,
    });
  });

  //zoom state functions
  /*
    clicked is called when user clicks on a state from the map. Used from GEOJson feature.
  */
  function clicked(feature, layer) {
    // bind click
    console.log("CLICKED current view: " + currentLocation.view)
    layer.on('click', () => zoomState(feature, layer));
    // console.log("Clicked");
  }
  
  function zoomState(state, layer) {
    setOnselect({}); //resets the info box if user clicks on a new state
    // if(currentLocation.view !== 'population') document.getElementsByClassName("legend")[0].classList.add('hidden');

    var polygon = new L.Polygon(state.geometry.coordinates);
    var bounds = polygon.getBounds();
    var center = bounds.getCenter();
    var latitude = center.lng + 1;
    var longitude = center.lat - 0.5;
    var coords = { lat: latitude, lng: longitude };

    console.log(state.properties.name);
    console.log("ZOOM STATE current view: " + currentLocation.view)

    setLocation({
      center: coords, 
      zoom: 6.5, 
      name: state.properties.name, 
      layer: layer, 
      view: currentLocation.view,
      districtbord: currentLocation.districtbord,
      precinctbord: currentLocation.precinctbord,
      countybord: currentLocation.countybord
    });
    handleShow();
    // state.data = state.properties.name.toLowerCase();

    //changes css to show boxes
    document.getElementsByClassName("info-box")[0].classList.remove('hidden');
    document.getElementsByClassName("legend")[0].classList.remove('hidden');
  }

  function MyComponent() {
    const map = useMap();
    //pan & zoom
    map.setView(currentLocation.center, currentLocation.zoom);
    if(currentLocation.layer){
      map.removeLayer(currentLocation.layer);
    }
    return null;
  }

  // get color -- would be useful for colors by total population
  // function getColor(total) {
  //   return total> 100000 ? '#800026' :
  //                '#FFEDA0';
  // }

  function changeView(v){
    // if(v === 'population') document.getElementsByClassName("legend")[0].classList.remove('hidden');
    setLocation({
      center: currentLocation.center, 
      zoom: currentLocation.zoom, 
      name: currentLocation.name, 
      layer: currentLocation.layer,
      view: v,
      districtbord: currentLocation.districtbord,
      precinctbord: currentLocation.precinctbord,
      countybord: currentLocation.countybord
    });
    console.log("change view current view: " + currentLocation.view)
  }

  function setStyle(feature) {
    let style = currentLocation.view;
        return{
          //fill property shows 'red' or 'blue' based on republican/democratic district
          fillColor: feature.fill[style],
          color: 'black',
          weight: '1',
          //color: getColor(feature.properties.TOTAL),
          // opacity: 0.6,
          fillOpacity: 0.6
          }
  }

  function outlineStyle(){
    return{
      opacity: 0,
      fillOpacity: 0
    }
  }

  function toggleDistrict(){
    setLocation({
      center: currentLocation.center, 
      zoom: currentLocation.zoom, 
      name: currentLocation.name, 
      layer: currentLocation.layer,
      view: currentLocation.view,
      districtbord: !currentLocation.districtbord,
      precinctbord: currentLocation.precinctbord,
      countybord: currentLocation.countybord
    })
    // console.log("district" + currentLocation.districtbord);
    // console.log("precinct" + currentLocation.precinctbord);
    // console.log("county" + currentLocation.countybord);
  }

  function togglePrecinct(){
    setLocation({
      center: currentLocation.center, 
      zoom: currentLocation.zoom, 
      name: currentLocation.name, 
      layer: currentLocation.layer,
      view: currentLocation.view,
      districtbord: currentLocation.districtbord,
      precinctbord: !currentLocation.precinctbord,
      countybord: currentLocation.countybord
    })
    // console.log("district" + currentLocation.districtbord);
    // console.log("precinct" + currentLocation.precinctbord);
    // console.log("county" + currentLocation.countybord);
  }

  function toggleCounty(){
    setLocation({
      center: currentLocation.center, 
      zoom: currentLocation.zoom, 
      name: currentLocation.name, 
      layer: currentLocation.layer,
      view: currentLocation.view,
      districtbord: currentLocation.districtbord,
      precinctbord: currentLocation.precinctbord,
      countybord: !currentLocation.countybord
    })
    // console.log("district" + currentLocation.districtbord);
    // console.log("precinct" + currentLocation.precinctbord);
    // console.log("county" + currentLocation.countybord);
  }

  /*
  in the render() function the MapContainer() function is returned.
  TileLayer component adds the tiles for the map
  We pass data.venues as props to the Markers component so all markers are displayed on the map
  */

  return (
    <div id='map'>
      <Navigation zoomState={zoomState} className='google-maps' changeView={changeView} toggleDistrict={toggleDistrict} togglePrecinct={togglePrecinct} toggleCounty={toggleCounty}/>
      <MapContainer center={currentLocation.center} zoom={currentLocation.zoom} zoomControl={false} 
        maxBounds={[[19.8283, -130.5795], [54.8283, -58.5795]]} minZoom={5} maxZoom={15} >
        <MyComponent />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON data={tennessee} onEachFeature={highlight} style={setStyle}/>
        <GeoJSON data={southcarolina} onEachFeature={highlight} style={setStyle}/>
        <GeoJSON data={colorado} onEachFeature={highlight} style={setStyle}/>
        <GeoJSON data={southcarolinaOutline} onEachFeature={clicked} style={outlineStyle} />
        <GeoJSON data={tennesseeOutline} onEachFeature={clicked} style={outlineStyle} />
        <GeoJSON data={coloradoOutline} onEachFeature={clicked} style={outlineStyle} />
        <LeftSidebar show={show} name={currentLocation.name} showModal={showModal} hideModal ={hideModal} isOpenModal={isOpenModal}/>
        <RightSidebar show={show} currentState={currentLocation.state} />

        <div className="info-box hidden">
          {!onselect.district && (
            <div className = "census-info-hover">
              <strong>{currentLocation.name} Census Information </strong>
              <p>Hover on each congressional district for more details</p>
            </div>
          )}
          {onselect.district && currentLocation.view === "election" && (
            <ul className="census-info" style={{height:'15%', width:'18%'}}>
              <li><strong>District {onselect.district}</strong></li><br />
              <li>Incumbent: {onselect.incumbent}</li>
              <li>Partisan Lean: {onselect.lean}</li>
            </ul>
          )}
          {onselect.district && currentLocation.view === "population" && (
            <ul className="census-info" style={{height:'fit-content', width:'27%'}}>
              <li><strong>District {onselect.district}</strong></li><br />
              <li>Total Population: {onselect.population}</li>
              <li>White: {onselect.white}</li>
              <li>Black or African American: {onselect.black}</li>
              <li>American Indian and Alaska Native: {onselect.native}</li>
              <li>Asian: {onselect.asian}</li>
              <li>Native Hawaiian and Other Pacific Islander: {onselect.islander}</li>
              <li>Hispanic or Latino: {onselect.hispanic}</li>
            </ul>
          )}
        </div>
        <Legend view={currentLocation.view} />

      </MapContainer>

    </div>
  );
}

export default MapView