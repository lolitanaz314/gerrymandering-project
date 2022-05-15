import { Nav, Container, Navbar, NavDropdown } from 'react-bootstrap';
import { useState } from 'react';
import LeftSidebar from './LeftSidebar';

import tennesseeOutline from "../assets/json/tn/tennessee.json";
import southcarolinaOutline from "../assets/json/sc/southcarolina.json";
import coloradoOutline from "../assets/json/co/colorado.json";
import { HiMenu } from "react-icons/hi";

const stateStyle = {
  position: 'relative',
  width: 100,
  textAlign: 'center'
}

const demographicStyle = {
  position: 'relative',
  left: 150,
  width: 200,
  textAlign: 'center'
}

const borderStyle = {
  position: 'relative',
  left: 350
}

const menuStyle = {
  color: 'white',
  fontSize: '200%',
  padding: '5px',
  marginLeft: '10px'
}

const Navigation = (props) => {

  let demographicTitle = 'Choose Demographic';
  if (props.demographic !== 'None') demographicTitle = props.demographic;
  let stateTitle = "Choose State";
  if (props.name !== 'USA') stateTitle = props.name;

  //sidebar
  const [show, setShow] = useState(false);
  const handleShow = (val) => setShow(val);

  return (
    <>
      <Navbar bg="primary" variant="dark" fixed="top">
        <HiMenu className='menu-icon' style={menuStyle} onClick={() => handleShow(true)} />
        <Container>
          <Navbar.Brand href="/">CSE 416 Lynx</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title={stateTitle} id="basic-nav-dropdown" style={stateStyle}>
                <NavDropdown.Item href="#tennessee" onClick={() => props.zoomState(tennesseeOutline)}>Tennessee</NavDropdown.Item>
                <NavDropdown.Item href="#southCarolina" onClick={() => props.zoomState(southcarolinaOutline)}>South Carolina</NavDropdown.Item>
                <NavDropdown.Item href="#colorado" onClick={() => props.zoomState(coloradoOutline)}>Colorado</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={`me-auto ${props.show ? "" : "hidden"}`} >
              <NavDropdown title="Choose Border Lines" id="basic-nav-dropdown" style={borderStyle}>
                <li className="checkbox form-group" onClick={() => props.toggleBorder('district')}>
                  <label htmlFor="district">
                    <input type="checkbox" value="district" name="district" checked={props.view.district} /> Districts
                  </label>
                </li>
                <li className="checkbox form-group" onClick={() => props.toggleBorder('county')}>
                  <label htmlFor="county">
                    <input type="checkbox" value="county" name="county" checked={props.view.county} /> Counties
                  </label>
                </li>
                <li className="checkbox form-group" onClick={() => props.toggleBorder('precinct')}>
                  <label htmlFor="precinct">
                    <input type="checkbox" value="precinct" name="precinct" checked={props.view.precinct} /> Precincts
                  </label>
                </li>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={`me-auto ${props.show ? "" : "hidden"}`} >
              <NavDropdown title={demographicTitle} id="basic-nav-dropdown" style={demographicStyle}>
                <NavDropdown.Item onClick={() => props.changeDemographic('Republican')}>Republican</NavDropdown.Item>
                <NavDropdown.Item onClick={() => props.changeDemographic('Democratic')}>Democratic</NavDropdown.Item>
                <NavDropdown.Item onClick={() => props.changeDemographic('WHITE')}>White</NavDropdown.Item>
                <NavDropdown.Item onClick={() => props.changeDemographic('BLACK')}>Black</NavDropdown.Item>
                <NavDropdown.Item onClick={() => props.changeDemographic('HISPANIC')}>Hispanic</NavDropdown.Item>
                <NavDropdown.Item onClick={() => props.changeDemographic('ASIAN')}>Asian</NavDropdown.Item>
                <NavDropdown.Item onClick={() => props.changeDemographic('NATIVE')}>Native American</NavDropdown.Item>
                <NavDropdown.Item onClick={() => props.changeDemographic('Pacific Islander')}>Pacific Islander</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LeftSidebar show={show} handleClose={() => handleShow(false)} />
    </>
  )
}

export default Navigation;