import { Offcanvas } from 'react-bootstrap';
import { useState } from 'react'
import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import DistrictPlan from './DistrictPlan';
import DistrictMeasureInfo from './DistrictMeasureInfo';
import StateInfo from './StateInfo';
import boxAndWhisker from '../assets/img/boxAndWhisker.jpeg';

const testData = [ //testData has data of all plans from all states
    [ //district plans for tennessee
      { //array of dps with info
        id: 0,
        status: "Enacted",
        proposedBy: 'Republican Party'
      }, {
        id: 1,
        status: "Proposed",
        proposedBy: 'Republican Party'
      }, {
        id: 2,
        status: "Proposed",
        proposedBy: 'Democratic Party'
      }
    ], [ //district plans for south carolina
      {
        id: 0,
        status: "Enacted",
        proposedBy: 'Republican Party'
      }, {
        id: 1,
        status: "Proposed",
        proposedBy: 'South Carolina state Senate'
      }, {
        id: 2,
        status: "Approved",
        proposedBy: 'South Carolina state House'
      }, {
        id: 3,
        status: "Proposed",
        proposedBy: 'South Carolina state House'
      }
    ], [ //district plans for colorado
      {
        id: 0,
        status: "Enacted",
        proposedBy: 'Colorado Independent Congressional Redistricting Commission staff'
  
      }, {
        id: 1,
        status: "Approved",
        proposedBy: 'Colorado Independent Congressional Redistricting Commission staff'
      }, {
        id: 2,
        status: "Propposed",
        proposedBy: 'Colorado Independent Congressional Redistricting Commission staff'
      }, {
        id: 3,
        status: "Proposed",
        proposedBy: 'Colorado Independent Congressional Redistricting Commission staff'
      }
    ]
]

const headerStyle = {
    margin: '56px 0px 0px 0px',
    width: '700px',
    zIndex: '400'
}

const titleStyle = {
    height: '7%',
    display: 'block'
}

const RightSidebar = (props) => {
    //set default tab
    const [key, setKey] = useState('summary');

    let stateID = 0;
    if(props.code === "SC") stateID = 1;
    else if(props.code === "CO") stateID = 2;

    //scorllbar menu functions
    let menu = document.getElementById('dp-container');
    let pinnedDP = 'District Plan #' + props.pinned;
    if (props.pinned === null) pinnedDP = "None"

    function scrollRight() {
        menu.scrollLeft += 100;
    }

    function scrollLeft() {
        menu.scrollLeft -= 100;
    }

    function showBW(){
        document.getElementById('bw').classList.remove('hidden');
    }

    return (
        <>
            <Offcanvas style={headerStyle} show={props.show} backdrop={false} placement='end'>
                <Offcanvas.Header style={titleStyle}>
                    <Offcanvas.Title><h2>{props.name}</h2></Offcanvas.Title>
                </Offcanvas.Header>

                <hr /> <div className='scroll-header'>
                    <h5 className='dp-info'> Currently Displaying: District Plan #{props.currentDp} </h5>
                    <h6 className='dp-info'> Pinned Plan For Comparison: {pinnedDP} </h6>
                    <div id='compare-button' className={`${props.comparing ? "" : "hidden"}`}>
                        <input type="button" value="Compare" onClick={() => props.setCompare(true)} />
                    </div>
                </div>
                <div className='scroll-menu'>
                    <div className='left-arrow' onClick={scrollLeft}> &lt; </div>
                    <div className='right-arrow' onClick={scrollRight}> &gt; </div>
                    <div id='dp-container'>
                        {props.dps.map(id =>
                            <DistrictPlan
                                key={id} id={id} state={props.currentState}
                                pinDP={(id) => props.pinDP(id)} unpinDP={(id) => props.unpinDP(id)}
                                selectDP={(id) => props.selectDP(id)} plan={testData[stateID][id]}
                        />)}
                    </div>
                </div> <hr />

                <Offcanvas.Body>
                    <Tabs fill justify id="controlled-tab" activeKey={key} onSelect={(k) => setKey(k)}>
                        <Tab eventKey="summary" title="State Summary">
                            <Navbar bg="light" expand="lg">
                                <Container>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="me-auto">
                                            <span className="underline-on-hover">
                                                <Nav.Link href="#districting-sum">Summary</Nav.Link>
                                            </span>
                                            <span className="underline-on-hover">
                                                <Nav.Link href="#total-pop">Total Population</Nav.Link>
                                            </span>
                                            <span className="underline-on-hover">
                                                <Nav.Link href="#voting-age">Voting Age Population</Nav.Link>
                                            </span>
                                            <span className="underline-on-hover">
                                                <Nav.Link href="#composite">Composite</Nav.Link>
                                            </span>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            <br></br> <StateInfo name={props.name} compare={props.comparing} pinned={props.pinned}
                                currentDp={props.currentDp} plan={testData[stateID][props.currentDp]}
                                comparing={testData[stateID][props.pinned]} />
                        </Tab>
                        <Tab eventKey="measures" title="District Plan Measures">
                            <Navbar bg="light" expand="lg">
                                <Container>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="me-auto">
                                            <span className="underline-on-hover">
                                                <Nav.Link href="#more-measures"> Measures</Nav.Link>
                                            </span>
                                            <span className="underline-on-hover">
                                                <Nav.Link href="#seat-vote">Seats to Vote</Nav.Link>
                                            </span>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            <br></br> <DistrictMeasureInfo currentDp={props.currentDp} name={props.name} 
                                compare={props.comparing} pinned={props.pinned} />
                        </Tab>
                        <Tab eventKey="fairness" title="Fairness">
                            <p className='seawulf-desc'>
                                This fairness measure will be calculated using <b>SeaWulf</b>, a High Performance Computing (HPC)
                                cluster dedicated to research applications for Stony Brook faculty, staff, and students. 
                                We will be randomly generating <b>10,000 district plans</b> from a given <b>state</b>, <b>basis for
                                comparision</b> (ex. African American population percent), and <b>selected district plan </b>
                                (currently district plan {props.currentDp}). These plans will be displayed in a <b>box &#38;
                                whisker plot</b>, with the selected district plan shown for comparision.
                            </p>
                            <input type="button" value="Generate" onClick={showBW} />
                            <img src={boxAndWhisker} id='bw' className='box-whisker hidden'/>
                        </Tab>
                    </Tabs>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default RightSidebar;
