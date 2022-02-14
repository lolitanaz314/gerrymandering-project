import L from 'leaflet';

/*
creates an object for the custom marker icon for the leaflet map.
The SVG file is located in "assets" (it's literally just a 'pin' icon)
*/

export const VenueLocationIcon = L.icon({
  iconUrl: require('../assets/venue_location_icon.svg'),
  iconRetinaUrl: require('../assets/venue_location_icon.svg'),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: 'leaflet-venue-icon'
});