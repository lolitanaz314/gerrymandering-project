import React, { useState } from 'react'
import { LayersControl, GeoJSON } from 'react-leaflet'
import TN from "../assets/json/tn_districts.json";
import SC from "../assets/json/sc_districts.json";
import CO from "../assets/json/co_districts.json";

//district border for all states
//doesnt work for colorado..
const Districts = (props) => {
  // Set all the border data to state array:
  const [borderData, setBorderData] = useState([TN, SC, CO])

  return (
    <>
      <LayersControl position="bottomright" >
        {
          borderData.map((data) => {
            let state_name = data.abbreviation;
            let check = false;
            if(props.view.district && props.currentLocation.jsonCode === state_name) check = true;
            
            return (
              <>
                <LayersControl.Overlay checked={check} name={state_name}>
                    <GeoJSON key={state_name} data={data} pathOptions={{ color: 'pink' }} />
                </LayersControl.Overlay>
              </>
            )
        })}
      </LayersControl>
    </>
  )
}

export default Districts