import React, {useState} from 'react';
import './DropdownMenu.css';
import { Link } from 'react-router-dom';
// import MapView from './MapView';
  
const Dropdown = () => {
    const States = [
        {
          title: 'Tennessee',
          cName: 'dropdown-link'
        },
        {
          title: 'South Carolina',
          cName: 'dropdown-link'
        }
    ];
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    return (
        <>
            {/* <ul
                onClick={handleClick}
                className = {click ? 'dropdown-menu clicked' : 'dropdown-menu'}
            > */}
                {States.map((item, index) => {
                    return (
                        <li key={index} onClick = {() =>  setClick(false)}>
                            
                                {item.title}
                        </li>
                    )
                })}
            {/* </ul> */}
        </>
    )
}

export default Dropdown;