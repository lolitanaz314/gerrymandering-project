import React, {useState} from 'react';
import './DropdownMenu.css';
import { Link } from 'react-router-dom';
// import MapView from './MapView';
import Dropdown from 'react-bootstrap/Dropdown'
  
const Dropdownmenu = () => {
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
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    States
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-2">Tennessee</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">South Carolina</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default Dropdownmenu;