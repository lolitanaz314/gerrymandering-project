import SeatVoteCurve from './SeatVoteCurve';
import RadarCharting from './RadarChart';
import Table from 'react-bootstrap/Table';
import DistrictPlanMeasuresTable from './DistrictPlanMeasuresTable';

// fake data
const data = [
    {
        "measure": "Majority-Minority Districts",
        "A": 120,
        "B": 100,
        "fullMark": 150
    },
    {
        "measure": "Efficiency Gap",
        "A": 98,
        "B": 120,
        "fullMark": 150
    },
    {
        "measure": "Competitive Districts",
        "A": 86,
        "B": 90,
        "fullMark": 150
    },
    {
        "measure": "Projected Political Fairness",
        "A": 99,
        "B": 50,
        "fullMark": 150
    },
    {
        "measure": "Compactness",
        "A": 85,
        "B": 70,
        "fullMark": 150
    },
];

const curveStyle = { //style for graphs
    height: '330px',
    width: 'inherit'
}

const comparingStyle = { //style for compare view (seat plot)
    height: '300px',
    width: '300px'
}

const tableStyle = { //style for compare view (measure table)
    // width: 300,
    height: 200
}

const DistrictMeasureInfo = (props) => {

    let basic = <>
        <h5 id="more-measures">Measures</h5>
        <div> <DistrictPlanMeasuresTable /> </div>
        <br></br>

        <h5 id="seat-vote"> Measure of Fairness - Seats to Vote</h5>
        <div style={curveStyle}> <SeatVoteCurve /> </div>
        <br></br>

        <h5 id="radar-chart">Radar Chart</h5>
        <div style={curveStyle}> <RadarCharting data={data} currentDp={props.currentDp} comparing={props.compare} /> </div>
        <br></br>
    </>;

    //IF USER CLICKS COMPARE BUTTON, CHANGE THE VIEW
    if (props.compare) {
        basic = <>
            <Table>
                <thead>
                    <tr>
                        <th style={{ float: 'left' }}>District Plan {props.currentDp}</th>
                        <th style={{ float: 'right' }}>District Plan {props.pinned}</th>
                    </tr>
                </thead>

                <tbody>
                    <Table className='column'>
                        <td>
                            <h5 id="more-measures">Measures</h5>
                            <div style={tableStyle}> <DistrictPlanMeasuresTable /> </div>
                            <br></br>

                            <h5 id="seat-vote">Measure of Fairness - Seats to Vote</h5>
                            <div style={comparingStyle}> <SeatVoteCurve /> </div>
                        </td>
                    </Table>

                    <Table className='column'>
                        <td>
                            <h5 id="more-measures">Measures</h5>
                            <div style={tableStyle}> <DistrictPlanMeasuresTable /> </div>
                            <br></br>

                            <h5 id="seat-vote">Measure of Fairness - Seats to Vote</h5>
                            <div style={comparingStyle}> <SeatVoteCurve /> </div>
                        </td>
                    </Table>
                </tbody>
            </Table>
            <h5 id="radar-chart">Radar Chart</h5>
            <div style={curveStyle}>
                <RadarCharting data={data} currentDp={props.currentDp} pinnedDp={props.pinned} comparing={props.compare} />
            </div>
        </>
    }

    return (basic);

}

export default DistrictMeasureInfo;