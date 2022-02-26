import React from "react";
import Drawer from "react-bottom-drawer";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import tennessee_pic from '../assets/tennessee_pic.png'
import DrawerContent from "./DrawerContent.js";

export default function BottomTab(props) {

  const imageComponent = {
    width: 300,
    height: 200
  }

  /*
  return (
    <div className="drawer">

      
      <Drawer
        duration={250} //for animation
        hideScrollbars={true}
        onClose={props.closeDrawer}
        isVisible={props.isVisible}
        // onMove={swipeClose}
        >
        <DrawerContent />
      </Drawer>
    </div>
  );

  */
  return (
    <Modal show={false} size="lg">
      <ModalHeader>
        <ModalTitle> District Plan Comparison </ModalTitle>
      </ModalHeader>
      <ModalBody style={{
      maxHeight: 'calc(100vh - 210px)',
      overflowY: 'auto'
     }}>
      
      <div>
      <table>
              <tr>
                  <th> District 1 </th>
                  <th> District 2 </th>
              </tr>
              <tr>
                  <th> <button> <img src={tennessee_pic} style = {imageComponent} /> </button> </th>
                  <th> <button><img src={tennessee_pic} style = {imageComponent} /> </button></th>
              </tr>
              <tr>
                  <th> <button> <img src={tennessee_pic} style = {imageComponent} /> </button> </th>
                  <th> <button><img src={tennessee_pic} style = {imageComponent} /> </button></th>
              </tr>
              <tr>
                  <th> <button> <img src={tennessee_pic} style = {imageComponent} /> </button> </th>
                  <th> <button><img src={tennessee_pic} style = {imageComponent} /> </button></th>
              </tr>
              <tr>
                  <th> <button> <img src={tennessee_pic} style = {imageComponent} /> </button> </th>
                  <th> <button><img src={tennessee_pic} style = {imageComponent} /> </button></th>
              </tr>
              <tr>
                  <th> <button> <img src={tennessee_pic} style = {imageComponent} /> </button> </th>
                  <th> <button><img src={tennessee_pic} style = {imageComponent} /> </button></th>
              </tr>
              <tr>
                  <th> <button> <img src={tennessee_pic} style = {imageComponent} /> </button> </th>
                  <th> <button><img src={tennessee_pic} style = {imageComponent} /> </button></th>
              </tr>
          
      </table>
      </div>




      </ModalBody>
      <ModalFooter>This is the footer</ModalFooter>
    </Modal>
  );
}