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

// This is one output after fetching and adding attributes
const bwAsianTN = [
    {
        "y": [
            0.1003482771,
            0.1105100376,
            0.1356506255,
            0.1473535334,
            0.1772470763
        ],
        "type": "box",
        "name": "1",
        "marker": {
            "color": "rgb(107,174,214)"
        }
    },
    {
        "y": [
            0.1095362581,
            0.1082930943,
            0.1313223078,
            0.1477361751,
            0.1696579598
        ],
        "type": "box",
        "name": "2",
        "marker": {
            "color": "rgb(107,174,214)"
        }
    },
    {
        "y": [
            0.1025234632,
            0.1083626706,
            0.1388707475,
            0.1506273351,
            0.176621377
        ],
        "type": "box",
        "name": "3",
        "marker": {
            "color": "rgb(107,174,214)"
        }
    },
    {
        "y": [
            0.1072331669,
            0.1124550232,
            0.1281576971,
            0.1507320254,
            0.1746755184
        ],
        "type": "box",
        "name": "4",
        "marker": {
            "color": "rgb(107,174,214)"
        }
    },
    {
        "y": [
            0.1032706687,
            0.1086361477,
            0.1381271449,
            0.1490171735,
            0.1650920307
        ],
        "type": "box",
        "name": "5",
        "marker": {
            "color": "rgb(107,174,214)"
        }
    },
    {
        "y": [
            0.1078752706,
            0.1195508677,
            0.1363978657,
            0.145527727,
            0.1791820932
        ],
        "type": "box",
        "name": "6",
        "marker": {
            "color": "rgb(107,174,214)"
        }
    },
    {
        "y": [
            0.1028926267,
            0.1175655675,
            0.1379699123,
            0.1478879775,
            0.1749991138
        ],
        "type": "box",
        "name": "7",
        "marker": {
            "color": "rgb(107,174,214)"
        }
    },
    {
        "y": [
            0.1023544515,
            0.1163192058,
            0.1262532675,
            0.1572821415,
            0.1737106992
        ],
        "type": "box",
        "name": "8",
        "marker": {
            "color": "rgb(107,174,214)"
        }
    },
    {
        "y": [
            0.1073547647,
            0.1161723437,
            0.1398154997,
            0.1482378612,
            0.1725711881
        ],
        "type": "box",
        "name": "9",
        "marker": {
            "color": "rgb(107,174,214)"
        }
    }
]

const BoxAndWhisker = (props) => {
  // goal: replace [d1, d2, d3, d4, d5] with props.box
  
  // I also left one sample output that you can paste into "data": bwAsianTN

  return (
      <Plot data= {props.box}
        layout={{width: 500, height: 400, title: 'Average Districting Box and Whisker Plot'}} />
    );
}

export default BoxAndWhisker;