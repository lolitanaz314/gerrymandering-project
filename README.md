# gerrymandering-project
CSE 416 Project

<hr />
<b>Run server:</b> <br/>
mvn clean install <br />
mvn spring-boot:run


<hr />
<b>In client:</b>
npm install axios

Navbar options: "npm install react react-dom"<br/>
                "npm install react-bootstrap bootstrap@5.1.3"

Popup Modal: "npm install reactjs-popup --save"

Tabs: "npm install react-bootstrap-tabs" <br/> "npm install react-bootstrap-tab"

Icon: "npm install react-icons"

Recharts: "npm install recharts"

Plotly: "npm install react-plotly.js plotly.js"

// currently wont need <br/>
Centroid: "npm install @turf/centroid" <br/>
Center of Mass: "npm install @turf/center-of-mass" <br/>
Routes: "npm install browser-router" <br/>


<hr />
<b>In data:</b>

MGGG algorithm: pip install gerrychain

Mapping geographies (precinct to block, block to district): pip install maup

<hr />
<b>Terminal command used to compress geojson file:<b/><br/>
&emsp;npm install -g mapshaper <br/>
&emsp;mapshaper old_file.geojson -simplify dp 10% keep-shapes -o format=geojson new_file.geojson <br/>
File is 10% smaller than the original file
