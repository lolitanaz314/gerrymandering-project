import statemeasures from '../assets/img/state_measures.png'
import SeatVoteCurve from './SeatVoteCurve';

import Table from 'react-bootstrap/Table';
import DistrictPlanMeasuresTable from './DistrictPlanMeasuresTable';

const imageComponentSidebar = {
    width: 550,
    height: 200
}

const curveStyle = { //style for selected dp
    height: '330px',
    width: '650px'
}

const comparingStyle = { //style for compare view (seat plot)
    height: '300px',
    width: '300px'
}

const tableStyle = { //style for compare view (img)
    width: 300,
    height: 100
}

const DistrictMeasureInfo = (props) => {

    let basic = <>
        <h5 id="more-measures">Measures</h5>
        <div style={imageComponentSidebar}> <DistrictPlanMeasuresTable/> </div>
        <br></br><br></br>
        
        <h5 id="seat-vote"> Measure of Fairness - Seats to Vote</h5>
        <div style={curveStyle}> <SeatVoteCurve/> </div>
        <br></br>
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
                        <h5 id="more-measures">Measures</h5>
                        <img src={statemeasures} style={tableStyle} />
                        <br></br><br></br>

                        <h5 id="seat-vote">Measure of Fairness - Seats to Vote</h5>
                        <div style={comparingStyle}> <SeatVoteCurve/> </div>
                    </td>
                </Table>

                <Table className='column'>
                    <td>
                        <h5 id="more-measures">Measures</h5>
                        <img src={statemeasures} style={tableStyle} />
                        <br></br><br></br>

                        <h5 id="seat-vote">Measure of Fairness - Seats to Vote</h5>
                        <div style={comparingStyle}> <SeatVoteCurve/> </div>
                    </td>
                </Table>
            </tbody>
        </Table>
    }

    return (basic);

}

export default DistrictMeasureInfo;