import DemographicTable from './DemographicTable';
import Table from 'react-bootstrap/Table';

const StateInfo = (props) => {
    let basic = <>
        <h6 id="total-pop">Population Data 2020</h6>
        <DemographicTable />
        <br></br>

        <h6 id="voting-age">Voting Age Population 2020</h6>
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

        <h6 id="composite">Composite 2020</h6>
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
        basic = <Table>
            <thead>
                <tr>
                    <th style={{float:'left'}}>District Plan {props.currentDp}</th>
                    <th style={{float:'right'}}>District Plan {props.pinned}</th>
                </tr>
            </thead>

            <tbody>
                <Table className='column'>
                    <td>
                        <h6 id="total-pop">Population Data 2020</h6>
                        <DemographicTable />
                        <br></br>

                        <h6 id="voting-age">Voting Age Population 2020</h6>
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

                        <h6 id="composite">Composite 2020</h6>
                        <Table striped responsive="sm" bordered hover>
                            <thead>
                                <tr>
                                    <th>Votes</th>
                                    <th>%</th>
                                </tr>
                            </thead>
                        </Table>
                    </td>
                </Table>

                <Table className='column'>
                    <td>
                        <h6 id="total-pop">Population Data 2020</h6>
                        <DemographicTable />
                        <br></br>

                        <h6 id="voting-age">Voting Age Population 2020</h6>
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

                        <h6 id="composite">Composite 2020</h6>
                        <Table striped responsive="sm" bordered hover>
                            <thead>
                                <tr>
                                    <th>Votes</th>
                                    <th>%</th>
                                </tr>
                            </thead>
                        </Table>
                    </td>
                </Table>
            </tbody>
        </Table>;
    }

    return (basic);
}

export default StateInfo;