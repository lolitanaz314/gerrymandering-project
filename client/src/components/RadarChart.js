import React from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
  
const RadarCharting = (props) => {
    return (
        <RadarChart outerRadius={90} width={730} height={250} data={props.data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="measure" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar name="District Plan A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Radar name="District Plan B" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            <Legend />
        </RadarChart>
    );
}
  
export default RadarCharting;