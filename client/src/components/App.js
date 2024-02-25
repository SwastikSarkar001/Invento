import React, { useState } from 'react'
import Navbar from './Navbar'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { signInWithPopup } from "firebase/auth";
// import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { provider, auth } from "../firebaseConfig";
import Home from './Home'
import Dashboard from './Dashboard'
import Inventory from './Inventory'
import '../styles/App.css';


function App() {
  const [userData, setUserData] = useState({})
  const handleGoogleSignIn = async () => {
    try {
      signInWithPopup(auth, provider).then((data) => {
        const user = data.user
        setUserData(user)
        console.log(userData)
      }, (err) => {
        console.error(err)
      }) 
    } catch (error) {
      console.error('Google Sign-In Error:', error.message);
    }
  };

  const isSignedIn = Object.keys(userData).length !== 0 // Checks whether the user is signed in or not
  const homeContent = isSignedIn ? <Dashboard /> : <Home />
  
  return (
    <div className="App relative h-screen dark:bg-teal-950">
      <Router>
        <Navbar handleGoogleSignIn={handleGoogleSignIn} userData={userData} setUserData={setUserData} isSignedIn={isSignedIn} />
        <Routes>
          <Route exact path='/' element={homeContent} />
          { isSignedIn && <Route exact path='/inventory' element={<Inventory />} /> }
          <Route path='*' element=<Navigate to='/' /> />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
