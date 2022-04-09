
import json
 
# Opening JSON file
f_counties_geometry = open('/Users/cherrypi/Desktop/tennessee_counties.json')

f_precinct_geometry = open('/Users/cherrypi/Desktop/tennessee_precinct_geometry_election_2020.json')
f_precinct_features = open('/Users/cherrypi/Desktop/tennessee_precinct_election_feature_2020.json')


'''
the entire point of this script is to turn the precinct level data into this format digestible for seawulf:
        {
        "1": {
        "adjacent_nodes": [
        "2",
        "12"
        ],
        "population": 50,
        "voting_history": "D",
        "district": "A"
        },
        "2": {
        "adjacent_nodes": [
        "3",
        "13"
        ],
        "population": 50,
        "voting_history": "D",
        "district": "A"
        },

'''
# returns JSON object as
# a dictionary
data = json.load(f_counties_geometry)
 
# Iterating through the json
# list
 
# Closing file
f.close()