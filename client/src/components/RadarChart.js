import React from 'react';
// import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import Plot from 'react-plotly.js';

  
const RadarCharting = (props) => {
    let data = [props.dataA];
    if(props.comparing){
        data=[props.dataA,props.dataB];
    }

    return (
        <Plot data={data}
            layout={
                {  polar: {
                radialaxis: {
                  visible: true,
                  range: [0, 50]
                }
              },width: 500, height: 400, title: 'Radar Chart'}} />
    );
}
  
export default RadarCharting;