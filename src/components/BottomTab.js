import React from "react";
import Drawer from "react-bottom-drawer";
import DrawerContent from "./DrawerContent.js";

export default function BottomTab(props) {
  // const [isVisible, setIsVisible] = React.useState(true);
  // const openDrawer = React.useCallback(() => setIsVisible(true), []);
  // const closeDrawer = React.useCallback(() => setIsVisible(false), []);

  return (
    <div className="drawer">
      <center>
        {/* <button className="open-btn" onClick={openDrawer}>
          SHOW ME THE DIALOG!
        </button> */}
      </center>
      <Drawer
        duration={250}
        hideScrollbars={true}
        onClose={props.closeDrawer}
        isVisible={props.isVisible} >
        <DrawerContent />
      </Drawer>
    </div>
  );
}