import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
// assets
import boxAndWhisker from '../assets/boxAndWhisker.jpeg'
// components
import PopUp from './PopUp'

const myComponentStyle = {
  margin: '56px 0px 0px 0px'
}

const Sidebar = ({ show, handleClose, name, openDrawer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Offcanvas style = {myComponentStyle} show={show} onHide={handleClose} backdrop={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{name}</Offcanvas.Title>
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
              onClick={openDrawer}
            />

            {isOpen && <PopUp
              content={<>
                <p>Box and Whisker Plot</p>
                <img src={boxAndWhisker} class="imageResize" />
              </>}
              handleClose={togglePopup}
            />}

          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;