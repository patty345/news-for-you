import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import SignupForm from './components/SignupForm';

function App() {
  return (
    <>
    <div>
      <Navbar></Navbar>
      <SignupForm></SignupForm>
      <LoginForm></LoginForm>
    </div>
    </>
    
  );
}

export default App;
