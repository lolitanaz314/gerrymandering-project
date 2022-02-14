import React, { Fragment } from 'react'
import {Marker} from 'react-leaflet';
import {VenueLocationIcon} from './VenueLocationIcon';
import MarkerPopup from './MarkerPopup';

/* props is venues data from the parent component MapView.js*/
const VenueMarkers = (props) => {
  const { venues } = props;

  const markers = venues.map((venue, index) => (
    <Marker key={index} position={venue.geometry} icon={VenueLocationIcon}>
      <MarkerPopup data={venue}/>
    </Marker>
  ));
  return <Fragment>{markers}</Fragment>
}; /* "fragment" tag is added to wrap the markers so we don't add extra nodes to the DOM*/

export default VenueMarkers;