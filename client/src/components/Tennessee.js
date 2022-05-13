import { LayersControl, GeoJSON } from 'react-leaflet'
import TN from "../assets/json/tn/tennessee_congressional.json";

// currently used for the congressional districts for each state
// hopefully would want to add each dp for each state in an array etc etc
const Tennessee = (props) => {
  // Set all the border data to state array:
  const borderData = [TN]; 
  const colorings = ['orange', 'pink', 'black', 'white'];

  return (
    <>
      <LayersControl position="bottomleft" >
        {
          borderData.map((data, index) => {
            let state_name = data.abbreviation;
            let check = false;
            if(props.view.district && props.currentLocation.jsonCode === state_name){
              if(props.districtPlans.currentDp === index) check = true;
              if(props.districtPlans.pinned && props.districtPlans.pinned === index) check = true;
            }
            
            return (
              <>
                <LayersControl.Overlay checked={check} name={state_name}>
                    <GeoJSON key={state_name} data={data} pathOptions={{ color: colorings[index] }} />
                </LayersControl.Overlay>
              </>
            )
        })}
      </LayersControl>
    </>
  )
}

export default Tennessee