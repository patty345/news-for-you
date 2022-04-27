import React, { useState } from "react";
import { Navbar, Container, Nav, Modal, Button, InputGroup, FormControl} from "react-bootstrap";
// import LoginForm from './LoginForm';




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
      <Button variant='dark' onClick={handleShow} size='lg' style={{marginRight: '1rem', padding: '0.7rem 1rem'}}>Login</Button>
      <Button variant='danger' onClick={handleShow} size="lg" style={{marginRight: '1rem', padding: '0.5rem 1rem'}}>Signup</Button>
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
        <InputGroup className='mb-3'>
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl type='email' />
        </InputGroup>
        <InputGroup className='mb-3'>
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl type='password' />
        </InputGroup>
    </Modal.Body>
    <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>Close</Button>
        <Button variant='primary'>Login</Button>
    </Modal.Footer>
</Modal>


    </>
  );
};

export default AppNavbar;
