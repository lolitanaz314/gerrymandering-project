# Redistricting Analysis tool
Team members (4): Jun Ho Lee, Jenny Fu, Lolita Nazarov, Christina Low

## Dependencies used 
A] Client (JS):
* React
* BootStrap 5
* leaflet
* plotly.js
* axios

B] Server (Java):
* Spring Boot
* JPA
* Hibernate ORM
* Lombok

C] Database (MySQL)

D] Data processing (python):
* pandas
* matplotlib
* geopandas
* shapely
* gerrychain

## About the project
Redistricting Analysis tool is a full stack web application that analyzes the gerrymandering of multiple district plans in 3 US states. We worked on Tennessee, Colorado, and South Carolina

## How does it work?
### A] Map display
In the start of the page, the user will be presnted a map of the United States. Three states - Tennessee, Colorado, and South Carolina - are highlighted so that user can click the state to learn about it. Once a state is chosen, the map zooms into the chosen state and a sidebar appears to present information.

### B] Sidebar
On the top half of the sidebar, there is a carousel of clickable district plans along with information about them. Once a district plan is clicked, the map updates borer lines of congresional districts, counties, and precincts.

### 1) Summary
Shows summary about the state and district plan. This shows:
* population and demographic data based on Census 2020
* who proposed the plan, when was it proposed, and status

### 2) Measures
Shows summary of measures such as:
* seat-vote curve
* efficiency gap
* majority-minoriy districts
* compactness
* equal population
* split counties
* competitive district
* radar chart for comparing these measures above

### 3) Simulated results
Shows distribution of:
* number of majority-minority districts
* republican/democratic split

by extracting data from 10,000 simulated redistricting of a state <br />
[y-axis: # of simulated district plans]

### 4) Box and Whisker
Shows box and whiskers plot of:
* distribution of percentage of chosen demographic in each district

by extracting data from 10,000 simulated redistricting of a state <br />
[x-axis: district ordered by percentage of chosen demographic from least to greatest <br />
 y-axis: distribution of percentage of chosen demographic in district]