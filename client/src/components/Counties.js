import { LayersControl, GeoJSON } from 'react-leaflet'
import TN from "../assets/json/tn/tennessee_counties.json";
import SC from "../assets/json/sc/southcarolina_counties.json";
import CO from "../assets/json/co/colorado_counties.json";

//county border for all states
const Counties = (props) => {
  // Set all the border data to state array:
  const borderData = [TN, SC, CO];

  return (
    <>
      <LayersControl position="bottomright" >
        {
          borderData.map((data) => {
            let state_name = data.abbreviation;
            let check = false;
            if(props.view.county && props.currentLocation.jsonCode === state_name) check = true;
            
            return (
              <>
                <LayersControl.Overlay checked={check} name={state_name}>
                    <GeoJSON key={state_name} data={data} pathOptions={{ color: 'green' }} />
                </LayersControl.Overlay>
              </>
            )
        })}
      </LayersControl>
    </>
  )
}

export default Counties