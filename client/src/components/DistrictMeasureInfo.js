import statemeasures from '../assets/img/state_measures.png'
import seats_to_votes from '../assets/img/seats_to_votes.png'

import Table from 'react-bootstrap/Table';

const imageComponentSidebarStV = {
    width: 275,
    height: 208
}

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
        <h6 id="districting-sum">Overview</h6>
        <p>
            Date: 0000<br></br>
            Status: Enacted<br></br>
            Proposed By: xyz
        </p>
        <br></br>

        <h6 id="more-measures">More Measures here</h6>
        <img src={statemeasures} style={imageComponentSidebar} />
        <br></br>
        <br></br>

        <h6 id="seat-vote">Measure of Fairness - Seats to Votes</h6>
        <img src={seats_to_votes} style={imageComponentSidebarStV} />
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
                        <h6 id="districting-sum">Overview</h6>
                        <p>
                            Date: 0000<br></br>
                            Status: Enacted<br></br>
                            Proposed By: xyz
                        </p>
                        <br></br>

                        <h6 id="more-measures">More Measures here</h6>
                        <img src={statemeasures} style={imageComponentSidebar} />
                        <br></br>
                        <br></br>

                        <h6 id="seat-vote">Measure of Fairness - Seats to Votes</h6>
                        <img src={seats_to_votes} style={imageComponentSidebarStV} />
                    </td>
                </Table>

                <Table className='column'>
                    <td>
                        <h6 id="districting-sum">Overview</h6>
                        <p>
                            Date: 0000<br></br>
                            Status: Enacted<br></br>
                            Proposed By: xyz
                        </p>
                        <br></br>

                        <h6 id="more-measures">More Measures here</h6>
                        <img src={statemeasures} style={imageComponentSidebar} />
                        <br></br>
                        <br></br>

                        <h6 id="seat-vote">Measure of Fairness - Seats to Votes</h6>
                        <img src={seats_to_votes} style={imageComponentSidebarStV} />
                    </td>
                </Table>
            </tbody>
        </Table>
    }

    return (basic);

}

export default DistrictMeasureInfo;