import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// components
import Navigation from './Navigation';
import Base from './Base';
import Counties from './Counties';
import Precincts from './Precincts';
import Tennessee from './Tennessee';
import South from './South';
import Colorado from './Colorado';
import RightSidebar from './RightSidebar';
import Legend from './Legend';
import HoverBox from './HoverBox';
import State from '../api/service/StateService';
import './style/Legend.css';

/*
currentLocation contains fallback coordinates of the center of the United States
These settings will make the map center on the middle of the US with a zoom level of 5 on page load
*/

const MapView = (props) => {
  //mainly used for map zoom
  const [currentLocation, setLocation] = useState({
    center: { lat: 39.8283, lng: -98.5795 },
    zoom: 5,
    name: 'USA',
    code: 'TN',
    jsonCode: 'USA',
    view: 'election'
  });

  //get state object from server
  const [state, setState] = useState({});
  // useEffect(() => {
  //     State.getStateById(currentLocation.code)
  //       .then(response => {
  //         setState(response.data);
  //       })
  //       .catch(error => {
  //         console.log('Something went wrong', error);
  //       })
  // }, [currentLocation.code]);

  //change view (border lines)
  const [view, setBorder] = useState({
    district: true,
    county: false,
    precinct: false
  });
  //toggles value of item in object state
  const toggleBorder = (key) => setBorder((prevValue) => ({
    ...prevValue,
    [key]: !prevValue[key]
  }))

  //state to store selected dp and pinned dp from scroll menu
  const [districtPlans, setDps] = useState({ currentDp: 0, pinned: null });

  //change demographic
  const [demographic, setDemographic] = useState("None");
  const changeDemographic = (demo) => setDemographic(demo);

  //sidebar
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  // if we are currently comparing 2 plans
  const [comparing, setCompare] = useState(false);
  const handleCompare = (val) => setCompare(val);

  //district hovering
  const [onselect, setOnselect] = useState({});

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
  })

  function zoomState(feature, layer) {
    //changes the leaflet map sizing
    let map = document.getElementById('leaflet-map');
    map.classList.add('on-state');

    //resets comparison view
    handleCompare(false);
    setBorder({
      district: true,
      precinct: false,
      county: false
    });

    let polygon = new L.Polygon(feature.geometry.coordinates);
    let bounds = polygon.getBounds();
    let center = bounds.getCenter();
    let latitude = center.lng + 1.2;
    let longitude = center.lat;
    let coords = { lat: latitude, lng: longitude };

    setLocation({
      center: coords,
      zoom: 6.7,
      name: feature.properties.name,
      code: feature.properties.abbreviation,
      jsonCode: feature.properties.abbreviation,
      view: currentLocation.view
    });

    //shows sidebar
    handleShow();

    //changes css to show hover boxes
    setOnselect({});
    document.getElementsByClassName("info-box")[0].classList.remove('hidden');
    document.getElementsByClassName("legend")[0].classList.remove('hidden');

    //resets fairness tab
    document.getElementById('bw').classList.add('hidden');
    document.getElementById('seawulf').classList.remove('hidden');

    //resets compare button
    document.getElementById('compare-button').classList.add('hidden');

    //resets selected dp styling
    let plans = document.getElementsByClassName('dp-item');
    for (let i = 0; i < plans.length; i++) {
      if (i !== 0) {
        plans[i].classList.remove('dp-selected');
      } else {
        plans[i].classList.add('dp-selected');
      }
    }

    //resets pinned dp & updates state
    let filled = document.getElementsByClassName('icon-filled');
    let unfilled = document.getElementsByClassName('icon-unfilled');
    for (let i = 0; i < filled.length; i++) {
      filled[i].classList.add('hidden');
      unfilled[i].classList.remove('hidden');
    }
    setDps({ currentDp: 0, pinned: null })
  }

  //component is needed to change the zoom level, center for leaflet
  function ZoomComponent() {
    const map = useMap();

    //recenters map after changing window size
    map.invalidateSize();

    //set center & zoom
    map.setView(currentLocation.center, currentLocation.zoom);
    return null;
  }

  //scrolling menu functions
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
    if (districtPlans.pinned && districtPlans.pinned !== id) {
      document.getElementById('compare-button').classList.remove('hidden');
    } else {
      document.getElementById('compare-button').classList.add('hidden');
      //resets comparision view
      handleCompare(false);
    }

    setDps({
      currentDp: id, pinned: districtPlans.pinned
    })
  }

  function pinDP(id) {
    //allow only one dp to be pinned
    if (districtPlans.pinned !== null) {
      document.getElementById(currentLocation.name + '-fill-' + districtPlans.pinned).classList.add('hidden');
      document.getElementById(currentLocation.name + '-outline-' + districtPlans.pinned).classList.remove('hidden');
    }

    let pin = document.getElementById(currentLocation.name + '-outline-' + id);
    let show = document.getElementById(currentLocation.name + '-fill-' + id);
    pin.classList.add('hidden');
    show.classList.remove('hidden');

    //show compare button if a dp is selected as well
    if (districtPlans.currentDp !== id) {
      document.getElementById('compare-button').classList.remove('hidden');
    } else {
      document.getElementById('compare-button').classList.add('hidden');
      //resets comparision view
      handleCompare(false);
    }

    setDps({
      currentDp: districtPlans.currentDp, pinned: id
    })
  }

  function unpinDP(id) {
    let pin = document.getElementById(currentLocation.name + '-outline-' + id);
    let show = document.getElementById(currentLocation.name + '-fill-' + id);
    pin.classList.remove('hidden');
    show.classList.add('hidden');

    //remove compare button
    document.getElementById('compare-button').classList.add('hidden');
    //resets comparision view
    handleCompare(false);

    setDps({
      currentDp: districtPlans.currentDp, pinned: null
    })
  }

  return (
    <div>
      <Navigation className='google-maps' zoomState={zoomState} name={currentLocation.name} demographic={demographic} view={view}
        changeDemographic={(demo) => changeDemographic(demo)} show={show} toggleBorder={(line) => toggleBorder(line)} />

      <div id='map'>
        <MapContainer center={currentLocation.center} zoom={currentLocation.zoom} zoomSnap={0.1} zoomControl={false} minZoom={5} maxZoom={15}
          maxBounds={[[19.8283, -130.5795], [54.8283, -58.5795]]} id='leaflet-map'>

          <ZoomComponent />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Base zoomState={zoomState} currentLocation={currentLocation} />
          <Tennessee currentLocation={currentLocation} view={view} districtPlans={districtPlans} highlightFeature={highlightFeature} />
          <South currentLocation={currentLocation} view={view} districtPlans={districtPlans} highlightFeature={highlightFeature} />
          <Colorado currentLocation={currentLocation} view={view} districtPlans={districtPlans} highlightFeature={highlightFeature} />

          <Counties currentLocation={currentLocation} view={view} />
          <Precincts currentLocation={currentLocation} view={view} />

          <RightSidebar selectDP={(id) => selectDP(id)} pinDP={(id) => pinDP(id)} unpinDP={(id) => unpinDP(id)}
            show={show} name={currentLocation.name} pinned={districtPlans.pinned} demographic={demographic}
            currentState={currentLocation.name} currentDp={districtPlans.currentDp} state={state}
            comparing={comparing} setCompare={(val) => handleCompare(val)} code={currentLocation.code} />

          <HoverBox name={currentLocation.name} view={currentLocation.view} onselect={onselect} />
          <Legend view={currentLocation.view} />

        </MapContainer>
      </div>
    </div>
  );
}

export default MapView