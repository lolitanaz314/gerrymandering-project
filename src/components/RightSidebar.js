import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import React from 'react';
import statemeasures from '../assets/state_measures.png'

const myComponentStyle = {
  margin: '56px 0px 0px 0px',
  width: '348px',
  zIndex: '400'
}

const imageComponentSidebar = {
  width: 300,
  height: 120
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
          

          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default RightSidebar;
