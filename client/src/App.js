import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MapView from './components/MapView';
import './components/style/Legend.css';

/*
THIS is the starting point of the react app. 
*/
function App() {
  return (
    <div className="App">
      <MapView/>
    </div>
  );
}

export default App;