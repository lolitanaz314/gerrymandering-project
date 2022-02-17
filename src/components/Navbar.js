import React, {useState, useEffect} from 'react'
import "./Navbar.css"
import Dropdownmenu from './DropdownMenu';
import {  Link } from "react-router-dom";

const Navbar= () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const toggleNav = () => {
    setToggleMenu(toggleMenu)
  }

  /* FOR RESIZING PURPOSES*/
  useEffect(() => {

    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', changeWidth)

  }, [])


  return (
	// <header class="header">
	// 	<div class="left">
	// 		<a href="#">CSE 416 Project</a>
	// 	</div>
  //       <div class="mid">
  //           <ul class="navbar">
  //               <li> Team Lynx </li>
  //           </ul>
  //       </div>
	//     <div class="right">
        
  //       </div>
  //   </header>
  <nav>
      {(screenWidth>500) && (
      <ul className="list">
      <li className="items">CSE 416</li>
      <li className="items">LYNX</li>
      <Dropdownmenu/>
    </ul>
      )}
    </nav>
  );
}
export default Navbar;