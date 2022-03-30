import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Demographic from '../service/DemographicService';

const DemographicTable = (props) => {

    const [demographic, setDemographic] = useState([]);

    useEffect(() => {
        Demographic.getAll()
          .then(response => {
            setDemographic(response.data);
            console.log('Printing user data', response.data);
          })
          .catch(error => {
            console.log('Something went wrong', error);
          })    
      }, []);

      return (
        <>
            {/*<button onClick={this.retrieveUsers} href="/users">click</button>*/}
            <h4>Population Data</h4>
            <Table striped responsive="sm" bordered hover>
                    <thead>
                        <tr>
                            <th>Race</th>
                            <th>Population</th>
                        </tr>
                    </thead>
                    <tbody>
                    {demographic.map(demographic => (
                        <tr key = {demographic.id}>
                            <td>{demographic.race}</td>
                            <td>{demographic.population}</td>
                        </tr>
                    ))}
                    </tbody>
            </Table>    
        </>)
}

export default DemographicTable;