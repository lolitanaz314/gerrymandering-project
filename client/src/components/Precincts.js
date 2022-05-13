import { LayersControl, GeoJSON } from 'react-leaflet'
import TN from "../assets/json/tn/tn_precinct.json";
import CO from "../assets/json/co/co_precinct.json";
import SC from '../assets/json/sc/sc_precinct.json';

//used mapshaper to compress the geojson files -> 10%
//precinct border for all states -> sc doesnt work for some reason, but json file is correct...
const Precincts = (props) => {
  // Set all the border data to state array:
  const borderData = [TN, SC, CO];
  
  return (
    <>
      <LayersControl position="bottomright" >
        {
          borderData.map((data) => {
            let state_name = data.abbreviation;
            let check = false;
            if(props.view.precinct && props.currentLocation.jsonCode === state_name) check = true;
            
            return (
              <>
                <LayersControl.Overlay checked={check} name={state_name}>
                    <GeoJSON key={state_name} data={data.coordsToLatLng} pathOptions={{ color: 'red' }} />
                </LayersControl.Overlay>
              </>
            )
        })}
      </LayersControl>
    </>
  )
}

export default Precincts