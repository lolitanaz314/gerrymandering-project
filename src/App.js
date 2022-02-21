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

  // states for MapView
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  
  return (
    <div className="App">
      {/*<Sidebar show={show} handleClose={handleClose} /> */}
      <MapView show={show} setShow = {setShow} handleShow={handleShow} />
    </div>
  );
}

export default App;
