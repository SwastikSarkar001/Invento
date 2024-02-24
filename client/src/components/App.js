import React from 'react'
import Navbar from './Navbar'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import Home from './Home'
import Dashboard from './Dashboard'
import Inventory from './Inventory'
import '../styles/App.css';

function App() {
  let isSignedIn = true // Checks whether the user is signed in or not

  return (
    <div className="App dark:bg-teal-950">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={isSignedIn ? <Dashboard /> : <Home />} />
          <Route exact path='/inventory' element=<Inventory /> />
          <Route path='*' element=<Navigate to='/' /> />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
