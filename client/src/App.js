import React from 'react';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import NewsContent from './components/Newscontent';
import SignupForm from './components/SignupForm';

function App() {
  return (
    <>
    <div>
      <Navbar></Navbar>
      <SignupForm></SignupForm>
      <LoginForm></LoginForm>
      <NewsContent></NewsContent>
    </div>
    </>
    
  );
}

export default App;
