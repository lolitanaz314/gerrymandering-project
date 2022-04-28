import { Offcanvas } from 'react-bootstrap';
import React from 'react';

const teamStates = [ //status: 0 for proposed, 1 for approved
    {
    name: 'Alabama',
    status: 1, 
    teams: ['Aces']
},
{
    name: 'Arizona',
    status: 1, 
    teams: ['Aces']
},
{
    name: 'Arkansas',
    status: 1, 
    teams: ['Aces']
},
{
    name: 'California',
    status: 1, 
    teams: ['Sky']
},
{
    name: 'Colorado',
    status: 1, 
    teams: ['Lynx']
},
{
    name: 'Florida',
    status: 1, 
    teams: ['Dream']
},
{
    name: 'Georgia',
    status: 1, 
    teams: ['Drean']
},
{
    name: 'Illinois',
    status: 1, 
    teams: ['Sparks']
},
{
    name: 'Louisiana',
    status: 1, 
    teams: ['Sparks']
},
{
    name: 'Maryland',
    status: 1, 
    teams: ['Wings']
},
{
    name: 'Michigan',
    status: 1, 
    teams: ['Wings']
},
{
    name: 'Mississippi',
    status: 1, 
    teams: ['Dream', 'Mystics']
},
{
    name: 'Nevada',
    status: 1, 
    teams: ['Sparks', 'Fever']
},
{
    name: 'New York',
    status: 0, 
    teams: ['Sky']
},
{
    name: 'North Carolina',
    status: 1, 
    teams: ['Mystics']
},
{
    name: 'South Carolina',
    status: 1, 
    teams: ['Fever', 'Lynx']
},
{
    name: 'Tennessee',
    status: 1, 
    teams: ['Lynx', 'Mystics']
},
{
    name: 'Texas',
    status: 1, 
    teams: ['Fever']
},
{
    name: 'Virginia',
    status: 1, 
    teams: ['Wings']
}
];

const sidebarStyle = {
    margin: '56px 0px 0px 0px',
    width: '20%',
    zIndex: '1050'
}

const titleStyle = {
    height: '7%',
    display: 'block'
}

const LeftSidebar = (props) => {
    return (
        <>
            <Offcanvas style={sidebarStyle} show={props.show} onHide={props.handleClose}
                placement='start'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><h5>Status of Team States</h5></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <li>

                    </li>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default LeftSidebar;
