import React, { useState } from "react";
import { Navbar, Container, Nav, Modal, Button, InputGroup, FormControl} from "react-bootstrap";
import LoginForm from './LoginForm';




const AppNavbar = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
      <Nav.Link eventKey={2} >
        Favorites
      </Nav.Link>
      <Button variant='dark' onClick={handleShow}>Login</Button>
      {/* <Nav.Link eventKey='login' onClick={() => setShow(true)}>
        Login
      </Nav.Link> */}
      {/* <Nav.Link eventKey='signup' onClick={() => setShow(true)}>
        Sign Up
      </Nav.Link> */}
      <Button variant='secondary' onClick={handleShow}>Signup</Button>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
<Modal size='lg' show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>
            Login
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <InputGroup>
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl type='email' />
        </InputGroup>
        <InputGroup>
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl type='password' />
        </InputGroup>
    </Modal.Body>
</Modal>


    </>
  );
};

export default AppNavbar;
