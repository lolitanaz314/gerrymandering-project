import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import State from '../api/service/StateService';
// import Demographic from '../api/service/DemographicService';

const DemographicTable = (props) => {

    const [demographic, setDemographic] = useState({});

    useEffect(() => {
        // Demographic.getAllDemographics()
        // console.log(props.code);
        State.getStateById(props.code)
        .then(response => {
            // console.log('Printing user data', response);
            console.log('Printing user data', response.data.demographic);
            setDemographic(response.data.demographic);
          })
          .catch(error => {
            console.log('Something went wrong', error);
          })    
      }, [demographic]);

      return (
        <>
            {/*<button onClick={this.retrieveUsers} href="/users">click</button>*/}
            <Table striped responsive="sm" bordered hover>
                    <thead>
                        <tr>
                            <th>Race</th>
                            <th>Population</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Object.keys(demographic).map(function (key) {
                        return <>
                            <tr>
                                <td>{key}</td>
                                <td>{demographic[key]}</td>
                            </tr>
                        </>;
                    })}
                    </tbody>
            </Table>                                        
        </>)
}

export default DemographicTable;