import Plot from 'react-plotly.js';
import State from '../api/service/StateService';
import React, { useState, useEffect } from 'react';

const d1 = {
  y: [0.75, 5.25, 5.5, 6, 6.2, 6.6, 6.80, 7.0, 7.2, 7.5, 7.5, 7.75, 8.15, 8.15, 8.65, 8.93, 9.2, 9.5, 10, 10.25, 11.5, 12, 16, 20.90, 22.3, 23.25,91,0,44,30,3,40,64,12,86,0],
  type: 'box',
  name: '1',
  marker: {
    color: 'rgb(107,174,214)'
  },
  // boxpoints: 'Outliers'
};

const d2 = {
  y: [ 5.25, 5.5, 6, 6.2, 6.6, 6.80, 7.0, 7.2, 7.5, 7.5, 7.75, 8.15, 8.15, 8.65, 8.93, 9.2, 9.5, 10, 10.25, 11.5, 12, 16, 20.90, 22.3, 23.25,34,28,15,15,35,68,40,43,54,65],
  type: 'box',
  name: '2',
  marker: {
    color: 'rgb(107,174,214)'
  },
  // boxpoints: 'Outliers'
};

const d3 = {
  y: [6, 6.2, 6.6, 6.80, 7.0, 7.2, 7.5, 7.5, 7.75, 8.15, 8.15, 8.65, 8.93, 9.2, 9.5, 10, 10.25, 11.5, 12, 16, 20.90, 22.3, 23.25, 27,25,29,46,38,36,74,45,66,46, ],
  type: 'box',
  name: '3',
  marker: {
    color: 'rgb(107,174,214)'
  },
  // boxpoints: 'Outliers'
};

const d4 = {
  y: [ 6.80, 7.0, 7.2, 7.5, 7.5, 7.75, 8.15, 8.15, 8.65, 8.93, 9.2, 9.5, 10, 10.25, 11.5, 12, 16, 20.90, 22.3, 23.25,57,55,39,76,58,36,4,45,66,46, ],
  type: 'box',
  name: '4',
  marker: {
    color: 'rgb(107,174,214)'
  },
  // boxpoints: 'Outliers'
};

const d5 = {
  y: [ 7.75, 8.15, 8.15, 8.65, 8.93, 9.2, 9.5, 10, 10.25, 11.5, 12, 16, 20.90, 22.3, 23.25,96,74,75,66,46, ],
  type: 'box',
  name: '5',
  marker: {
    color: 'rgb(107,174,214)'
  },
  // boxpoints: 'Outliers'
};

const BoxAndWhisker = (props) => {

  return (
      <Plot data={props.box}
        layout={{width: 500, height: 400, title: 'Average Districting Box and Whisker Plot'}} />
    );
}

export default BoxAndWhisker;