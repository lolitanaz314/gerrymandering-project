import Table from 'react-bootstrap/Table';

const DistrictPlanMeasuresTable = (props) => {

      return (
        <>
            {/*<button onClick={this.retrieveUsers} href="/users">click</button>*/}
            <Table striped responsive="sm" bordered hover>
                    <thead>
                        <tr>
                            <th>Measure</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Polsby-Popper Compactness</td>
                            <td>X</td>
                        </tr>
                        <tr>
                            <td>Equal Population</td>
                            <td>X</td>
                        </tr>
                        <tr>
                            <td>Majority-Minority Districts</td>
                            <td>X</td>
                        </tr>
                        <tr>
                            <td>Split Counties</td>
                            <td>X</td>
                        </tr>
                    </tbody>
            </Table>                                        
            
        </>)
}

export default DistrictPlanMeasuresTable;