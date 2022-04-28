import { Offcanvas } from 'react-bootstrap';
import React from 'react';

const sidebarStyle = {
    margin: '56px 0px 0px 0px',
    width: '20%',
    zIndex: '400'
}

const titleStyle = {
    height: '7%',
    display: 'block'
}

const LeftSidebar = (props) => {
    return (
        <>
            <Offcanvas style={sidebarStyle} show={props.show} onHide={props.handleClose}
                placement='start'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><h5>Status of Team States</h5></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <li>

                    </li>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default LeftSidebar;
