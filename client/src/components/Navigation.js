import { Nav, Container, Navbar, NavDropdown  } from 'react-bootstrap';
import tennesseeOutline from "../assets/json/tennessee.json";
import southcarolinaOutline from "../assets/json/southcarolina.json";
import coloradoOutline from "../assets/json/colorado.json";
import { HiMenu } from "react-icons/hi";

const stateStyle = {
  position: 'relative',
  width: 100,
  textAlign: 'center'
}

const viewStyle = {
  position: 'relative',
  left: 340
}

const demographicStyle = {
  position: 'relative',
  left: 250,
  width: 200,
  textAlign: 'center'
}

const borderStyle = {
  position: 'relative',
  left: 150
}

const menuStyle = {
  color: 'white',
  fontSize: '200%',
  padding: '5px',
  marginLeft: '10px'
}

const Navigation = (props) => {

  let demographicTitle = 'Choose Demographic';
  if(props.demographic !== 'None') demographicTitle = props.demographic;
  let stateTitle = "Choose State";
  if(props.name !== 'USA') stateTitle = props.name;

  return (
    <>
      <Navbar bg="primary" variant="dark" fixed="top">
          <HiMenu className='menu-icon' style={menuStyle} />
        <Container>
          <Navbar.Brand href="/">CSE 416 Lynx</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title={stateTitle} id="basic-nav-dropdown" style={stateStyle}>
                <NavDropdown.Item href="#tennessee" onClick={() => props.zoomState(tennesseeOutline)}>Tennessee</NavDropdown.Item>
                <NavDropdown.Item href="#southCarolina" onClick={() => props.zoomState(southcarolinaOutline)}>South Carolina</NavDropdown.Item>
                <NavDropdown.Item href="#colorado" onClick={() => props.zoomState(coloradoOutline)}>Colorado</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Choose View" id="basic-nav-dropdown" style={viewStyle}>
                <NavDropdown.Item onClick={() => props.changeView('election')}>Election</NavDropdown.Item>
                <NavDropdown.Item onClick={() => props.changeView('population')}>Population</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title={demographicTitle} id="basic-nav-dropdown" style={demographicStyle}>
                <NavDropdown.Item onClick={() => props.changeDemographic('Republican')}>Republican</NavDropdown.Item>
                <NavDropdown.Item onClick={() => props.changeDemographic('Democratic')}>Democratic</NavDropdown.Item>
                <NavDropdown.Item onClick={() => props.changeDemographic('White')}>White</NavDropdown.Item>
                <NavDropdown.Item onClick={() => props.changeDemographic('Black')}>Black</NavDropdown.Item>
                <NavDropdown.Item onClick={() => props.changeDemographic('Hispanic')}>Hispanic</NavDropdown.Item>
                <NavDropdown.Item onClick={() => props.changeDemographic('Asian')}>Asian</NavDropdown.Item>
                <NavDropdown.Item onClick={() => props.changeDemographic('Native American')}>Native American</NavDropdown.Item>
                <NavDropdown.Item onClick={() => props.changeDemographic('Pacific Islander')}>Pacific Islander</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Choose Border Lines" id="basic-nav-dropdown" style={borderStyle}>
              <li className="checkbox form-group"> {/* onClick = {() => props.toggleDistrict()}*/}
                <input type="checkbox" value="district" name="district" defaultChecked="true"/>
                <label htmlFor="district">District</label>
              </li>
              <li className="checkbox form-group">
                <input type="checkbox" value="precinct" name="precinct"/>
                <label htmlFor="precinct">Precinct</label>
              </li>
              <li className="checkbox form-group">
                <input type="checkbox" value="county" name="county" />
                <label htmlFor="county">County</label>
              </li>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation;