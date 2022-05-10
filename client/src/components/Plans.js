import React, { useState } from 'react'
import { LayersControl, GeoJSON } from 'react-leaflet'
import TN from "../assets/json/tennessee_congressional.json";
import SC from "../assets/json/southcarolina_congressional.json";
import CO from "../assets/json/colorado_congressional.json";

// currently used for the congressional districts for each state
// hopefully would want to add each dp for each state in an array etc etc
const Plans = (props) => {
  // Set all the border data to state array:
  const [borderData, setBorderData] = useState([TN, SC, CO])

  return (
    <>
      <LayersControl position="bottomleft" >
        {
          borderData.map((data) => {
            let state_name = data.name;
            let check = false;
            if(props.view.district && props.currentLocation.jsonCode === data.abbreviation) check = true;
            
            return (
              <>
                <LayersControl.Overlay checked={check} name={state_name}>
                    <GeoJSON key={state_name} data={data} pathOptions={{ color: 'orange' }} />
                </LayersControl.Overlay>
              </>
            )
        })}
      </LayersControl>
    </>
  )
}

export default Plans