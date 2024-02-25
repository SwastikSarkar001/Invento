import React from 'react'
import Navbar from './Navbar'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Home from './Home'
import Dashboard from './Dashboard'
import Inventory from './Inventory'
import '../styles/App.css';

function App() {
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const response = await signInWithPopup(auth, provider);
      console.log(response)
    } catch (error) {
      console.log("Some error occurred", error);
    }
  }
  let isSignedIn = false // Checks whether the user is signed in or not

  return (
    <div className="App dark:bg-teal-950">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={ isSignedIn ? <Dashboard /> : <Home /> } />
          { isSignedIn && <Route exact path='/inventory' element=<Inventory /> /> }
          <Route path='*' element=<Navigate to='/' /> />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
