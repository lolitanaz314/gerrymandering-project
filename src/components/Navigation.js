import { Nav, Container, Navbar, NavDropdown  } from 'react-bootstrap';
import tennesseeOutline from "../assets/tennessee.json";
import southcarolinaOutline from "../assets/southcarolina.json";

function sayHello () {
  console.log("state in dropdown was clicked")
  //MapView.zoomState(tennesseeOutline)
}

const Navigation = (props) => {
  return (
    <>
      <Navbar bg="primary" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/">CSE 416 Lynx</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="Choose State" id="basic-nav-dropdown">
                <NavDropdown.Item href="#tennessee" onClick={() => props.zoomState(tennesseeOutline)}>Tennessee</NavDropdown.Item>
                <NavDropdown.Item href="#southCarolina" onClick={() => props.zoomState(southcarolinaOutline)}>South Carolina</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation;