import React from 'react'
import MapView from './components/MapView'
import Navbar from './components/Navbar';
import './App.css';

// terminal  "npm install react-bootstrap bootstrap@5.1.3"
// terminal  "npm install react react-dom"  

/*
THIS is the starting point of the react app. 
*/
function App() {
  return (
    <div className="App">
      <Navbar/>
      <MapView/>
    </div>
  );
}

export default App;
