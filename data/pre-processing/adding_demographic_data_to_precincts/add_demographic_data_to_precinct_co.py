import geopandas as gpd
import pandas as pd
import maup
import json
import numpy as np

from shapely.validation import make_valid
from shapely.geometry.base import geom_factory
from shapely.geos import lgeos
import warnings; warnings.filterwarnings('ignore', 'GeoSeries.isna', UserWarning)

# Steps:

# 1) assign blocks to precincts (in order to add demographic data)
# 2) assign precincts to a given district (for figuring out the population distribution criteria for MGGG)
# 3) precinct geopandas now has districtID and demographic data
# 4) turn the geopandas dataframe into a geojson for gerrychain (MGGG) to turn into a graph

precincts_co=gpd.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/co_data/precinct/co_precinct_and_election_20_retouched")
precincts_co.to_crs(inplace=True, crs="EPSG:4326")
#display(precincts_co)

block_co=gpd.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/co_data/precinct/co_cvap_2020_block_shp")
block_co.to_crs(inplace=True, crs="EPSG:4326")
#display(block_co)

assignment_co=maup.assign(block_co, precincts_co) # this returns a Pandas Series that assigns blocks to precincts


# making the geometries valid

precincts_co['geometry']=precincts_co['geometry'].buffer(0)

new_geom_series=[]
for geom in precincts_co['geometry']:
    
    if geom.is_valid:
        new_geom_series.append(geom)
    else:
        new_geom_series.append(geom_factory(lgeos.GEOSMakeValid(geom._geom)))

precincts_co['geometry'] = new_geom_series


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

final_precincts_co["democraticPres"]=final_precincts_co["democraticPres"].fillna(0) # replace naans with 0's just in case
final_precincts_co["republicanPres"]=final_precincts_co["republicanPres"].fillna(0)

final_precincts_co["totalSen"]=final_precincts_co["democraticSen"]+final_precincts_co["republicanSen"]
final_precincts_co["democraticSen"] = final_precincts_co["democraticSen"] / final_precincts_co["totalSen"]
final_precincts_co["republicanSen"] = final_precincts_co["republicanSen"] / final_precincts_co["totalSen"]

final_precincts_co["democraticSen"]=final_precincts_co["democraticSen"].fillna(0) # replace naans with 0's just in case
final_precincts_co["republicanSen"]=final_precincts_co["republicanSen"].fillna(0)

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

district_co=gpd.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/co_data/district/CO_House_Of_Rep_Districts_Prelim_PROPOSED_shp")

final_precincts_co.to_crs(district_co.crs, inplace=True)
assignment_prec_to_district_co = maup.assign(final_precincts_co, district_co)
final_precincts_co["districtId"] = assignment_prec_to_district_co

# and then final_precincts_co would be the DataFrame being turned into a graph and getting inserted into MGGG


