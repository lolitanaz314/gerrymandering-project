import Dropdown from 'react-bootstrap/Dropdown'
import './style/DropdownMenu.css';

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