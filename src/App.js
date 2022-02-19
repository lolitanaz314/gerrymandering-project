import React from 'react'
import { useState } from 'react';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
 

/*
THIS is the starting point of the react app. 
*/
function App() {
  // state for Sidebar
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      <Navigation />
      <Sidebar show={show} handleClose={handleClose}/>
      <MapView show={show} handleShow={handleShow}/>
    </div>
  );
}

export default App;
