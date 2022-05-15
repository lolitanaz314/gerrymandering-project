import React, { useState, useEffect } from 'react';
import RepDemSplit from './RepDemSplit';

const curveStyle = { //style for graphs
    height: '330px',
    width: 'inherit'
}

const SeawulfEnsemble = (props) => {

    return (<>
    <div id='maj-min' >
        
    </div>
        <div id='repdem-split' style={curveStyle} >
            <h5>Republican/Democratic Split</h5>
            <RepDemSplit />
        </div>
    </>);
}

export default SeawulfEnsemble;