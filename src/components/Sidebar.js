// import { useState } from 'react';
import { Offcanvas} from 'react-bootstrap';
import PopUp from './PopUp'

const Sidebar = ({show, handleClose, name}) => {
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch
      </Button> */}

      <Offcanvas show={show} onHide={handleClose} backdrop={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

          <button> Show Box and Whisker Plot </button>
          <PopUp/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;