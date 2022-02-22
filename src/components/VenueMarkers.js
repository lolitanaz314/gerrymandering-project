import { Fragment } from 'react'
import {Marker} from 'react-leaflet';
import MarkerPopup from './MarkerPopup';

/*Don't worry  about this file */

/* props is venues data from the parent component MapView.js*/
const VenueMarkers = (props) => {
  const { venues } = props;

  const markers = venues.map((venue, index) => (
    <Marker key={index} position={venue.geometry}>
      <MarkerPopup data={venue}/>
    </Marker>
  ));
  return <Fragment>{markers}</Fragment>
}; /* "fragment" tag is added to wrap the markers so we don't add extra nodes to the DOM*/

export default VenueMarkers;