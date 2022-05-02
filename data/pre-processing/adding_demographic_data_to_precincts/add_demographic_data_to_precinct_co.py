import geopandas as gpd
import pandas as pd
import maup
import json
import numpy as np

import warnings; warnings.filterwarnings('ignore', 'GeoSeries.isna', UserWarning)

precincts_co=geopandas.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/co_data/precinct/co_precinct_and_election_shp")
precincts_co.to_crs(inplace=True, crs="EPSG:4269")
display(precincts_co)

block_co=geopandas.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/co_data/precinct/co_cvap_2020_block_shp")
block_co.to_crs(inplace=True, crs="EPSG:4269")
display(block_co)
print(block_co.columns)

assignment_co=maup.assign(block_co, precincts_co) # this returns a Pandas Series that assigns blocks to precincts

variables_co = ["CVAP_TOT20", "CVAP_ASN20", "CVAP_BLK20", "CVAP_NHP20", "CVAP_WHT20", "CVAP_HSP20", "CVAP_2OM20"]
precincts_co[variables_co] = block_co[variables_co].groupby(assignment_co).sum()
#display(precincts_co[variables_co])

renamed_precincts_co=precincts_co.rename(columns={"PRECINCT": "precinctId", 
                                                  'STATEFP': 'stateId',
                                                  "G20PREDBID": "democraticPres", 'G20PRERTRU': 'republicanPres', 
                                                  'G20USSDHIC': 'democraticSen', 'G20USSRGAR': 'republicanSen',
                                                  "CVAP_TOT20":"total_pop", "CVAP_ASN20":"asian", 
                                                  "CVAP_BLK20":"af_amer", "CVAP_NHP20":"native_hawaiian", "CVAP_WHT20": 
                                                  "white", "CVAP_HSP20":"hispanic", "CVAP_2OM20": "two_or_more"})
print(renamed_precincts_co.columns)

# Drop columns that don't have to do with the President or Senate, or democratic/republican
final_precincts_co = renamed_precincts_co.drop(['VTDST', 'G20PRELJOR', 'G20PREGHAW', 'G20PRECBLA', 'G20PREUWES', 'G20PREOOTH', 'G20USSLDOA', 'G20USSODOY', 'G20USSOEVA', 'G20USSOWRI'], 1)

# creating percentages from the precincts data

final_precincts_co["totalPres"]= final_precincts_co["democraticPres"]+final_precincts_co["republicanPres"]
final_precincts_co["democraticPres"] = final_precincts_co["democraticPres"] / final_precincts_co["totalPres"]
final_precincts_co["republicanPres"] = final_precincts_co["republicanPres"] / final_precincts_co["totalPres"]

final_precincts_co["totalSen"]=final_precincts_co["democraticSen"]+final_precincts_co["republicanSen"]
final_precincts_co["democraticSen"] = final_precincts_co["democraticSen"] / final_precincts_co["totalSen"]
final_precincts_co["republicanSen"] = final_precincts_co["republicanSen"] / final_precincts_co["totalSen"]

final_precincts_co.drop(['totalSen', 'totalPres'], axis=1, inplace=True)

# making the demographics all ints
final_precincts_co['total_pop']=final_precincts_co['total_pop'].astype(int)
final_precincts_co['asian']=final_precincts_co['asian'].astype(int)
final_precincts_co['af_amer']=final_precincts_co['af_amer'].astype(int)
final_precincts_co['native_hawaiian']=final_precincts_co['native_hawaiian'].astype(int)
final_precincts_co['white']=final_precincts_co['white'].astype(int)
final_precincts_co['hispanic']=final_precincts_co['hispanic'].astype(int)
final_precincts_co['two_or_more']=final_precincts_co['two_or_more'].astype(int)

final_precincts_co['stateId']=final_precincts_co['stateId'].replace("08", "Co")


# Assigning to a district for an initial partition 

district_co=geopandas.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/co_data/district/CO_House_Of_Rep_Districts_Prelim_PROPOSED_shp")

final_precincts_co.to_crs(district_co.crs, inplace=True)
assignment_prec_to_district_co = maup.assign(final_precincts_co, district_co)
final_precincts_co["districtId"] = assignment_prec_to_district_co

geojson = {
        "type": "FeatureCollection",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::4269" } },
        "features": []
}

for i in range(len(final_precincts_co)):
    #print(i)
    insideDict={}  # this is ONE precinct being added!!!
    onedict=final_precincts_co.iloc[i].to_dict()
    geom=onedict.pop('geometry')

    insideDict["type"] = "Feature"
    insideDict["properties"] = onedict

    insideDict["geometry"]={}
    insideDict["geometry"]['type'] = geom.type
    
    if (insideDict["geometry"]['type'] == 'MultiPolygon'):
        insideDict["geometry"]['coordinates'] = [list(x.exterior.coords) for x in geom.geoms] # multipolygons
    elif (insideDict["geometry"]['type'] == 'Polygon'):
        insideDict["geometry"]['coordinates'] = [[thing[0], thing[1]] for thing in geom.exterior.coords]

    geojson["features"].append(insideDict)

with open("/Users/cherrypi/cse416/processed_preseawulf_precincts_path/final_precinct_co.json", 'w') as outfile:
    json.dump(geojson, outfile, indent=1)

'''
print(final_precincts_co.columns)  # just to check

f = open("/Users/cherrypi/cse416/processed_preseawulf_precincts_path/final_precinct_co.json")
 
# returns JSON object as
# a dictionary
data = json.load(f)
# get geometries and set it manually
precincts=data["features"]
geo_list=[]
for i, p in enumerate(precincts):
    geo=p["geometry"]
    geo_list.append(geo)

geo_series_list = pd.Series(geo_list)

'''

