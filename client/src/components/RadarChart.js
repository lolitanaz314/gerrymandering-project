import React from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
  
const RadarCharting = (props) => {

    let radar = <Radar name={"District Plan #" + props.currentDp} dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
    if(props.comparing){
        radar = <>
            <Radar name={"District Plan #" + props.currentDp} dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Radar name={"District Plan #" + props.pinnedDp} dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
        </>
    }

    return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
        <RadarChart outerRadius={90} width={730} height={250} data={props.data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="measure" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            {radar}
            <Legend />
        </RadarChart>
    </ResponsiveContainer>
    );
}
  
export default RadarCharting;