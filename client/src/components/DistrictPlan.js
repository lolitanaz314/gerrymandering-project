import {AiOutlinePushpin, AiFillPushpin} from "react-icons/ai";

const DistrictPlan = (props) => {
    return(
        <div>
            <AiOutlinePushpin className='pin-icon icon-unfilled' id={props.state + '-outline-' + props.id}
                onClick={() => props.pinDP(props.id)} />
            <AiFillPushpin className='pin-icon icon-filled hidden' id={props.state + '-fill-' + props.id} 
                onClick={() => props.unpinDP(props.id)} />
            <div id={"dp-" + props.id} className={`dp-item ${(props.id === 0) ? "dp-selected" : ""}`} onClick={() => props.selectDP(props.id)}>
                <div style={{textAlign:'right', width:'85%'}}><b>{props.plan.dupPlanId}</b></div>
                <span className="summary-text">Status: {props.plan.status}</span><br/>
                <span className="summary-text">Majority-Minority Districts: {props.plan.numMajorityMinorityDistricts}</span><br/>
                <span className="summary-text">Compactness: {String(props.plan.polsbyPopper).slice(0,5)}</span><br/>
                <span className="summary-text">Efficiency Gap: {String(props.plan.efficiencyGap).slice(0,5)}</span>
            </div>
        </div>
    );

}

export default DistrictPlan