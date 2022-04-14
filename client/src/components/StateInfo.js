import DemographicTable from './DemographicTable';
import Table from 'react-bootstrap/Table';

const StateInfo = (props) => {
    let basic = <>
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
    </>;

    //IF USER CLICKS COMPARE BUTTON, CHANGE THE VIEW
    if (props.compare) {

    }

    return (basic);
}

export default StateInfo;