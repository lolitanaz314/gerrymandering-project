import json as json
# import mapshaper as map
#import geopandas as gpd
import sys
import os
from decimal import *
import math
from shapely.geometry import Polygon, mapping, shape
from shapely.ops import unary_union

geo_path = sys.argv[1] # all info precincts file in the form of graphs
geo_file = open(geo_path, "r")
geo_data = json.load(geo_file)

output_plans_path = sys.argv[2]

# make output directory 
directory = "processed"
processed_path = os.path.join(output_plans_path, directory)
if not os.path.isdir(processed_path):
    os.mkdir(processed_path)

    count = 0
    for item in os.listdir(output_plans_path):
        if os.path.isfile(os.path.join(output_plans_path, item)) and item.endswith('.json'):
            plan_file = open(os.path.join(output_plans_path, item), "r")
            plan_data = json.load(plan_file)
            count+=1
            for i in range(len(geo_data['features'])):
                geoPrecinct = geo_data['features'][i]['properties']['precinctId']
                for j in range(len(plan_data['nodes'])):
                    planPrecinct = plan_data['nodes'][j]['id']
                    if(geoPrecinct==planPrecinct):
                        planDistrict = plan_data['nodes'][j]['district']
                        planDistrict = list_dist.get(planDistrict)
                        geo_data['features'][i]['properties']['districtId'] = planDistrict

            file_name = processed_path+"/plan_reformatted_"+str(count)+".geojson"
            file1 = open(file_name, "w")
            json.dump(geo_data, file1)

