import React from 'react';
import Plot from 'react-plotly.js';

const RadarCharting = (props) => {
    let data = [props.dataA];
    if (props.comparing) data = [props.dataA, props.dataB];

    return (
        <Plot data={data}
            layout={{polar: {radialaxis: {visible: true, range: [0, 50]}}, height: 380}} />
    );
}

export default RadarCharting;