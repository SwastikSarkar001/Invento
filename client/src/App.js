import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import './App.css';

function App() {
  return (

    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element=<Home /> />
          <Route exact path='/about' element=<About /> />
          <Route path='*' element=<Navigate to='/' /> />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
