import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import {
  Navbar,
  Container,
  Nav,
  Modal,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
// import { Link } from "react-router-dom";
// import LoginForm from "./LoginForm";
// import SignUpForm from "./SignupForm";


const AppNavbar = () => {
  const [loginShow, setLoginShow] = useState(false);
  const [signUpShow, setSignUpShow] = useState(false);
  const [signUpFormState, setSignUpFormState ] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleSignUpChange = (event) => {
    const { name, value } = event.target;

    setSignUpFormState({
      ...signUpFormState,
      [name]: value,
    });
  }

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleLoginClose = () => setLoginShow(false);
  const handleLoginShow = () => setLoginShow(true);
  const handleSignUpClose = () => setSignUpShow(false);
  const handleSignUpShow = () => setSignUpShow(true);


  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...signUpFormState }
      });

      Auth.login(data.addUser.token);
    } catch (error) {
      console.error(error)
    }
  }
//  const onClickLogin = () => {
//      console.log("test")
//      // Get value from Email input
//      // Get Value from password input
//      // make a request to backend with them.
//      // After getting respnose from backend.(Success)
//      // then Save user status in localstorage.
//      // hide this modal
//     //  setLoginShow(false);
//  }
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href='/'>News For You</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href='/' style={{ marginRight: '0.1rem', padding: '0.7rem 1rem', fontsize: '20px'}}>Home</Nav.Link>
              <Nav.Link href='/favorites' eventKey={2} style={{ marginRight: '1rem', padding: '0.7rem 1rem', fontsize: '10px'}}>Favorites</Nav.Link>
              
                  <Button
                variant="dark"
                onClick={handleLoginShow}
                size="lg"
                style={{ marginRight: "1rem", padding: "0.7rem 1rem" }} 
              >
                Login
              </Button>
             
              
                  <Button
                variant="danger"
                onClick={handleSignUpShow}
                size="lg"
                style={{ marginRight: "1rem", padding: "0.5rem 1rem" }} 
              >
                Signup
              </Button>
             
              
            </Nav>
          </Navbar.Collapse>
          <Modal size="lg" show={loginShow} onHide={handleLoginClose}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <InputGroup className="mb-3">
                <InputGroup.Text>Email</InputGroup.Text>
                <FormControl type="email" />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>Password</InputGroup.Text>
                <FormControl type="password" />
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleLoginClose}>
                Close
              </Button>
              <Button variant="primary" >Login</Button>
            </Modal.Footer>
          </Modal>
          <Modal size='lg' show={signUpShow} onHide={handleSignUpClose}>
    <Modal.Header closeButton>
        <Modal.Title>
            Signup
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <InputGroup className='mb-3'>
            <InputGroup.Text name="username" value={signUpFormState.username} onChange={handleSignUpChange}>Username</InputGroup.Text>
            <FormControl type='username' />
        </InputGroup>
        <InputGroup className='mb-3'>
            <InputGroup.Text name="email" value={signUpFormState.email} onChange={handleSignUpChange}>Email</InputGroup.Text>
            <FormControl type='email' />
        </InputGroup>
        <InputGroup className='mb-3'>
            <InputGroup.Text name="password" value={signUpFormState.password} onChange={handleSignUpChange}>Password</InputGroup.Text>
            <FormControl type='password' />
        </InputGroup>
    </Modal.Body>
    <Modal.Footer>
        <Button variant='secondary' onClick={handleSignUpClose}>Close</Button>
        <Button variant='primary' onClick={handleSignUpSubmit}>Submit</Button>
    </Modal.Footer>
</Modal>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
