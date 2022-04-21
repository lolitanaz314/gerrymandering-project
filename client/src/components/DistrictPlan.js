import {AiOutlinePushpin, AiFillPushpin} from "react-icons/ai";

const path = process.env.PUBLIC_URL + '/img/';

const DistrictPlan = (props) => {
    
    return(
        <div>
            <AiOutlinePushpin className='pin-icon icon-unfilled' id={props.state + '-outline-' + props.id}
                onClick={() => props.pinDP(props.id)} />
            <AiFillPushpin className='pin-icon icon-filled hidden' id={props.state + '-fill-' + props.id} 
                onClick={() => props.unpinDP(props.id)} />
            <img src={path + props.code + '-' + props.id + '.png'} id={props.state + "-" + props.id}
                className='dp-item' onClick={() => props.selectDP(props.id)} />
            <span>{props.plan.status}</span>
        </div>
    );

}

export default DistrictPlan