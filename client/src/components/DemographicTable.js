import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Demographic from '../api/service/DemographicService';

const DemographicTable = (props) => {

    const [demographic, setDemographic] = useState([]);

    useEffect(() => {
        Demographic.getAllDemographics()
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
            <Table striped responsive="sm" bordered hover id="total-pop">
                    <thead>
                        <tr>
                            <th>Race</th>
                            <th>Population</th>
                            <th>%</th>
                        </tr>
                    </thead>
                    <tbody>
                    {demographic.map(demographic => (
                        <tr key = {demographic.id}>
                            <td>{demographic.race}</td>
                            <td>{demographic.totalPop}</td>
                        </tr>
                    ))}
                    </tbody>
            </Table>                                        
            <br></br>

            <h4>Voting Age Population 2020</h4>
            <Table striped responsive="sm" bordered hover id="voting-age">
                <thead>
                    <tr>
                        <th>Race</th>
                        <th>Population</th>
                        <th>%</th>
                    </tr>
                </thead>
            </Table>
            <br></br>
            
            <h4>Composite 2020</h4>   
            <Table striped responsive="sm" bordered hover id="composite">
                <thead>
                    <tr>
                        <th>Votes</th>
                        <th>%</th>
                    </tr>
                </thead>
            </Table>
        </>)
}

export default DemographicTable;