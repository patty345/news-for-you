import React, { useState } from "react";
import { Navbar, Container, Nav} from "react-bootstrap";





const AppNavbar = () => {
    const [show, setShow] = useState(false);

    

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
  <Container>
  <Navbar.Brand href="/">News For You</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
    </Nav>
    <Nav>
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Favorites
      </Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Login
      </Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Sign Up
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
    </>
  );
};

export default AppNavbar;
