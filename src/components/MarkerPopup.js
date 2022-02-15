import React from 'react';
import {Popup} from 'react-leaflet';

/* The MarkerPopup component just opens the popup when a marker is clicked on
the map and it displays the venue name in the popup
*/
const MarkerPopup = (props) => {
  const { name } = props.data;
  console.log(name);

  return  (<Popup>
    <div className='popup-text'>{name}</div>
  </Popup>);
};

export default MarkerPopup;