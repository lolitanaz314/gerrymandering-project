import Plot from 'react-plotly.js';
import State from '../api/service/StateService';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const BoxAndWhisker = (props) => {

    let demo = false;
    if (props.demographic !== 'None') demo = true;

    const [clicked, setCheck] = useState(false);
    const toggleState = () => setCheck(prevCheck => !prevCheck);

    const [box, setGraphData] = useState({
        y: [0],
        type: 'box',
        name: '0',
        marker: {
            color: 'rgb(107,174,214)'
        }
    }
    );
    useEffect(() => {
        let filter = [];
        State.getBoxAndWhisker(props.code, props.demographic)
            .then(response => {
                let data = response.data.boxAndWhiskers;
                for (let i = 0; i < Object.keys(data).length; i++) {
                    let obj = {
                        y: data[i]["boxAndWhisker"],
                        type: 'box',
                        name: data[i]["districtId"],
                        marker: {
                            color: 'rgb(107,174,214)'
                        }
                    }
                    filter.push(obj);
                }
                setGraphData(filter);
                showBW();
            }).catch(error => { console.log('Something went wrong', error); })
    }, [clicked])

    function showBW() {
        document.getElementById('seawulf').classList.add('hidden');
        document.getElementById('bw').classList.remove('hidden');
    }

    return (<>
        <div>
            <p className='seawulf-desc' id='seawulf'>
                This fairness measure will be calculated using <b>SeaWulf</b>, a High Performance Computing (HPC)
                cluster dedicated to research applications for Stony Brook faculty, staff, and students.
                We will be randomly generating <b>10,000 district plans</b> from a given <b>state</b>, <b>basis
                    for comparision</b> (ex. African American population percent), and <b>selected district plan</b>
                .These plans will be displayed in a <b>box &#38; whisker plot</b>,
                with the selected district plan shown for comparision.
            </p> <br />
            <div>Current District Plan Selected: #{props.currentDp}</div>
            <div>Current Demographic Selected: {props.demographic}</div> <br />
            <Button className={`${demo ? "" : "disabled"}`} onClick={toggleState}> Generate </Button>
        </div> <br />
        <div id='bw' className='hidden'>
            <Plot data={box}
                layout={{ width: 700, height: 500, title: 'Average Districting Box and Whisker Plot' }} />
        </div>
    </>);
}

export default BoxAndWhisker;