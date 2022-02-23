import { Nav, Container, Navbar, NavDropdown  } from 'react-bootstrap';
import tennesseeOutline from "../assets/tennessee.json";
import southcarolinaOutline from "../assets/southcarolina.json";
// import "./style/Navbar.css"; // commented because dropdown looked weird

const myComponentStyle = {
    position: 'relative',
    width: 100
}

const myComponentStyleView = {
  position: 'relative',
  left:340
}

const myComponentStyleBorder = {
  position: 'relative',
  left: 150
}

const Navigation = (props) => {
  return (
    <>
      <Navbar bg="primary" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/">CSE 416 Lynx</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Choose State" id="basic-nav-dropdown" style = {myComponentStyle}>
                <NavDropdown.Item href="#tennessee" onClick={() => props.zoomState(tennesseeOutline)}>Tennessee</NavDropdown.Item>
                <NavDropdown.Item href="#southCarolina" onClick={() => props.zoomState(southcarolinaOutline)}>South Carolina</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Choose View" id="basic-nav-dropdown" style = {myComponentStyleView}>
                <NavDropdown.Item href="#tennessee" onClick={() => props.zoomState(tennesseeOutline)}>Election</NavDropdown.Item>
                <NavDropdown.Item href="#southCarolina" onClick={() => props.zoomState(southcarolinaOutline)}>Population</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Choose Border Lines" id="basic-nav-dropdown" style = {myComponentStyleBorder}>
                <NavDropdown.Item href="#tennessee" onClick={() => props.zoomState(tennesseeOutline)}>District</NavDropdown.Item>
                <NavDropdown.Item href="#southCarolina" onClick={() => props.zoomState(southcarolinaOutline)}>Precinct</NavDropdown.Item>
                <NavDropdown.Item href="#southCarolina" onClick={() => props.zoomState(southcarolinaOutline)}>County</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation;