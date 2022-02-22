import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Legend from './components/Legend';
import MapView from './components/MapView';
import './style/Legend.css';

/*
THIS is the starting point of the react app. 
*/
function App() {
  return (
    <div className="App">

  <BrowserRouter>
  <Routes>
        <Route path="/" element={<MapView />} />
      {/* <MapView/> */}
      </Routes>
      {/* <Legend/> */}
</BrowserRouter>
    </div>
  );
}

export default App;
