// import { useState } from 'react';
import { Offcanvas} from 'react-bootstrap';

const Sidebar = ({show, handleClose, name}) => {
  
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch
      </Button> */}

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Text
          
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;