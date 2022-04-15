import DemographicTable from './DemographicTable';
import SeatVoteCurve from './SeatVoteCurve';
import Table from 'react-bootstrap/Table';

const StateInfo = (props) => {
    let basic = <>
        <h5 id="districting-sum">Overview</h5>
        <p>
            {/* Date: 0000<br></br> */}
            <b>Status:</b> {props.plan.status}<br></br>
            <b>Proposed By:</b> {props.plan.proposedBy}
        </p>
        <br></br>

        <h5 id="total-pop">Population Data 2020</h5>
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
        basic = <Table>
            <thead>
                <tr>
                    <th style={{ float: 'left' }}>District Plan {props.currentDp}</th>
                    <th style={{ float: 'right' }}>District Plan {props.pinned}</th>
                </tr>
            </thead>

            <tbody>
                <Table className='column'>
                    <td>
                        <h5 id="districting-sum">Overview</h5>
                        <p>
                            {/* Date: 0000<br></br> */}
                            <b>Status:</b> {props.plan.status}<br></br>
                            <b>Proposed By:</b> {props.plan.proposedBy}
                        </p>
                        <br></br>
                        <h5 id="total-pop">Population Data 2020</h5>
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
                    </td>
                </Table>

                <Table className='column'>
                    <td>
                        <h5 id="districting-sum">Overview</h5>
                        <p>
                            {/* Date: 0000<br></br> */}
                            <b>Status:</b> {props.comparing.status}<br></br>
                            <b>Proposed By:</b> {props.comparing.proposedBy}
                        </p>
                        <br></br>
                        <h5 id="total-pop">Population Data 2020</h5>
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
                    </td>
                </Table>
            </tbody>
        </Table>;
    }

    return (basic);
}

export default StateInfo;