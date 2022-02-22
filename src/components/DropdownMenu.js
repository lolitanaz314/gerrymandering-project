import React, {useState} from 'react';
import './style/DropdownMenu.css';
import { Link } from 'react-router-dom';
import MapView from './MapView';
import Dropdown from 'react-bootstrap/Dropdown'
import tennesseeOutline from "../assets/tennessee.json";
import southcarolinaOutline from "../assets/southcarolina.json";

const Dropdownmenu = () => {
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
                    <Dropdown.Item>Tennessee</Dropdown.Item>
                    </div>

                    <div>
                    <Dropdown.Item>South Carolina</Dropdown.Item>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default Dropdownmenu;