const HoverBox = (props) => {
    
    return (
        <div className="info-box hidden">
            {!props.onselect.district && (
                <div className="census-info-hover">
                    <strong>{props.name} Election Data </strong>
                    <p>Hover on each congressional district for more details</p>
                </div>
            )}
            {props.onselect.district && (
                <ul className="census-info" style={{ height: '23%', width: '45%' }}>
                    <li><strong>District {props.onselect.district}</strong></li>
                    <li>Compactness: {props.onselect.compactness}</li>
                    <li>Population: {props.onselect.population}</li>
                    <li>White: {props.onselect.white}</li>
                    <li>Black: {props.onselect.black}</li>
                    <li>Hispanic: {props.onselect.hispanic}</li>
                    <li>Asian: {props.onselect.asian}</li>
                    <li>Native: {props.onselect.native}</li>
                    <li>Mixed: {props.onselect.mixed}</li>
                </ul>
            )}
        </div>
    );
}

export default HoverBox;