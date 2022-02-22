import { useState } from 'react';
import { Offcanvas} from 'react-bootstrap';
// assets
import boxAndWhisker from '../assets/boxAndWhisker.jpeg'
// components
import PopUp from './PopUp'


const Sidebar = ({show, handleClose, name}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} backdrop={false}>
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

          {isOpen && <PopUp
                content={<>
                  <p>Box and Whisker Plot</p>
                  <img src={boxAndWhisker} class="imageResize"/>
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