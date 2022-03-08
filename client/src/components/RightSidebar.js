import { Offcanvas } from 'react-bootstrap';

import { useState } from 'react'
import React from 'react';
import statemeasures from '../assets/img/state_measures.png'
import seats_to_votes from '../assets/img/seats_to_votes.png'
import voting_and_population_perc from '../assets/img/voting_and_population_perc.png'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import UserTable from './UserTable';

const myComponentStyle = {
    margin: '56px 0px 0px 0px',
    width: '300px',
    zIndex: '400'
}

const imageComponentSidebar = {
    width: 275,
    height: 100
}

const imageComponentSidebarStV = {
    width: 275,
    height: 208
}

const imageComponentSidebarVert = {
    width: 270,
    height: 500
}

const RightSidebar = (props) => {
    //set tab
    const [key, setKey] = useState('summary');

    return (
        <>
            <Offcanvas style={myComponentStyle} show={props.show} backdrop={false} placement='end'>
                <Offcanvas.Body>
                    <Tabs id="controlled-tab" activeKey={key} onSelect={(k) => setKey(k)}>
                        <Tab eventKey="summary" title="Summary">
                            <img src={voting_and_population_perc} style={imageComponentSidebarVert} />
                            <UserTable></UserTable>
                        </Tab>
                        <Tab eventKey="measures" title="Measures">
                            <div>
                                <img src={statemeasures} style={imageComponentSidebar} />
                                Measure of Fairness - Seats to Votes
                                <img src={seats_to_votes} style={imageComponentSidebarStV} />
                            </div>
                        </Tab>
                    </Tabs>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default RightSidebar;
