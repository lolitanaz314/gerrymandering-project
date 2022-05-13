import {AiOutlinePushpin, AiFillPushpin} from "react-icons/ai";

const path = process.env.PUBLIC_URL + '/img/';

const DistrictPlan = (props) => {
    
    return(
        <div>
            <AiOutlinePushpin className='pin-icon icon-unfilled' id={props.state + '-outline-' + props.id}
                onClick={() => props.pinDP(props.id)} />
            <AiFillPushpin className='pin-icon icon-filled hidden' id={props.state + '-fill-' + props.id} 
                onClick={() => props.unpinDP(props.id)} />
            <div id={props.state + "-" + props.id} className='dp-item' onClick={() => props.selectDP(props.id)}>
                <span><b>District plan #{props.id}</b></span><br/>
                <span>Status: {props.plan.status}</span><br/>
                <span>Major-Minority Districts: X</span><br/>
                <span>Split Counties: X</span>
            </div>
        </div>
    );

}

export default DistrictPlan