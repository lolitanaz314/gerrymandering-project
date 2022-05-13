import json as json
# import mapshaper as map
#import geopandas as gpd
import sys
import os
from decimal import *
import math
from shapely.geometry import Polygon, mapping, shape
from shapely.ops import unary_union

import pandas as pd
from shapely import wkt
import geopandas as gpd
import json

# steps: 
# read in giant CSV (every district Plan with every district)
# obtain separate dataframe for every district Plan
# turn dataframe into JSON and dump into geometry directory
# get percentages of every category and measures for every district Plan
# turn that into a JSON and dump into percents directory


df = pd.read_csv('/Users/cherrypi/Desktop/gerrymandering-project/data/post-processing/postseawulf_graph_path/CoSW4_districts.csv')
df['geometry'] = df['geometry'].apply(wkt.loads)
gdf = gpd.GeoDataFrame(df, crs='epsg:4326')

districtPlanIdSet=set(gdf['districtPlanId'])

districtPlanDfs=[] # list of districtPlanDataframes

for planId in districtPlanIdSet:
    dpDF = gdf.loc[gdf['districtPlanId'] == planId]
    #display(dpDF.head())
    districtPlanDfs.append(dpDF)

categories=['white' , 'af_amer', 'asian', 'hispanic', 'native_hawaiian', 'two_or_more', 'democraticPres', 'republicanPres','democraticSen', 'republicanSen']

# measures: Measures such as number of majority-minority districts,
# efficiency-gap, competitive districts, projected political fairness, and compactness

# for one district plan dataframe

for districtPlanDF in districtPlanDfs:

    districtPlan = {'districtPlanID': districtPlanDF['districtPlanId'].iloc[0], 'Plan_Measures':{}, 'Percents':{}, 'Seat_Vote_Input': {}}

    plan_measures={}
    plan_measures['polsby_popper']=0
    plan_measures['efficiency_gap']=0
    plan_measures['num_majority_minority_districts']=0
    plan_measures['vote_split_democrats_pres']=0
    plan_measures['vote_split_republicans_pres'] = 0
    plan_measures['vote_split_republicans_sen'] = 0
    plan_measures['vote_split_republicans_sen'] = 0

    percents={}
    percents['white']=[] # list of percentages 
    percents['af_amer']=[]
    percents['asian']=[]
    percents['hispanic']=[]
    percents['native_hawaiian']=[]
    percents['two_or_more']=[]
    percents['democraticPres']=[]
    percents['republicanPres']=[]
    percents['democraticSen']=[]
    percents['republicanSen']=[]
    
    seat_vote_input={}
    seat_vote_input['democraticPres'] = []
    seat_vote_input['republicanPres'] = []
    seat_vote_input['democraticSen'] = []
    seat_vote_input['republicanSen'] = []
    
    # iterate through all districts in the district Plan and collect the percentages of every category
    for i in range(len(districtPlanDF)):  
        white_perc =float(districtPlanDF['white'].iloc[i] / districtPlanDF['total_pop'].iloc[i])
        af_amer_perc=float(districtPlanDF['af_amer'].iloc[i] / districtPlanDF['total_pop'].iloc[i])
        asian_perc=float(districtPlanDF['asian'].iloc[i] / districtPlanDF['total_pop'].iloc[i])
        hispanic_perc=float(districtPlanDF['hispanic'].iloc[i] / districtPlanDF['total_pop'].iloc[i])
        native_hawaiian_perc=float(districtPlanDF['native_hawaiian'].iloc[i] / districtPlanDF['total_pop'].iloc[i])
        two_or_more_perc=float(districtPlanDF['two_or_more'].iloc[i] / districtPlanDF['total_pop'].iloc[i])

        totalPres= districtPlanDF["democraticPres"].iloc[i]+districtPlanDF["republicanPres"].iloc[i]
        totalSen =  districtPlanDF["democraticSen"].iloc[i]+districtPlanDF["republicanSen"].iloc[i]

        democraticPres = float(districtPlanDF['democraticPres'].iloc[i] / totalPres) 
        republicanPres = float(districtPlanDF['republicanPres'].iloc[i] / totalPres) 
        democraticSen = float(districtPlanDF['democraticSen'].iloc[i] / totalSen) 
        republicanSen = float(districtPlanDF['republicanSen'].iloc[i] / totalSen) 

        percents['white'].append(white_perc)
        percents['af_amer'].append(af_amer_perc)
        percents['asian'].append(asian_perc)
        percents['hispanic'].append(hispanic_perc)
        percents['native_hawaiian'].append(native_hawaiian_perc)
        percents['two_or_more'].append(two_or_more_perc)
        percents['democraticPres'].append(democraticPres)
        percents['republicanPres'].append(republicanPres)
        percents['democraticSen'].append(democraticSen)
        percents['republicanSen'].append(republicanSen)
        
        seat_vote_input['democraticPres'].append(int(districtPlanDF['democraticPres'].iloc[i]))
        seat_vote_input['republicanPres'].append(int(districtPlanDF['republicanPres'].iloc[i]))
        seat_vote_input['democraticSen'].append(int(districtPlanDF['democraticSen'].iloc[i]))
        seat_vote_input['republicanSen'].append(int(districtPlanDF['republicanSen'].iloc[i]))

    for k, v in percents.items():
        percents[k] = sorted(v)

    districtPlan['Plan_Measures'] = plan_measures
    districtPlan['Percents'] = percents
    districtPlan['Seat_Vote_Input'] = seat_vote_input
    districtPlanID = districtPlanDF['districtPlanId'].iloc[0]
    print("district Plan ", districtPlanID)
    print(districtPlan)
    
    print("\n")
    path = '/Users/cherrypi/Desktop/gerrymandering-project/data/post-processing/processed_districtplan_path/co_processed_DPs_percents/district_plan_percent_and_measures_' + str(districtPlanID) + '.json'
    with open(path, 'w') as f:
        json.dump(districtPlan, f)


# Dumping district plans WITH GEOMETRY!!!!!!! THIS IS WITH!!!! GEOMETRY!!!!
for i, _ in enumerate(districtPlanDfs):
    districtplan = districtPlanDfs[i]
    #print(districtplan['districtPlanId'].iloc[0])
    districtPlanID = districtplan['districtPlanId'].iloc[0]
    
    path = '/Users/cherrypi/Desktop/gerrymandering-project/data/post-processing/processed_districtplan_path/districtPlan_w_geometry_' + str(districtPlanID) + ".json"
    with open(path, 'w') as f:
        f.write(districtPlanDf.to_json())