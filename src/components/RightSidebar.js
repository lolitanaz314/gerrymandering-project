import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import React from 'react';


const myComponentStyle = {
  margin: '56px 0px 0px 0px',
  width: '300px'
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
            <input
              type="button"
              value="Show Box and Whisker Plot"
              onClick={togglePopup}
            />

            <input
              type="button"
              value="Compare"
              onClick={showModal}
            />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default RightSidebar;
