import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Demographic from '../service/DemographicService';

const UserTable = (props) => {

    const [demographic, setDemographic] = useState([]);

    useEffect(() => {
        Demographic.getAll()
          .then(response => {
            console.log('Printing user data', response.data);
            setDemographic(response.data);
          })
          .catch(error => {
            console.log('Something went wrong', error);
          })    
      }, []);

      return (
        <>
            {/*<button onClick={this.retrieveUsers} href="/users">click</button>*/}
            <Table striped responsive="sm" bordered hover>
                    <h4>Population Data</h4>
                    <tr>
                        <th>Race</th>
                        <th>Population</th>
                    </tr>
                    {
                        demographic.map(demographic => (
                            <tr>
                                <td>{demographic.race}</td>
                                <td>{demographic.population}</td>
                            </tr>
                        ))
                    }
            </Table>    
        </>)
}

export default UserTable;