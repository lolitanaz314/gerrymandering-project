import React, {useState, useEffect} from 'react'
import "./style/Navbar.css"
import Dropdownmenu from './DropdownMenu';

<<<<<<< HEAD
/*NOT BEING USED RIGHT NOW*/
const Navbar= () => {
=======
const Navbar = (props) => {
>>>>>>> c3deef0919f5bdfbc93a30aeba6c35030ca165e7
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
  <nav>
      {(screenWidth>300) && (
      <ul className="list">
        <li className="className">CSE 416</li>
        <li className="teamName">TEAM LYNX</li>
        <Dropdownmenu className="dropdown"/>
      </ul>
      )}
    </nav>
  );
}
export default Navbar;