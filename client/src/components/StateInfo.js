import DemographicTable from './DemographicTable';
import Table from 'react-bootstrap/Table';

const StateInfo = (props) => {
    return (
        <>
            <h5 id="total-pop">{props.name} Population Data 2020</h5>
            <DemographicTable />
            <br></br>

            <h5 id="voting-age">Voting Age Population 2020</h5>
            <Table striped responsive="sm" bordered hover>
                <thead>
                    <tr>
                        <th>Race</th>
                        <th>Population</th>
                        <th>%</th>
                    </tr>
                </thead>
            </Table>
            <br></br>

            <h5 id="composite">Composite 2020</h5>
            <Table striped responsive="sm" bordered hover>
                <thead>
                    <tr>
                        <th>Votes</th>
                        <th>%</th>
                    </tr>
                </thead>
            </Table>
        </>);
}

export default StateInfo;