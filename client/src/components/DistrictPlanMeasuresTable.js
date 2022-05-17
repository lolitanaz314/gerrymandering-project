import Table from 'react-bootstrap/Table';

const DistrictPlanMeasuresTable = (props) => {
    return (
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
                    <td>{props.plan.polsbyPopper}</td>
                </tr>
                <tr>
                    <td>Equal Population</td>
                    <td>{props.plan.populationEquality}</td>
                </tr>
                <tr>
                    <td>Majority-Minority Districts</td>
                    <td>{props.plan.numMajorityMinorityDistricts}</td>
                </tr>
                <tr>
                    <td>Split Counties</td>
                    <td>{props.plan.splitCounty}</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default DistrictPlanMeasuresTable;