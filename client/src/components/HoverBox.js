const HoverBox = (props) => {
    
    return (
        <div className="info-box hidden">
            {!props.onselect.district && props.view === "election" && (
                <div className="census-info-hover">
                    <strong>{props.name} Election Data </strong>
                    <p>Hover on each congressional district for more details</p>
                </div>
            )}
            {!props.onselect.district && props.view === "population" && (
                <div className="census-info-hover">
                    <strong>{props.name} Population Data </strong>
                    <p>Hover on each congressional district for more details</p>
                </div>
            )}

            {props.onselect.district && props.view === "election" && (
                <ul className="census-info" style={{ height: '15%', width: '40%' }}>
                    <li><strong>District {props.onselect.district}</strong></li><br />
                    <li>Incumbent: {props.onselect.incumbent}</li>
                    <li>Partisan Lean: {props.onselect.lean}</li>
                    <li>Compactness: X</li>
                </ul>
            )}
            {props.onselect.district && props.view === "population" && (
                <ul className="census-info" style={{ height: 'fit-content', width: '54%' }}>
                    <li><strong>District {props.onselect.district}</strong></li><br />
                    <li>Total Population: {props.onselect.population}</li>
                    <li>White: {props.onselect.white}</li>
                    <li>Black or African American: {props.onselect.black}</li>
                    <li>American Indian and Alaska Native: {props.onselect.native}</li>
                    <li>Asian: {props.onselect.asian}</li>
                    <li>Native Hawaiian and Other Pacific Islander: {props.onselect.islander}</li>
                    <li>Hispanic or Latino: {props.onselect.hispanic}</li>
                </ul>
            )}
        </div>
    );
}

export default HoverBox;