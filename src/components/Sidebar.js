import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';

// assets
import boxAndWhisker from '../assets/boxAndWhisker.jpeg'
import tennessee_pic from '../assets/tennessee_pic.png'
// components
import PopUp from './PopUp'

const myComponentStyle = {
  margin: '56px 0px 0px 0px'
}

const imageComponent = {
  width: 150,
  height: 50
}

const tableComponent = {
  spacing: 30
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
          <Offcanvas.Title><h2>{name}</h2></Offcanvas.Title>
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
                <img src={boxAndWhisker} class="imageResize" />
              </>}
              handleClose={togglePopup}
            />}

            <div>
              <h4>
                Proposed plans
              </h4>
            </div>

            <table style={tableComponent}>
              <tr>
                  <th> <img src={tennessee_pic} style = {imageComponent} /></th>
                  <th> <img src={tennessee_pic} style = {imageComponent} /></th>
              </tr>
              <tr>
                  <th> <img src={tennessee_pic} style = {imageComponent} /></th>
                  <th> <img src={tennessee_pic} style = {imageComponent} /></th>
              </tr>
              <tr>
                  <th> <img src={tennessee_pic} style = {imageComponent} /></th>
                  <th> <img src={tennessee_pic} style = {imageComponent} /></th>
              </tr>
              <tr>
                  <th> <img src={tennessee_pic} style = {imageComponent} /></th>
                  <th> <img src={tennessee_pic} style = {imageComponent} /></th>
              </tr>
              <tr>
                  <th> <img src={tennessee_pic} style = {imageComponent} /></th>
                  <th> <img src={tennessee_pic} style = {imageComponent} /></th>
              </tr>
              <tr>
                  <th> <img src={tennessee_pic} style = {imageComponent} /></th>
                  <th> <img src={tennessee_pic} style = {imageComponent} /></th>
              </tr>
              <tr>
                  <th> <img src={tennessee_pic} style = {imageComponent} /></th>
                  <th> <img src={tennessee_pic} style = {imageComponent} /></th>
              </tr>
              <tr>
                  <th> <img src={tennessee_pic} style = {imageComponent} /></th>
                  <th> <img src={tennessee_pic} style = {imageComponent} /></th>
              </tr>
            </table>

            <input
              type="button"
              value="Compare"
              onClick={openDrawer}
            />
            
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;