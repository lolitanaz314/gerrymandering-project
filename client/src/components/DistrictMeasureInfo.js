import statemeasures from '../assets/img/state_measures.png'
import seats_to_votes from '../assets/img/seats_to_votes.png'

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
        <div>
            <h5 id="districting-sum">District Plan {props.currentDp} Summary</h5>
            <p>
                Date: 0000<br></br>
                Status: Enacted<br></br>
                Proposed By: xyz
            </p>
        </div>
        <br></br>

        <div>
            <h5 id="more-measures">More Measures here</h5>
            <img src={statemeasures} style={imageComponentSidebar} />
            <br></br>
        </div>
        <br></br>

        <div>
            <h5 id="seat-vote">Measure of Fairness - Seats to Votes</h5>
            <img src={seats_to_votes} style={imageComponentSidebarStV} />
        </div>
    </>;

    //IF USER CLICKS COMPARE BUTTON, CHANGE THE VIEW
    if(props.compare){
        
    }

    return (basic);

}

export default DistrictMeasureInfo;