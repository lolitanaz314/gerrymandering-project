import React, { useState, useEffect } from 'react';
import RepDemSplit from './RepDemSplit';

const curveStyle = { //style for graphs
    height: '330px',
    width: 'inherit'
}

const SeawulfEnsemble = (props) => {

    return (<>
    <div id='repdem-split' style={curveStyle} >
        <RepDemSplit />
    </div>
    </>);
}

export default SeawulfEnsemble;