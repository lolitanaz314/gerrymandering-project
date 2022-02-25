import React from "react";
import Drawer from "react-bottom-drawer";
import DrawerContent from "./DrawerContent.js";

export default function BottomTab(props) {

  //doesnt work
  // function swipeClose(event) {
  //   if(event.deltaY > 20) props.closeDrawer;
  // }

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
}