import statemeasures from '../assets/img/state_measures.png'
import SeatVoteCurve from './SeatVoteCurve';

import Table from 'react-bootstrap/Table';

const imageComponentSidebar_Ten = {
    width: 150,
    height: 50
}

const imageComponentSidebar_SC = {
    width: 150,
    height: 90
}

const DistrictMeasureInfo = (props) => {

    let imageComponentSidebar = imageComponentSidebar_SC;
    if (props.name === "Tennessee") {
        imageComponentSidebar = imageComponentSidebar_Ten;
    }

    let basic = <>
        <h5 id="more-measures">Measures</h5>
        <img src={statemeasures} style={imageComponentSidebar} />
        <br></br><br></br>
        
        <h5 id="seat-vote"> Measure of Fairness - Seats to Vote</h5>
        <SeatVoteCurve/>
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
                        <img src={statemeasures} style={imageComponentSidebar} />
                        <br></br><br></br>

                        <h5 id="seat-vote">Measure of Fairness - Seats to Vote</h5>
                        <div><SeatVoteCurve/></div>
                    </td>
                </Table>

                <Table className='column'>
                    <td>
                        <h5 id="more-measures">Measures</h5>
                        <img src={statemeasures} style={imageComponentSidebar} />
                        <br></br><br></br>

                        <h5 id="seat-vote">Measure of Fairness - Seats to Vote</h5>
                        <div><SeatVoteCurve/></div>
                        <br></br>
                    </td>
                </Table>
            </tbody>
        </Table>
    }

    return (basic);

}

export default DistrictMeasureInfo;