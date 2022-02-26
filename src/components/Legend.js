const Legend = (props) => {

    //default legend is for election data
    let out = <div className="legend hidden">
        {/* <div style={{ "--color": '#a50f15' }}>3023 - 6247</div>
        <div style={{ "--color": '#de2d26' }}>676 - 3022</div>
        <div style={{ "--color": '#fb6a4a' }}>428 - 675</div>
        <div style={{ "--color": '#fc9272' }}>236 - 427</div>
        <div style={{ "--color": '#fcbba1'}}>23 - 235</div>
        <div style={{ "--color": '#fee5d9' }}>6 - 22</div> */}
        <h9 style={{color:'white', fontWeight:'bold'}}>Partisan Voting Index</h9><br />    
        <div style={{ "--color": "#0015FF" }}>D+41 - D+60</div>
        <div style={{ "--color": "#3A50FF" }}>D+21 - D+40</div>
        <div style={{ "--color": "#7686FF" }}>D+1 - D+20</div>
        <div style={{ "--color": "#FF7676" }}>R+1 - R+20</div>
        <div style={{ "--color": "#FF5050" }}>R+21 - R+40</div>
        <div style={{ "--color": "#FF0000" }}>R+41 - R+60</div>
    </div>

    return (
        out
    );
}
export default Legend;