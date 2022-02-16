import React from 'react';
import "./Navbar.css"
import {  Link } from "react-router-dom";

const Navbar= () => {
  return (
	<header class="header">
		<div class="left">
			<a href="#">CSE 416 Project</a>
		</div>
        <div class="mid">
            <ul class="navbar">
                <li> Team Lynx </li>
            </ul>
        </div>
	    <div class="right">
          <a href="#">Dropdown</a>
        </div>
    </header>
  );
}
export default Navbar;