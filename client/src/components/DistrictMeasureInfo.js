import SeatVoteCurve from './SeatVoteCurve';
import RadarCharting from './RadarChart';
import Table from 'react-bootstrap/Table';
import DistrictPlanMeasuresTable from './DistrictPlanMeasuresTable';

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
    // fake data for radar chart
    const dataA = {
        type: 'scatterpolar',
        r: [3, 10, 39, 31, 15, 4],
        theta: ['Majority-Minority Districts', 'Efficiency Gap', 'Competitive Districts', 'Split Counties', 'Compactness'],
        fill: 'toself',
        name: "District Plan #" + props.currentDp + "       "
    };

    const dataB = {
        type: 'scatterpolar',
        r: [15, 28, 18, 6, 29, 24],
        theta: ['Majority-Minority Districts', 'Efficiency Gap', 'Competitive Districts', 'Split Counties', 'Compactness'],
        fill: 'toself',
        name: "District Plan #" + props.pinned + "       "
    };

    let basic = <>
        <h5 id="more-measures">Measures</h5>
        <div> <DistrictPlanMeasuresTable /> </div>
        <br></br>

        <h5 id="political-fairness">Political Fairness</h5>
            <h6>Seats to Vote Plot</h6>
            <div style={curveStyle}> <SeatVoteCurve /> </div>
            <br></br>
            <Table striped responsive="sm" bordered hover>
                <thead>
                    <tr>
                        <th>Measure</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Efficiency Gap</td>
                        <td>X</td>
                    </tr>
                    <tr>
                        <td>Mean-Median Difference</td>
                        <td>X</td>
                    </tr>
                </tbody>
            </Table>
            
        <hr />
        <h5 id="radar-chart">Radar Chart</h5>
        <RadarCharting dataA={dataA} currentDp={props.currentDp} comparing={props.compare} />
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
                            <br></br><br></br>

                            <h5 id="political-fairness">Political Fairness</h5>
                                <h6>Seats to Vote Plot</h6>
                                <div style={comparingStyle}> <SeatVoteCurve /> </div>
                                <br></br>
                                <Table striped responsive="sm" bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Measure</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Efficiency Gap</td>
                                            <td>X</td>
                                        </tr>
                                        <tr>
                                            <td>Mean-Median Difference</td>
                                            <td>X</td>
                                        </tr>
                                    </tbody>
                                </Table>
                        </td>
                    </Table>

                    <Table className='column'>
                        <td>
                            <h5 id="more-measures">Measures</h5>
                            <div style={tableStyle}> <DistrictPlanMeasuresTable /> </div>
                            <br></br><br></br>

                            <h5 id="political-fairness">Political Fairness</h5>
                            <h6>Seats to Vote Plot</h6>
                            <div style={comparingStyle}> <SeatVoteCurve /> </div>
                                <br></br>
                                <Table striped responsive="sm" bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Measure</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Efficiency Gap</td>
                                            <td>X</td>
                                        </tr>
                                        <tr>
                                            <td>Mean-Median Difference</td>
                                            <td>X</td>
                                        </tr>
                                    </tbody>
                                </Table>
                        </td>
                    </Table>
                </tbody>
            </Table>
            <h5 id="radar-chart">Radar Chart</h5>
            <RadarCharting dataA={dataA} dataB={dataB} currentDp={props.currentDp} pinnedDp={props.pinned} comparing={props.compare} />
        </>
    }

    return (basic);

}

export default DistrictMeasureInfo;