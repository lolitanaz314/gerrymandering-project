import React, {useState} from 'react';
import './DropdownMenu.css';
import { Link } from 'react-router-dom';
import MapView from './MapView';
import Dropdown from 'react-bootstrap/Dropdown'
import tennesseeOutline from "../assets/tennessee.json";
import southcarolinaOutline from "../assets/southcarolina.json";

/* NOT BEING USED!! */
function sayHello () {
    console.log("state in dropdown was clicked")
    //MapView.zoomState(tennesseeOutline)
}

const Dropdownmenu = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    
    return (
        <>
            <Dropdown>
                <Dropdown.Toggle 
                variant="success" 
                id="dropdown-basic"
                >
                    States
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <div>
                    <Dropdown.Item  onClick={sayHello}>Tennessee</Dropdown.Item>
                    </div>

                    <div>
                    <Dropdown.Item onClick={sayHello}>South Carolina</Dropdown.Item>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default Dropdownmenu;