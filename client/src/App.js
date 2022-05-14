import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MapView from './components/MapView';
import './components/style/Legend.css';

/*
THIS is the starting point of the react app. 
*/
function App() {
  
  // useEffect(() => {
  //     let lc = document.getElementsByClassName('leaflet-control-layers');
  //     lc[0].style.visibility = 'hidden';
  //     lc[1].style.visibility = 'hidden';
  //     lc[2].style.visibility = 'hidden';
  //     lc[3].style.visibility = 'hidden';
  //     lc[4].style.visibility = 'hidden';
  //     lc[5].style.visibility = 'hidden';
  // }, []);

  return (
    <div className="App">
      <MapView/>
    </div>
  );
}

export default App;