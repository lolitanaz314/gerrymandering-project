import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import React from 'react';
import Modal from "react-bootstrap/Modal";

// assets
import boxAndWhisker from '../assets/boxAndWhisker.jpeg'
import tennessee_pic from '../assets/tennessee_pic.png'
import state_measures from '../assets/state_measures.png'
import gerrymander_index from '../assets/gerrymander_index.png'
// components
import PopUp from './PopUp'

const myComponentStyle = {
  margin: '56px 0px 0px 0px'
}

const imageComponentSidebar = {
  width: 150,
  height: 50
}

const imageComponentModal = {
  width: 350,
  height: 150
}

const gerrymanderIndexComponentModal = {
  width: 350,
  height: 200
}

const tableComponent = {
  spacing: 30
}

const Sidebar = ({ show, handleClose, name, showModal, hideModal, isOpenModal }) => {
  // for the toggle
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
                  <th> <button> <img src={tennessee_pic} style = {imageComponentSidebar} /> </button> </th>
                  <th> <button><img src={tennessee_pic} style = {imageComponentSidebar} /> </button></th>
              </tr>
              <tr>
                  <th> <button> <img src={tennessee_pic} style = {imageComponentSidebar} /> </button> </th>
                  <th> <button><img src={tennessee_pic} style = {imageComponentSidebar} /> </button></th>
               </tr>
              <tr>
                  <th> <button> <img src={tennessee_pic} style = {imageComponentSidebar} /> </button> </th>
                  <th> <button><img src={tennessee_pic} style = {imageComponentSidebar} /> </button></th>
              </tr>
              <tr>
                  <th> <button> <img src={tennessee_pic} style = {imageComponentSidebar} /> </button> </th>
                  <th> <button><img src={tennessee_pic} style = {imageComponentSidebar} /> </button></th>
              </tr>
              <tr>
                  <th> <button> <img src={tennessee_pic} style = {imageComponentSidebar} /> </button> </th>
                  <th> <button><img src={tennessee_pic} style = {imageComponentSidebar} /> </button></th>
              </tr>
              
            </table>

            <input
              type="button"
              value="Compare"
              onClick={showModal}
            />

            <Modal show={isOpenModal} onHide={hideModal} size="lg">
                    <Modal.Header>
                      <Modal.Title>District Plan Comparison</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{
                        maxHeight: 'calc(100vh - 210px)',
                        overflowY: 'auto'}}>

                    <div>
                      <table>
                              <tr>
                                  <th> District 1 </th>
                                  <th> District 2 </th>
                              </tr>
                              <tr>
                                  <th> <button> <img src={state_measures} style = {imageComponentModal} /> </button> </th>
                                  <th> <button><img src={state_measures} style = {imageComponentModal} /> </button></th>
                              </tr>
                              <tr>
                                  <th> <button> <img src={gerrymander_index} style = {gerrymanderIndexComponentModal} /> </button> </th>
                                  <th> <button><img src={gerrymander_index} style = {gerrymanderIndexComponentModal} /> </button></th>
                              </tr>
                              <tr>
                                  <th> Number of anomalous districts: 4 </th>
                                  <th> Number of anomalous districts: 7 </th>
                              </tr>
                              
                      </table>
                    </div>

                    </Modal.Body>

                    <Modal.Footer>
                      <button onClick={hideModal}>X</button>
                      
                    </Modal.Footer>
            </Modal>
            
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;