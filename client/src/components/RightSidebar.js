import { Offcanvas } from 'react-bootstrap';
import { useState } from 'react'
import React from 'react';
import Modal from "react-bootstrap/Modal";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

// components
import PopUp from './PopUp'
import DistrictPlan from './DistrictPlan';
import DemographicTable from './DemographicTable';

// assets
import boxAndWhisker from '../assets/img/boxAndWhisker.jpeg'
import tennessee_pic from '../assets/img/tennessee_pic.png'
import south_carolina_pic from '../assets/img/south_carolina_pic.png'
import colorado_pic from '../assets/img/colorado_pic.png'
import state_measures from '../assets/img/state_measures.png'
import gerrymander_index from '../assets/img/gerrymander_index.png'
import statemeasures from '../assets/img/state_measures.png'
import seats_to_votes from '../assets/img/seats_to_votes.png'
// import voting_and_population_perc from '../assets/img/voting_and_population_perc.png'

const myComponentStyle = {
    margin: '56px 0px 0px 0px',
    width: '700px',
    zIndex: '400'
}

const titleStyle = {
    height: '7%',
    display: 'block'
}

const imageComponentSidebarStV = {
    width: 275,
    height: 208
}

const imageComponentSidebar_Ten = {
    width: 150,
    height: 50
}

const imageComponentSidebar_SC = {
    width: 150,
    height: 90
}

const imageComponentModal = {
    width: 350,
    height: 130
}


const gerrymanderIndexComponentModal = {
    width: 350,
    height: 230
}

const tableComponent = {
    spacing: 30
}

const RightSidebar = (props) => {
    //set tab
    const [key, setKey] = useState('summary');

    // for the popup
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    let imgSource = colorado_pic;
    let imageComponentSidebar = imageComponentSidebar_SC;
    if (props.name === "Tennessee") {
        imgSource = tennessee_pic;
        imageComponentSidebar = imageComponentSidebar_Ten;
    }
    else if (props.name === "South Carolina") {
        imgSource = south_carolina_pic;
    }

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

    return (
        <>
            <Offcanvas style={myComponentStyle} show={props.show} backdrop={false} placement='end'>
                <Offcanvas.Header style={titleStyle}>
                    <Offcanvas.Title><h2>{props.name}</h2></Offcanvas.Title>
                </Offcanvas.Header>

                <hr />
                    <h5 className='dp-info'> Currently Displaying: District Plan #{props.currentDp} </h5>
                    <h6 className='dp-info'> Pinned Plan For Comparison: {pinnedDP} </h6>
                    <div id='compare-button' className='hidden'>
                        <input type="button" value="Compare" onClick={props.showModal} />
                    </div>
                <div className='scroll-menu'>
                    <div className='left-arrow' onClick={scrollLeft}> &lt; </div>
                    <div className='right-arrow' onClick={scrollRight}> &gt; </div>
                    <div id='dp-container'> {props.dps.map(id =>
                        <DistrictPlan
                            key={id} id={id}
                            pinDP={(id) => props.pinDP(id)}
                            unpinDP={(id) => props.unpinDP(id)}
                            state={props.currentState}
                            selectDP={(id) => props.selectDP(id)}
                        />)}
                    </div>
                </div> <hr />

                <Offcanvas.Body>
                    <Tabs fill justify id="controlled-tab" activeKey={key} onSelect={(k) => setKey(k)}>
                        <Tab eventKey="summary" title="State Summary">
                            {/* <nav class="navbar navbar-expand-lg navbar-light bg-light"> */}
                                {/* <Navbar sticky="top" bg="light" expand="lg"> */}
                                <Navbar bg="light" expand="lg">
                                    <Container>
                                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                        <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="me-auto">
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
                            {/* </nav> */}
                                <br></br>
                                <h5 id="total-pop">{props.name} Population Data 2020</h5>
                                <DemographicTable></DemographicTable>
                            {/* <img src={voting_and_population_perc} style={imageComponentSidebarVert} /> */}
                        </Tab>
                        <Tab eventKey="measures" title="District Plan Measures">
                            <Navbar bg="light" expand="lg">
                                <Container>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="me-auto">
                                            <span className="underline-on-hover">
                                                <Nav.Link href="#districting-sum">Summary</Nav.Link>
                                            </span>
                                            <span className="underline-on-hover">
                                                <Nav.Link href="#more-measures">More Measures</Nav.Link>
                                            </span>
                                            <span className="underline-on-hover">
                                                <Nav.Link href="#seat-vote">Seats to Vote</Nav.Link>
                                            </span>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            <br></br>
                            <div>
                                <h5 id="districting-sum">District Plan {props.currentDp} Summary</h5>
                                <p>
                                    Date: 0000<br></br>
                                    Status: Enacted<br></br>
                                    Proposed By: xyz
                                </p>
                            </div>
                            <br></br>

                            <div>
                                <h5 id="more-measures">More Measures here</h5>
                                <img  src={statemeasures} style={imageComponentSidebar} />
                                <br></br>
                            </div>
                            <br></br>
                            
                            <div>
                                <h5 id="seat-vote">Measure of Fairness - Seats to Votes</h5>
                                <img src={seats_to_votes} style={imageComponentSidebarStV} />
                            </div>
                        </Tab>
                        <Tab eventKey="fairness" title="Fairness">
                            <input type="button" value="Show Box and Whisker Plot" onClick={togglePopup} />
                                {isOpen && <PopUp
                                    content={<>
                                        <p>Box and Whisker Plot</p>
                                        <img src={boxAndWhisker} class="imageResize" />
                                    </>}
                                    handleClose={togglePopup} />}
                        </Tab>
                    </Tabs>
                </Offcanvas.Body>
            </Offcanvas>

            <Modal show={props.isOpenModal} onHide={props.hideModal} size="lg" style={{ zIndex: 500 }}>
                <Modal.Header>
                    <Modal.Title>District Plan Comparison</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    maxHeight: 'calc(100vh - 210px)',
                    overflowY: 'auto'
                }}>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th> District X </th>
                                    <th> District X </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th> <button> <img src={state_measures} style={imageComponentModal} /> </button> </th>
                                    <th> <button><img src={state_measures} style={imageComponentModal} /> </button></th>
                                </tr>
                                <tr>
                                    <th> <button> <img src={gerrymander_index} style={gerrymanderIndexComponentModal} /> </button> </th>
                                    <th> <button><img src={gerrymander_index} style={gerrymanderIndexComponentModal} /> </button></th>
                                </tr>
                                <tr>
                                    <th> Number of anomalous districts: 4 </th>
                                    <th> Number of anomalous districts: 7 </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={props.hideModal}>X</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RightSidebar;
