const Legend = (props) => {

    //default legend is for election data
    let out = <div className="legend hidden">
        <h9 style={{color:'white', fontWeight:'bold'}}>Partisan Voting Index</h9><br /><br />   
        <div style={{ "--color": "#0015FF" }}>D+41 - D+60</div>
        <div style={{ "--color": "#3A50FF" }}>D+21 - D+40</div>
        <div style={{ "--color": "#7686FF" }}>D+1 - D+20</div>
        <div style={{ "--color": "#FF7676" }}>R+1 - R+20</div>
        <div style={{ "--color": "#FF5050" }}>R+21 - R+40</div>
        <div style={{ "--color": "#FF0000" }}>R+41 - R+60</div>
    </div>

    if(props.view === 'population'){ //population
        out = <div className="legend hidden">
        <h9 style={{color:'white', fontWeight:'bold'}}>Population (per 1000)</h9><br /><br />   
        <div style={{ "--color": "#00A015" }}>751+</div>
        <div style={{ "--color": "#24BE39" }}>601 - 750</div>
        <div style={{ "--color": "#49D55C" }}>451 - 600</div>
        <div style={{ "--color": "#7EEC8D" }}>301 - 450</div>
        <div style={{ "--color": "#B2FFBC" }}>151 - 300</div>
        <div style={{ "--color": "#D6FFDC" }}>0 - 150</div>
    </div>
    }

    return ( out );
}
export default Legend;