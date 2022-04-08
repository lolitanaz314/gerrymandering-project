import tennessee_pic from '../assets/img/tennessee_pic.png';
import south_carolina_pic from '../assets/img/south_carolina_pic.png';
import colorado_pic from '../assets/img/colorado_pic.png';


const DistrictPlan = (props) => {
    var imgSource = colorado_pic;
    if (props.state === "Tennessee") {
        imgSource = tennessee_pic;
    }
    else if (props.state === "South Carolina") {
        imgSource = south_carolina_pic;
    }

    let dp = <img src={imgSource} id={props.state + "-" + props.id} className='dp-item' onClick={() => props.selectDP(props.id)} />;

    if(props.id === 0){
        dp = <img src={imgSource} id={props.state + "-" + props.id} className='dp-item dp-selected' onClick={() => props.selectDP(props.id)} />;
    }

    return(dp);

}

export default DistrictPlan