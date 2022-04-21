import React, { useState, useEffect } from 'react';
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

// components
import Navigation from './Navigation';
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
    view: 'election'
  });

  //get state object from server
  const [state, setState] = useState({});
  useEffect(() => {
    if (currentLocation.code !== 'USA') {
      State.getStateById(currentLocation.code)
        .then(response => {
          setState(response.data);
        })
        .catch(error => {
          console.log('Something went wrong', error);
        })
    }
  }, [currentLocation.code]);

  const [districtPlans, setDps] = useState({ currentDp: 0, pinned: null });
  const [layers, setLayers] = useState({ current: null, prev: null });

  //sidebar
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  // if we are currently comparing 2 plans
  const [comparing, setCompare] = useState(false);
  const handleCompare = (val) => setCompare(val);

  //district hovering
  const [onselect, setOnselect] = useState({});
  const highlight = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature
      // ,click: () => zoomState(feature, layer)
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
  })

  //zoom state functions
  function clicked(feature, layer) {
    // bind click to geojson
    layer.on('click', () => zoomState(feature, layer));
  }

  function zoomState(feature, layer) {
    //changes the leaflet map sizing
    let map = document.getElementById('leaflet-map');
    map.classList.add('on-state');

    //resets comparison view
    handleCompare(false);

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
      view: currentLocation.view
    });

    if (layers.current !== layer) {
      let pre = layers.current;
      setLayers({ current: layer, prev: pre })
    }

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

    //resets pinned dp
    let filled = document.getElementsByClassName('icon-filled');
    let unfilled = document.getElementsByClassName('icon-unfilled');
    for (let i = 0; i < filled.length; i++) {
      filled[i].classList.add('hidden');
      unfilled[i].classList.remove('hidden');
    }

    setDps({ currentDp: 0, pinned: null })
  }

  function ZoomComponent() {
    const map = useMap();

    //recenters map after changing window size
    map.invalidateSize();

    //set center & zoom
    map.setView(currentLocation.center, currentLocation.zoom);

    if (layers.current && map.hasLayer(layers.current)) map.removeLayer(layers.current);
    else if (layers.prev) map.addLayer(layers.prev);
    return null;
  }

  function changeView(view) {
    setOnselect({});
    setLocation({
      center: currentLocation.center,
      zoom: currentLocation.zoom,
      name: currentLocation.name,
      code: currentLocation.code,
      view: view
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
      fillOpacity: 0.6
    }
  }

  function outlineStyle() {
    return {
      opacity: 0,
      fillOpacity: 0
    }
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
      <Navigation zoomState={zoomState} className='google-maps' changeView={changeView} />

      <div id='map'>
        <MapContainer center={currentLocation.center} zoom={currentLocation.zoom} zoomSnap={0.1} zoomControl={false} minZoom={5} maxZoom={15}
          maxBounds={[[19.8283, -130.5795], [54.8283, -58.5795]]} id='leaflet-map'>

          <ZoomComponent />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <GeoJSON data={tennessee} onEachFeature={highlight} style={setStyle} />
          <GeoJSON data={southcarolina} onEachFeature={highlight} style={setStyle} />
          <GeoJSON data={colorado} onEachFeature={highlight} style={setStyle} />

          <GeoJSON data={southcarolinaOutline} onEachFeature={clicked} style={outlineStyle} />
          <GeoJSON data={tennesseeOutline} onEachFeature={clicked} style={outlineStyle} />
          <GeoJSON data={coloradoOutline} onEachFeature={clicked} style={outlineStyle} />

          <RightSidebar selectDP={(id) => selectDP(id)} pinDP={(id) => pinDP(id)} unpinDP={(id) => unpinDP(id)}
            show={show} name={currentLocation.name} pinned={districtPlans.pinned}
            currentState={currentLocation.name} currentDp={districtPlans.currentDp} state={state}
            comparing={comparing} setCompare={(val) => handleCompare(val)} code={currentLocation.code}
          />

          <HoverBox name={currentLocation.name} view={currentLocation.view} onselect={onselect} />
          <Legend view={currentLocation.view} />

        </MapContainer>
      </div>
    </div>
  );
}

export default MapView