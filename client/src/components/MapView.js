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
import RightSidebar from './RightSidebar';
import Legend from './Legend';
import HoverBox from './HoverBox';

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
    countybord: false,
    currentDp: 0,
    pinned: null
  });

  //sidebar
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  //district hovering
  const [onselect, setOnselect] = useState({});

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
      // ,mouseout: resetHighlight
    });
  }

  const highlightFeature = (e => {
    let layer = e.target;
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
  function clicked(feature, layer) {
    // bind click
    layer.on('click', () => zoomState(feature, layer));
    // console.log("Clicked");
  }

  function zoomState(state, layer) {
    //changes the leaflet map sizing
    let map = document.getElementById('leaflet-map');
    map.classList.add('on-state');

    setOnselect({}); //resets the info box if user clicks on a new state
    let polygon = new L.Polygon(state.geometry.coordinates);
    let bounds = polygon.getBounds();
    let center = bounds.getCenter();
    let latitude = center.lng + 1.2;
    let longitude = center.lat;
    let coords = { lat: latitude, lng: longitude };

    //reset pinned dp
    if (currentLocation.pinned !== null) {
      document.getElementById(currentLocation.name + '-fill-' + currentLocation.pinned).classList.add('hidden');
      document.getElementById(currentLocation.name + '-outline-' + currentLocation.pinned).classList.remove('hidden');
    }
    setLocation({
      center: coords,
      zoom: 6.5,
      name: state.properties.name,
      layer: layer,
      view: currentLocation.view,
      districtbord: currentLocation.districtbord,
      precinctbord: currentLocation.precinctbord,
      countybord: currentLocation.countybord,
      currentDp: 0,
      pinned: null
    });
    handleShow();
    // state.data = state.properties.name.toLowerCase();

    //changes css to show hover boxes
    document.getElementsByClassName("info-box")[0].classList.remove('hidden');
    document.getElementsByClassName("legend")[0].classList.remove('hidden');
  }

  function MyComponent() {
    const map = useMap();

    //recenters map after changing window size
    map.invalidateSize();

    //zoom
    map.setView(currentLocation.center, currentLocation.zoom);
    if (currentLocation.layer) {
      if (map.hasLayer(currentLocation.layer)) map.removeLayer(currentLocation.layer);
      // else map.addLayer(currentLocation.layer);
    }
    return null;
  }

  function changeView(v) {
    setOnselect({});
    setLocation({
      center: currentLocation.center,
      zoom: currentLocation.zoom,
      name: currentLocation.name,
      layer: currentLocation.layer,
      view: v,
      districtbord: currentLocation.districtbord,
      precinctbord: currentLocation.precinctbord,
      countybord: currentLocation.countybord,
      currentDp: currentLocation.currentDp,
      pinned: currentLocation.pinned
    });
    console.log("change view to: " + currentLocation.view)
  }

  function setStyle(feature) {
    let style = currentLocation.view;
    return {
      //fill property shows 'red' or 'blue' based on republican/democratic district
      fillColor: feature.fill[style],
      color: 'black',
      weight: '1',
      //color: getColor(feature.properties.TOTAL),
      // opacity: 0.6,
      fillOpacity: 0.6
    }
  }

  function outlineStyle() {
    return {
      opacity: 0,
      fillOpacity: 0
    }
  }

  function toggleDistrict() {
    setLocation({
      center: currentLocation.center,
      zoom: currentLocation.zoom,
      name: currentLocation.name,
      layer: currentLocation.layer,
      view: currentLocation.view,
      districtbord: !currentLocation.districtbord,
      precinctbord: currentLocation.precinctbord,
      countybord: currentLocation.countybord,
      currentDp: currentLocation.currentDp,
      pinned: currentLocation.pinned
    })
  }

  function togglePrecinct() {
    setLocation({
      center: currentLocation.center,
      zoom: currentLocation.zoom,
      name: currentLocation.name,
      layer: currentLocation.layer,
      view: currentLocation.view,
      districtbord: currentLocation.districtbord,
      precinctbord: !currentLocation.precinctbord,
      countybord: currentLocation.countybord,
      currentDp: currentLocation.currentDp,
      pinned: currentLocation.pinned
    })
  }

  function toggleCounty() {
    setLocation({
      center: currentLocation.center,
      zoom: currentLocation.zoom,
      name: currentLocation.name,
      layer: currentLocation.layer,
      view: currentLocation.view,
      districtbord: currentLocation.districtbord,
      precinctbord: currentLocation.precinctbord,
      countybord: !currentLocation.countybord,
      currentDp: currentLocation.currentDp,
      pinned: currentLocation.pinned
    })
  }

  //scrolling menu functions
  let dps = [0, 1, 2, 3];

  function selectDP(id) {
    //remove selected from class name (if previously selected)
    let plans = document.getElementsByClassName('dp-item');
    for (let i = 0; i < plans.length; i++) {
      if (i !== id) {
        plans[i].classList.remove('dp-selected');
      } else {
        plans[i].classList.add('dp-selected');
      }
    }

    //show compare button if a dp is pinned as well
    if(currentLocation.pinned && currentLocation.pinned !== id){
      document.getElementById('compare-button').classList.remove('hidden');
    }else{
      document.getElementById('compare-button').classList.add('hidden');
    }

    setLocation({
      center: currentLocation.center,
      zoom: currentLocation.zoom,
      name: currentLocation.name,
      layer: currentLocation.layer,
      view: currentLocation.view,
      districtbord: currentLocation.districtbord,
      precinctbord: currentLocation.precinctbord,
      countybord: currentLocation.countybord,
      currentDp: id,
      pinned: currentLocation.pinned
    })
  }

  function pinDP(id) {
    //allow only one dp to be pinned
    if (currentLocation.pinned !== null) {
      document.getElementById(currentLocation.name + '-fill-' + currentLocation.pinned).classList.add('hidden');
      document.getElementById(currentLocation.name + '-outline-' + currentLocation.pinned).classList.remove('hidden');
    }

    let pin = document.getElementById(currentLocation.name + '-outline-' + id);
    let show = document.getElementById(currentLocation.name + '-fill-' + id);
    pin.classList.add('hidden');
    show.classList.remove('hidden');

    setLocation({
      center: currentLocation.center,
      zoom: currentLocation.zoom,
      name: currentLocation.name,
      layer: currentLocation.layer,
      view: currentLocation.view,
      districtbord: currentLocation.districtbord,
      precinctbord: currentLocation.precinctbord,
      countybord: currentLocation.countybord,
      currentDp: currentLocation.currentDp,
      pinned: id
    })
  }

  function unpinDP(id) {
    let pin = document.getElementById(currentLocation.name + '-outline-' + id);
    let show = document.getElementById(currentLocation.name + '-fill-' + id);
    pin.classList.remove('hidden');
    show.classList.add('hidden');

    setLocation({
      center: currentLocation.center,
      zoom: currentLocation.zoom,
      name: currentLocation.name,
      layer: currentLocation.layer,
      view: currentLocation.view,
      districtbord: currentLocation.districtbord,
      precinctbord: currentLocation.precinctbord,
      countybord: currentLocation.countybord,
      currentDp: currentLocation.currentDp,
      pinned: null
    })
  }
  /*
  in the render() function the MapContainer() function is returned.
  TileLayer component adds the tiles for the map
  We pass data.venues as props to the Markers component so all markers are displayed on the map
  */

  return (
    <div>
      <Navigation zoomState={zoomState} className='google-maps' changeView={changeView}
        toggleDistrict={toggleDistrict} togglePrecinct={togglePrecinct} toggleCounty={toggleCounty} />
      <div id='map'>
        <MapContainer center={currentLocation.center} zoom={currentLocation.zoom} zoomControl={false} minZoom={5} maxZoom={15}
          maxBounds={[[19.8283, -130.5795], [54.8283, -58.5795]]} id='leaflet-map'>

          <MyComponent />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <GeoJSON data={tennessee} onEachFeature={highlight} style={setStyle} />
          <GeoJSON data={southcarolina} onEachFeature={highlight} style={setStyle} />
          <GeoJSON data={colorado} onEachFeature={highlight} style={setStyle} />

          <GeoJSON data={southcarolinaOutline} onEachFeature={clicked} style={outlineStyle} />
          <GeoJSON data={tennesseeOutline} onEachFeature={clicked} style={outlineStyle} />
          <GeoJSON data={coloradoOutline} onEachFeature={clicked} style={outlineStyle} />

          <RightSidebar selectDP={(id) => selectDP(id)} pinDP={(id) => pinDP(id)} unpinDP={(id) => unpinDP(id)}
            show={show} dps={dps} name={currentLocation.name} pinned={currentLocation.pinned}
            currentState={currentLocation.name} currentDp={currentLocation.currentDp}
            showModal={showModal} hideModal={hideModal} isOpenModal={isOpenModal}
          />

          <HoverBox name={currentLocation.name} view={currentLocation.view} onselect={onselect} />
          <Legend view={currentLocation.view} />

        </MapContainer>
      </div>
    </div>
  );
}

export default MapView