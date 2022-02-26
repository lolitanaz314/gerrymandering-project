import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import React from 'react';
import statemeasures from '../assets/state_measures.png'
import seats_to_votes from '../assets/seats_to_votes.png'
import voting_and_population_perc from '../assets/voting_and_population_perc.png'

const myComponentStyle = {
  margin: '56px 0px 0px 0px',
  width: '348px',
  zIndex: '400'
}

const imageComponentSidebar = {
  width: 330,
  height: 120
}

const imageComponentSidebarStV = {
  width: 330,
  height: 250
}

const imageComponentSidebarVert= {
  width: 220,
  height: 450
}

const RightSidebar = ({ show, name, showModal }) => {
  // for the toggle
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Offcanvas style={myComponentStyle} show={show} backdrop={false} placement='end'>
        <Offcanvas.Header>
          <Offcanvas.Title><h2>{name}</h2></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            Requirements Analysis
            <img src={statemeasures} style = {imageComponentSidebar} />

            Measure of Fairness - Seats to Votes
            <img src={seats_to_votes} style = {imageComponentSidebarStV} />
            
            <img src={voting_and_population_perc}  style={imageComponentSidebarVert}/>
            
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default RightSidebar;
