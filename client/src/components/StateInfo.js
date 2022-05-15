import DemographicTable from './DemographicTable';
import Table from 'react-bootstrap/Table';

const comparingStyle = { //height is used to make sure the comparision sections are lined up
    height: '80px',
    width: 'fit-content'
}

const StateInfo = (props) => {
    let basic = <>
        <h5 id="districting-sum">Overview</h5>
        <p>
            <b>Status:</b> {props.plan.status}<br></br>
            <b>Proposed By:</b> {props.plan.proposedBy}<br></br>
            <b>Date Proposed:</b> {props.plan.date}
        </p>

        <h5 id="total-pop">Population Data 2020</h5>
        {/* <DemographicTable demographic={props.state.demographic}/> */}
        <br></br>

        <h5 id="voting-age">Voting Age Population 2020</h5>
        <Table striped responsive="sm" bordered hover>
            <thead>
                <tr>
                    <th>Race</th>
                    <th>Population</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(props.votingData).map(function (key) {
                    return <>
                        <tr>
                            <td>{key}</td>
                            <td>{props.votingData[key]}</td>
                        </tr>
                    </>;
                })}
            </tbody>
        </Table>
        <br></br>

        <h5 id="composite">Composite 2020</h5>
        <Table striped responsive="sm" bordered hover>
            <thead>
                <tr>
                    <th>Party</th>
                    <th>Votes</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(props.plan.compositeData).map(function (key) {
                    return <>
                        <tr>
                            <td>{key}</td>
                            <td>{props.plan.compositeData[key]}</td>
                        </tr>
                    </>;
                })}
            </tbody>
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
            
            {/* table for 'selected' district plan */}
            <tbody>
                <Table className='column'>
                    <td>
                        <h5 id="districting-sum">Overview</h5>
                        <p style={comparingStyle}>
                            <b>Status:</b> {props.plan.status}<br></br>
                            <b>Proposed By:</b> {props.plan.proposedBy}<br></br>
                            <b>Date Proposed:</b> {props.plan.date}
                        </p>
                        
                        <h5 id="total-pop">Population Data 2020</h5>
                        {/* <DemographicTable demographic={props.state.demographic}/> */}
                        <br></br>

                        <h5 id="voting-age">Voting Age Population 2020</h5>
                        <Table striped responsive="sm" bordered hover>
                            <thead>
                                <tr>
                                    <th>Race</th>
                                    <th>Population</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(props.votingData).map(function (key) {
                                    return <>
                                        <tr>
                                            <td>{key}</td>
                                            <td>{props.votingData[key]}</td>
                                        </tr>
                                    </>;
                                })}
                            </tbody>
                        </Table>
                        <br></br>

                        <h5 id="composite">Composite 2020</h5>
                        <Table striped responsive="sm" bordered hover>
                            <thead>
                                <tr>
                                    <th>Party</th>
                                    <th>Votes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(props.plan.compositeData).map(function (key) {
                                    return <>
                                        <tr>
                                            <td>{key}</td>
                                            <td>{props.plan.compositeData[key]}</td>
                                        </tr>
                                    </>;
                                })}
                            </tbody>
                        </Table>
                    </td>
                </Table>

                {/* table for 'pinned' district plan */}
                <Table className='column'>
                    <td>
                        <h5 id="districting-sum">Overview</h5>
                        <p style={comparingStyle}>
                            <b>Status:</b> {props.comparing.status}<br></br>
                            <b>Proposed By:</b> {props.comparing.proposedBy}<br></br>
                            <b>Date Proposed:</b> {props.comparing.date}
                        </p>

                        <h5 id="total-pop">Population Data 2020</h5>
                        {/* <DemographicTable demographic={props.state.demographic}/> */}
                        <br></br>

                        <h5 id="voting-age">Voting Age Population 2020</h5>
                        <Table striped responsive="sm" bordered hover>
                            <thead>
                                <tr>
                                    <th>Race</th>
                                    <th>Population</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(props.votingData).map(function (key) {
                                    return <>
                                        <tr>
                                            <td>{key}</td>
                                            <td>{props.votingData[key]}</td>
                                        </tr>
                                    </>;
                                })}
                            </tbody>
                        </Table>
                        <br></br>

                        <h5 id="composite">Composite 2020</h5>
                        <Table striped responsive="sm" bordered hover>
                            <thead>
                                <tr>
                                    <th>Party</th>
                                    <th>Votes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(props.comparing.compositeData).map(function (key) {
                                    return <>
                                        <tr>
                                            <td>{key}</td>
                                            <td>{props.comparing.compositeData[key]}</td>
                                        </tr>
                                    </>;
                                })}
                            </tbody>
                        </Table>
                    </td>
                </Table>
            </tbody>
        </Table>;
    }

    return (basic);
}

export default StateInfo;