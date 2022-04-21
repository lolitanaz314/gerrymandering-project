import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

const DemographicTable = (props) => {

      return (
        <>
            <Table striped responsive="sm" bordered hover>
                    <thead>
                        <tr>
                            <th>Race</th>
                            <th>Population</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Object.keys(props.demographic).map(function (key) {
                        return <>
                            <tr>
                                <td>{key}</td>
                                <td>{props.demographic[key]}</td>
                            </tr>
                        </>;
                    })}
                    </tbody>
            </Table>                                        
            
        </>)
}

export default DemographicTable;