import { LayersControl, GeoJSON } from 'react-leaflet'
import CO from "../assets/json/co/colorado_congressional.json";
import CO1 from "../assets/json/co/co1.json";
import CO2 from "../assets/json/co/co2.json";
import CO3 from "../assets/json/co/co3.json";

// currently used for the congressional districts for each state
// hopefully would want to add each dp for each state in an array etc etc
const Colorado = (props) => {
  // Set all the border data to state array:
  const borderData = [CO, CO1, CO2, CO3];
  const colorings = ['orange', 'purple', 'black', 'pink'];

  const highlight = (feature, layer) => {
    layer.on({
      mouseover: props.highlightFeature
    });
  }

  return (
    <>
      <LayersControl position="bottomleft">
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

export default Colorado