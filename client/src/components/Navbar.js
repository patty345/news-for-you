import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

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
  const [signUpFormState, setSignUpFormState] = useState({
    username: "",
    email: "",
    password: "",
    subscribed: false
  });
  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: "",
  });

  const handleSignUpChange = (event) => {
    const { name, value } = event.target;

    setSignUpFormState({
      ...signUpFormState,
      [name]: value,
    });
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;

    setLoginFormState({
      ...loginFormState,
      [name]: value,
    });
  };

  const [addUser] = useMutation(ADD_USER);
  const [login] = useMutation(LOGIN_USER);

  const handleLoginClose = () => setLoginShow(false);
  const handleLoginShow = () => setLoginShow(true);
  const handleSignUpClose = () => setSignUpShow(false);
  const handleSignUpShow = () => setSignUpShow(true);
  // const handleLogoutShow = () => setLogoutShow(true);
  // const handleLogoutClose = () => setLogoutShow(false);

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...signUpFormState },
      });

      Auth.login(data.addUser.token);
    } catch (error) {
      console.error(error);
    }
  };
  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...loginFormState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">News For You</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link
                href="/"
                style={{
                  marginRight: "0.1rem",
                  padding: "0.7rem 1rem",
                  fontsize: "20px",
                }}
              >
                Home
              </Nav.Link>
              {(Auth.loggedIn()) ?
                <Nav.Link
                  href="/favorites"
                  eventKey={2}
                  style={{
                    marginRight: "1rem",
                    padding: "0.7rem 1rem",
                    fontsize: "10px",
                  }}
                >
                  Favorites
                </Nav.Link> :
                <></>
              }
              {Auth.loggedIn() ? (
                <>
                  <Button
                    variant="dark"
                    onClick={Auth.logout}
                    size="lg"
                    style={{ marginRight: "1rem", padding: "0.7rem 1rem" }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
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
                </>
                
              )}
              
            </Nav>
          </Navbar.Collapse>
          <Modal size="lg" show={loginShow} onHide={handleLoginClose}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <InputGroup className="mb-3">
                <InputGroup.Text>Email</InputGroup.Text>
                <FormControl
                  name="email"
                  value={loginFormState.email}
                  onChange={handleLoginChange}
                  type="email"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>Password</InputGroup.Text>
                <FormControl
                  name="password"
                  value={loginFormState.password}
                  onChange={handleLoginChange}
                  type="password"
                />
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleLoginClose}>
                Close
              </Button>
              <Button onClick={handleLoginSubmit} variant="primary">
                Login
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal size="lg" show={signUpShow} onHide={handleSignUpClose}>
            <Modal.Header closeButton>
              <Modal.Title>Signup</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <InputGroup className="mb-3">
                <InputGroup.Text>Username</InputGroup.Text>
                <FormControl
                  name="username"
                  value={signUpFormState.username}
                  onChange={handleSignUpChange}
                  type="username"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>Email</InputGroup.Text>
                <FormControl
                  name="email"
                  value={signUpFormState.email}
                  onChange={handleSignUpChange}
                  type="email"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>Password</InputGroup.Text>
                <FormControl
                  name="password"
                  value={signUpFormState.password}
                  onChange={handleSignUpChange}
                  type="password"
                />
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleSignUpClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSignUpSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
