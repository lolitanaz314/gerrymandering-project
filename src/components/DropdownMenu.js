import React, {useState} from 'react';
import './style/DropdownMenu.css';
import { Link } from 'react-router-dom';
import MapView from './MapView';
import Dropdown from 'react-bootstrap/Dropdown'
import tennesseeOutline from "../assets/tennessee.json";
import southcarolinaOutline from "../assets/southcarolina.json";

<<<<<<< HEAD
/* NOT BEING USED!! */
=======
>>>>>>> c3deef0919f5bdfbc93a30aeba6c35030ca165e7
function sayHello () {
    console.log("state in dropdown was clicked")
    //MapView.zoomState(tennesseeOutline)
}

const Dropdownmenu = () => {
<<<<<<< HEAD
=======
    /*
    const States = [
        {
          title: 'Tennessee',
        },
        {
          title: 'South Carolina',
        }
    ];*/
>>>>>>> c3deef0919f5bdfbc93a30aeba6c35030ca165e7
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    
    return (
        <>
            <Dropdown>
                <Dropdown.Toggle 
                variant="success" 
                id="dropdown-basic" >
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