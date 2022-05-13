import { LayersControl, GeoJSON } from 'react-leaflet'
import TN from "../assets/json/tn/tennessee.json";
import SC from "../assets/json/sc/southcarolina.json";
import CO from "../assets/json/co/colorado.json";

const Base = (props) => {
  //zoom state functions
  function clicked(feature, layer) {
    // bind click to geojson
    layer.on('click', () => props.zoomState(feature, layer));
  }
  
  // Set all the border data to state array:
  const borderData = [TN, SC, CO]

  return (
    <>
      <LayersControl position="bottomleft" >
        {
          borderData.map((data) => {
            let state_name = data.properties.name;
            let check = true;
            if(props.currentLocation.jsonCode === data.properties.abbreviation) check = false;

            return (
              <>
                <LayersControl.Overlay checked={check} name={state_name}>
                  <GeoJSON key={state_name} data={data} pathOptions={{ color: 'blue' }} onEachFeature={clicked}/>
                </LayersControl.Overlay>
              </>
            )
        })}
      </LayersControl>
    </>
  )
}

export default Base