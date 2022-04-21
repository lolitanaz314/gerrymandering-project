import React from 'react';
import { Radar, RadarChart, PolarGrid, Legend,
    PolarAngleAxis, PolarRadiusAxis } from 'recharts';
  
const RadarCharting = () => {
    // Sample data
    const data = [
        {
            "measure": "Majority-Minority Districts",
            "A": 120,
            "B": 110,
            "fullMark": 150
          },
          {
            "measure": "Efficiency Gap",
            "A": 98,
            "B": 130,
            "fullMark": 150
          },
          {
            "measure": "Competitive Districts",
            "A": 86,
            "B": 130,
            "fullMark": 150
          },
          {
            "measure": "Projected Political Fairness",
            "A": 99,
            "B": 100,
            "fullMark": 150
          },
          {
            "measure": "Compactness",
            "A": 85,
            "B": 90,
            "fullMark": 150
          },
    ];
  
    return (
        <RadarChart outerRadius={90} width={730} height={250} data={data}>
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