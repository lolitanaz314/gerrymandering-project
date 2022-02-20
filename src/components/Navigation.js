import { Nav, Container, Navbar, NavDropdown  } from 'react-bootstrap';


function sayHello () {
  console.log("state in dropdown was clicked")
  //MapView.zoomState(tennesseeOutline)
}

const Navigation = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#home">CSE 416 Lynx</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <NavDropdown title="Choose State" id="basic-nav-dropdown">
                <NavDropdown.Item href="#tennessee" onClick={sayHello}>Tennessee</NavDropdown.Item>
                <NavDropdown.Item href="#southCarolina" onClick={sayHello}>South Carolina</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation;