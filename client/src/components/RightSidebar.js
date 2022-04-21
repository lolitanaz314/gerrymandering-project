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
import BoxAndWhisker from './BoxAndWhisker';

const testData = [ //testData has data of all plans from all states
    [ //district plans for tennessee
        { //array of dps with info
            id: 0,
            status: "Enacted",
            proposedBy: 'Republican Party',
            compositeData: {
                Democratic: 960129,
                Republican: 1516348,
                Other: 52042
            }
        }, {
            id: 1,
            status: "Proposed",
            proposedBy: 'Republican Party',
            compositeData: {
                Democratic: 980139,
                Republican: 1618378,
                Other: 50793
            }
        }, {
            id: 2,
            status: "Generated",
            proposedBy: 'Democratic Party',
            compositeData: {
                Democratic: 100129,
                Republican: 1246338,
                Other: 42321
            }
        },
    ], [ //district plans for south carolina
        {
            id: 0,
            status: "Enacted",
            proposedBy: 'Republican Party',
            compositeData: {
                Democratic: 887132,
                Republican: 1046758,
                Other: 40712
            }
        }, {
            id: 1,
            status: "Proposed",
            proposedBy: 'South Carolina state Senate',
            compositeData: {
                Democratic: 987232,
                Republican: 946738,
                Other: 42382
            }
        }, {
            id: 2,
            status: "Proposed",
            proposedBy: 'South Carolina state House',
            compositeData: {
                Democratic: 782132,
                Republican: 1240734,
                Other: 53012
            }
        }, {
            id: 3,
            status: "Generated",
            proposedBy: 'South Carolina state House',
            compositeData: {
                Democratic: 801922,
                Republican: 1349558,
                Other: 30132
            }
        }
    ], [ //district plans for colorado
        {
            id: 0,
            status: "Enacted",
            proposedBy: 'Colorado Independent Congressional Redistricting Commission staff',
            compositeData: {
                Democratic: 1478348,
                Republican: 1253070,
                Other: 120439
            }
        }, {
            id: 1,
            status: "Proposed",
            proposedBy: 'Colorado Independent Congressional Redistricting Commission staff',
            compositeData: {
                Democratic: 1135782,
                Republican: 1009287,
                Other: 201921
            }
        }, {
            id: 2,
            status: "Proposed",
            proposedBy: 'Colorado Independent Congressional Redistricting Commission staff',
            compositeData: {
                Democratic: 1348358,
                Republican: 1153570,
                Other: 140739
            }
        }, {
            id: 3,
            status: "Generated",
            proposedBy: 'Colorado Independent Congressional Redistricting Commission staff',
            compositeData: {
                Democratic: 1476448,
                Republican: 1053470,
                Other: 100459
            }
        }
    ]
];

const votingData = [
    { //tenneesee voting data
        Total: 5384473,
        White: 3958294,
        Hispanic: 305717,
        Black: 864737,
        Asian: 128329,
        Native: 123641,
        Pacific: 7254
    }, { //sc voting data
        Total: 4014460,
        White: 2603421,
        Hispanic: 231094,
        Black: 1014792,
        Asian: 88832,
        Native: 79739,
        Pacific: 5846
    }, { //colorado voting data
        Total: 4503234,
        White: 3098236,
        Hispanic: 864734,
        Black: 219102,
        Asian: 205832,
        Native: 151772,
        Pacific: 16320
    }
];

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

    let stateID = 0;
    if (props.code === "SC") stateID = 1;
    else if (props.code === "CO") stateID = 2;

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

    function showBW() {
        document.getElementById('seawulf').classList.add('hidden');
        document.getElementById('bw').classList.remove('hidden');
    }

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
                    <div className='left-arrow' onClick={scrollLeft}> &lt; </div>
                    <div className='right-arrow' onClick={scrollRight}> &gt; </div>
                    <div id='dp-container'>
                        {testData[stateID].map(obj =>
                            <DistrictPlan
                                key={obj.id} id={obj.id} state={props.currentState} code={props.code}
                                pinDP={(id) => props.pinDP(id)} unpinDP={(id) => props.unpinDP(id)}
                                selectDP={(id) => props.selectDP(id)} plan={testData[stateID][obj.id]}
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
                            <br></br> <StateInfo name={props.name} compare={props.comparing} state={props.state}
                                pinned={props.pinned} currentDp={props.currentDp} plan={testData[stateID][props.currentDp]}
                                comparing={testData[stateID][props.pinned]} votingData={votingData[stateID]} />
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
                                            <span className="underline-on-hover">
                                                <Nav.Link href="#radar-chart">Radar Chart</Nav.Link>
                                            </span>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            <br></br> <DistrictMeasureInfo currentDp={props.currentDp} name={props.name}
                                compare={props.comparing} pinned={props.pinned} />
                        </Tab>
                        <Tab eventKey="fairness" title="SeaWulf Fairness">
                            <div id='seawulf'>
                                <p className='seawulf-desc'>
                                    This fairness measure will be calculated using <b>SeaWulf</b>, a High Performance Computing (HPC)
                                    cluster dedicated to research applications for Stony Brook faculty, staff, and students.
                                    We will be randomly generating <b>10,000 district plans</b> from a given <b>state</b>, <b>basis
                                    for comparision</b> (ex. African American population percent), and <b>selected district plan </b>
                                    (currently district plan {props.currentDp}). These plans will be displayed in a <b>box &#38;
                                    whisker plot</b>, with the selected district plan shown for comparision.
                                </p>
                                <input type="button" value="Generate" onClick={showBW} />
                            </div>
                            <div id='bw' className='hidden'>
                                <BoxAndWhisker />
                            </div>
                        </Tab>
                    </Tabs>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default RightSidebar;
