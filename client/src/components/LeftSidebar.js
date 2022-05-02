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
        teams: ['Dreams']
    },
    {
        name: 'Georgia',
        status: 1,
        teams: ['Dreams']
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
        teams: ['Dreams', 'Mystics']
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
    zIndex: '1050' //backdrop z index is 1040
}

const legendStyle = {
    marginLeft: '5.5%'
}

const stateStyle = {
    height: '5%',
    width: '57%',
    display: 'inline-block',
    padding: '2%',
    margin: '1%',
}

const teamStyle = {
    height: '5%',
    width: '33%',
    display: 'inline-block',
    fontSize: '9px'
}

const LeftSidebar = (props) => {
    return (
        <>
            <Offcanvas style={sidebarStyle} show={props.show} onHide={props.handleClose}
                placement='start'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title> <h5>Status of Team States</h5> </Offcanvas.Title>
                </Offcanvas.Header>
                <div style={legendStyle}>
                    <div className='state-approved circle'> </div>
                    <span > Approved Maps </span> <br/>
                    <div className='state-proposed circle'> </div>
                    <span> Proposed Maps </span>
                </div> <hr />
                <Offcanvas.Body>
                    {teamStates.map(obj => <>
                        <div className={`${obj.status ? "state-approved" : "state-proposed"} circle`}> </div>
                        <div class ="underline-on-hover" style={stateStyle}> {obj.name}</div> 
                        <div style={teamStyle}>
                            Team(s): {obj.teams.map(team => <> {team} </>)}
                        </div>
                    </>)}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default LeftSidebar;
