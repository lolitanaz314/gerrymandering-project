import { LayersControl, GeoJSON } from 'react-leaflet'
import TN from "../assets/json/tn/tennessee_congressional.json";
import TN1 from "../assets/json/tn/tn1.json";

// currently used for the congressional districts for each state
// hopefully would want to add each dp for each state in an array etc etc
const Tennessee = (props) => {
  // Set all the border data to state array:
  // TN is same as TN1
  const borderData = [TN, TN1]; 
  const colorings = ['orange', 'purple', 'black', 'pink'];

  const highlight = (feature, layer) => {
    layer.on('mouseover', props.highlightFeature );
  }

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
                <LayersControl.Overlay checked={check} name={state_name+index}>
                    <GeoJSON key={state_name} data={data} pathOptions={{ color: colorings[index] }}
                    onEachFeature={highlight} />
                </LayersControl.Overlay>
              </>
            )
        })}
      </LayersControl>
    </>
  )
}

export default Tennessee