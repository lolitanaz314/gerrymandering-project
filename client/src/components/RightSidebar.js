import { Offcanvas } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'

import DistrictPlan from './DistrictPlan';
import DistrictMeasureInfo from './DistrictMeasureInfo';
import StateInfo from './StateInfo';
import BoxAndWhisker from './BoxAndWhisker';
import SeawulfEnsemble from './SeawulfEnsemble';

// const votingData = [
//     { //tenneesee voting data
//         Total: 5384473,
//         White: 3958294,
//         Hispanic: 305717,
//         Black: 864737,
//         Asian: 128329,
//         Native: 123641,
//         Pacific: 7254
//     }, { //sc voting data
//         Total: 4014460,
//         White: 2603421,
//         Hispanic: 231094,
//         Black: 1014792,
//         Asian: 88832,
//         Native: 79739,
//         Pacific: 5846
//     }, { //colorado voting data
//         Total: 4503234,
//         White: 3098236,
//         Hispanic: 864734,
//         Black: 219102,
//         Asian: 205832,
//         Native: 151772,
//         Pacific: 16320
//     }
// ];

const sidebarStyle = {
    margin: '56px 0px 0px 0px',
    width: '55%',
    zIndex: '400'
}

const titleStyle = {
    height: '7%',
    display: 'block'
}

const RightSidebar = (props) => {
    //set default tab
    const [key, setKey] = useState('summary');
    let plans = [];
    if(props.state) plans = props.state.districtPlans;

    //used for the fake data
    let stateID = 0;
    if (props.code === "SC") stateID = 1;
    else if (props.code === "CO") stateID = 2;

    //scrollbar menu functions
    let pinnedDP = 'District Plan #' + props.pinned;
    if (props.pinned === null) pinnedDP = "None";

    return (
        <>
            <Offcanvas style={sidebarStyle} show={props.show} backdrop={false} placement='end'>
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
                    <div id='dp-container'>
                        {(plans).map((obj, index) =>
                            <DistrictPlan
                                key={index} id={index} state={props.currentState} code={props.code}
                                pinDP={(id) => props.pinDP(id)} unpinDP={(id) => props.unpinDP(id)}
                                selectDP={(id) => props.selectDP(id)} plan={obj}
                            />)}
                    </div>
                </div> <hr />

                <Offcanvas.Body>
                    <div id="above-tab"></div>
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
                                            {/* <span className="underline-on-hover">
                                                <Nav.Link href="#voting-age">Voting Age Population</Nav.Link>
                                            </span> */}
                                            <span className="underline-on-hover">
                                                <Nav.Link href="#composite">Composite</Nav.Link>
                                            </span>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            <br></br> <StateInfo name={props.name} compare={props.comparing} state={props.state}
                                pinned={props.pinned} currentDp={props.currentDp} plans={plans} />
                            <div className="jump-link-top">
                                <Button variant="link" href="#above-tab">Back to Top</Button>
                            </div>
                        </Tab>

                        <Tab eventKey="measures" title="Measures">
                            <Navbar bg="light" expand="lg">
                                <Container>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="me-auto">
                                            <span className="underline-on-hover">
                                                <Nav.Link href="#more-measures">Measures</Nav.Link>
                                            </span>
                                            <span className="underline-on-hover">
                                                <Nav.Link href="#political-fairness">Political Fairness</Nav.Link>
                                            </span>
                                            <span className="underline-on-hover">
                                                <Nav.Link href="#radar-chart">Radar Chart</Nav.Link>
                                            </span>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            <br></br> <DistrictMeasureInfo currentDp={props.currentDp} name={props.name}
                                compare={props.comparing} pinned={props.pinned} plans={plans}/>
                            <div className="jump-link-top">
                                <Button variant="link" href="#above-tab">Back to Top</Button>
                            </div>
                        </Tab>

                        <Tab eventKey="ensemble" title="SeaWulf Ensemble">
                            <Navbar bg="light" expand="lg">
                                <Container>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="me-auto">
                                            <span className="underline-on-hover">
                                                <Nav.Link href="#maj-min">Majority-Minority Districts</Nav.Link>
                                            </span>
                                            <span className="underline-on-hover">
                                                <Nav.Link href="#repdem-split">Republican/Democratic Split</Nav.Link>
                                            </span>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            <br></br> <SeawulfEnsemble />
                            <div className="jump-link-top">
                                <Button variant="link" href="#above-tab">Back to Top</Button>
                            </div>
                        </Tab>

                        <Tab eventKey="fairness" title="SeaWulf Fairness">
                            <BoxAndWhisker code={props.code} currentState={props.currentState} currentDp={props.currentDp}
                                demographic={props.demographic} />
                            <div className="jump-link-top">
                                <Button variant="link" href="#above-tab">Back to Top</Button>
                            </div>
                        </Tab>
                    </Tabs>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default RightSidebar;
