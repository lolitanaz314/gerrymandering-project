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

# DO NOT CELEBRATE YET!!!!!!

# this would be for all the district Plans and district data 

df = pd.read_csv('/Users/cherrypi/Desktop/gerrymandering-project/data/post-processing/postseawulf_CSV_path/CoSW9_districts.csv')
df['geometry'] = df['geometry'].apply(wkt.loads)
gdf_co = gpd.GeoDataFrame(df, crs='epsg:4326')

df = pd.read_csv('/Users/cherrypi/Desktop/gerrymandering-project/data/post-processing/postseawulf_CSV_path/TnSW9_districts.csv')
df['geometry'] = df['geometry'].apply(wkt.loads)
gdf_tn = gpd.GeoDataFrame(df, crs='epsg:4326')

df = pd.read_csv('/Users/cherrypi/Desktop/gerrymandering-project/data/post-processing/postseawulf_CSV_path/ScSW9_districts.csv')
df['geometry'] = df['geometry'].apply(wkt.loads)
gdf_sc = gpd.GeoDataFrame(df, crs='epsg:4326')

def createDistrictPlanDfList(districtPlanDf):
    districtPlanDfs=[] # list of districtPlanDataframes
    districtPlanIdSet= list(set(districtPlanDf['districtPlanId']))
    for planId in districtPlanIdSet:
        dpDF = districtPlanDf.loc[districtPlanDf['districtPlanId'] == planId]
        stateId = dpDF['districtId'].iloc[0][:2]
        stateIdList=[]
        
        #state ID got NAN'd in the process somehow so we're doing it here
        if stateId == "Co":
            stateIdList=[5 for i in range(len(dpDF))]
        elif stateId == "Tn":
            stateIdList=[41 for i in range(len(dpDF))]
        elif stateId == "Sc":
            stateIdList=[39 for i in range(len(dpDF))]
        
        dpDF["stateId"] = stateIdList
        
        districtPlanDfs.append(dpDF)
    return districtPlanDfs

districtPlanDfs_co = createDistrictPlanDfList(gdf_co)
districtPlanDfs_tn = createDistrictPlanDfList(gdf_tn)
districtPlanDfs_sc = createDistrictPlanDfList(gdf_sc)

def population_equality(districts) -> float: # the gini index, 1 means perfect equality
        return 1 - (districts['total_pop'].max() - districts['total_pop'].min()) / districts['total_pop'].sum()

def majority_minority(districts) -> float:  # count how many majority minority districts are in a given district Plan
        mm = 0   #
        for index, row in districts.iterrows():
            if row['af_amer'] > (row['total_pop'] / 2) or (row['asian'] > row['total_pop'] / 2) or (row['hispanic'] > row['total_pop'] / 2):
                mm += 1
        return mm

def is_majority_minority_district(districtRow): # 
    if districtRow['af_amer'] > (districtRow['total_pop'] / 2) or (districtRow['asian'] > districtRow['total_pop'] / 2) or (districtRow['hispanic'] > districtRow['total_pop'] / 2):
        return districtRow
    else:
        return False
    
def geometric_compactness(districts) -> float:
        pp_dp = 0
        pp_list=[]
        for geometry in districts['geometry'].values:
            
            pp = 4 * np.pi * geometry.area / (geometry.length ** 2)
            pp_dp+=pp
            pp_list.append(pp)
            
        pp_dp /= len(districts)
        return pp_list, pp_dp
    
def EfficiencyGap(a_votes, b_votes):
    # Initialize the variables as zero 
    EG = 0
    wasted_a = 0
    wasted_b = 0
    
    # for each district, calculate the wasted votes for each party 
    for i in range(len(a_votes)):
        if a_votes[i] > b_votes[i]: # if party a wins district i 
            wasted_b += b_votes[i]
            wasted_a += a_votes[i] - ((a_votes[i]+b_votes[i]) / 2)
        else:                       # if party b wins district i
            wasted_a += a_votes[i]
            wasted_b += b_votes[i] - ((a_votes[i]+b_votes[i]) / 2)
    
    # Calculate the Efficiency Gap
    EG = abs((wasted_a - wasted_b) / (sum(a_votes) + sum(b_votes)))
    
    return EG

def create_district_plan_JSON(districtPlanDFList): # this contains 10,000 district plans per STATE
    
    stateId=districtPlanDFList[0].iloc[0]['stateId']
    stateIdName=""  # for naming the files
    
    if stateId==5: stateIdName="co"
    elif stateId ==39: stateIdName="sc"
    elif stateId ==41: stateIdName="tn"
    
    HistogramJSON = {'stateId': stateIdName, 'frequency_maj_minority_dps': [], 'frequency_republicans_pres_dps': [], 
                     'frequency_democrat_pres_dps':[],
                    'frequency_republicans_sen_dps': [], 'frequency_democrat_sen_dps':[]}
    
    freq_maj_minority_DP_li=[]
    freq_republicans_pres_DP_li=[]
    freq_democrats_pres_DP_li=[]
    freq_republicans_sen_DP_li=[]
    freq_democrats_sen_DP_li=[]
    
    for i, districtPlan in enumerate(districtPlanDFList): 
        districtPlanJSON = {'Box_Whisker_Percents':{}, 'Seat_Vote_Input': {}, 'Majority_Minority_Districts':[]}
        freq_maj_minority_DP_li.append(majority_minority(districtPlan))
        
        for index, row in districtPlan.iterrows():
            '''
            if (is_majority_minority_district(row) == False):
                print(row['districtId'])
            else:
                districtPlanJSON['Majority_Minority_Districts'].append(row)'''
                
            freq_republicans_pres_DP_li.append(row['republicanPres'] / (row['democraticPres']+row['republicanPres']))
            freq_democrats_pres_DP_li.append(row['democraticPres'] / (row['democraticPres']+row['republicanPres']))
            freq_republicans_sen_DP_li.append(row['republicanSen'] / (row['democraticSen']+row['republicanSen']))
            freq_democrats_sen_DP_li.append(row['democraticSen'] / (row['democraticSen']+row['republicanSen']))

        # single measure values for entire district plan
        districtPlanJSON['districtPlanId']=str(districtPlan['districtPlanId'].iloc[0])
        districtPlanJSON['stateId']=str(districtPlan['stateId'].iloc[0])
        districtPlanJSON['proposedBy']= "MGGG-generated" 
        districtPlanJSON['total_pop']=int(districtPlan['total_pop'].sum())
        districtPlanJSON['white']=int(districtPlan['white'].sum())
        districtPlanJSON['af_amer']=int(districtPlan['af_amer'].sum())
        districtPlanJSON['asian']=int(districtPlan['asian'].sum())
        districtPlanJSON['hispanic']=int(districtPlan['hispanic'].sum())
        districtPlanJSON['native_hawaiian']=int(districtPlan['native_hawaiian'].sum())
        districtPlanJSON['two_or_more']=int(districtPlan['two_or_more'].sum())

        districtPlanJSON['democraticPres']=int(districtPlan['democraticPres'].sum())
        districtPlanJSON['democraticSen']=int(districtPlan['democraticSen'].sum())
        districtPlanJSON['republicanPres']=int(districtPlan['republicanPres'].sum())
        districtPlanJSON['republicanSen']=int(districtPlan['republicanSen'].sum())

        districtPlanJSON['polsby_popper']=float(geometric_compactness(districtPlan)[1])
        districtPlanJSON['efficiency_gap']= float(EfficiencyGap(list(districtPlan['democraticPres']), list(districtPlan['republicanPres'])))
        districtPlanJSON['num_majority_minority_districts']=int(majority_minority(districtPlan))

        districtPlanJSON['vote_split_democrats_pres']=float(districtPlan['democraticPres'].sum() / (float(districtPlan['democraticPres'].sum() + float(districtPlan['republicanPres'].sum() ))))
        districtPlanJSON['vote_split_republicans_pres']=float(districtPlan['republicanPres'].sum() / (float(districtPlan['democraticPres'].sum() + float(districtPlan['republicanPres'].sum() ))))
        districtPlanJSON['vote_split_democrats_sen']=float(districtPlan['democraticSen'].sum() / (float(districtPlan['democraticSen'].sum() + float(districtPlan['republicanSen'].sum() ))))
        districtPlanJSON['vote_split_republicans_sen']=float(districtPlan['republicanSen'].sum() / (float(districtPlan['democraticSen'].sum() + float(districtPlan['republicanSen'].sum() ))))

        # list data
        white_perc = sorted(list(districtPlan['white'] / districtPlan['total_pop'] ))
        af_amer_perc = sorted(list(districtPlan['af_amer'] / districtPlan['total_pop'] ))
        asian_perc = sorted(list(districtPlan['asian'] / districtPlan['total_pop'] ))
        native_hawaiian_perc = sorted(list(districtPlan['native_hawaiian'] / districtPlan['total_pop'] ))
        two_or_more_perc = sorted(list(districtPlan['two_or_more'] / districtPlan['total_pop'] ))
        hispanic_perc= sorted(list(districtPlan['hispanic'] / districtPlan['total_pop'] ))

        democraticPres_perc=sorted(list(districtPlan['democraticPres'] / (districtPlan['democraticPres']+districtPlan['republicanPres']) ) )
        republicanPres_perc=sorted(list(districtPlan['republicanPres'] / (districtPlan['democraticPres']+districtPlan['republicanPres']) ) )
        democraticSen_perc=sorted(list(districtPlan['democraticSen']  / (districtPlan['democraticSen']+districtPlan['republicanSen'])    ) )
        republicanSen_perc=sorted(list(districtPlan['republicanSen'] / (districtPlan['democraticSen']+districtPlan['republicanSen'])  ))

        BW={}
        BW['white'] = white_perc
        BW['af_amer'] = af_amer_perc
        BW['asian'] = asian_perc
        BW['hispanic'] = hispanic_perc
        BW['native_hawaiian'] = native_hawaiian_perc
        BW['two_or_more'] = two_or_more_perc
        BW['democraticPres'] = democraticPres_perc
        BW['republicanPres'] = republicanPres_perc
        BW['democraticSen'] = democraticSen_perc
        BW['republicanSen'] = republicanSen_perc
        
        seat_vote_input={}
        seat_vote_input['democraticPres']=list(districtPlan['democraticPres'])
        seat_vote_input['republicanPres']=list(districtPlan['republicanPres'])
        seat_vote_input['democraticSen']=list(districtPlan['democraticSen'])
        seat_vote_input['republicanSen']=list(districtPlan['republicanSen'])
        
        districtPlanJSON['Box_Whisker_Percents'] = BW
        districtPlanJSON['Seat_Vote_Input'] = seat_vote_input
        
        #print(districtPlanJSON)
       
        # dump district plan file
        path = '/Users/cherrypi/Desktop/gerrymandering-project/data/post-processing/processed_districtplan_path_seawulf/' + stateIdName + '_processed_plans/district_plan_measures_' + str(districtPlan['districtPlanId'].iloc[0]) + '.json'
        with open(path, 'w') as f:
            json.dump(districtPlanJSON, f)
            
    HistogramJSON['frequency_maj_minority_dps'] = freq_maj_minority_DP_li
    HistogramJSON['frequency_republicans_pres_dps'] = freq_republicans_pres_DP_li
    HistogramJSON['frequency_democrat_pres_dps'] = freq_democrats_pres_DP_li
    HistogramJSON['frequency_republicans_sen_dps'] = freq_republicans_sen_DP_li
    HistogramJSON['frequency_democrat_sen_dps'] = freq_democrats_sen_DP_li
    
    #print(HistogramJSON)
    # dump histogram file 
    path = '/Users/cherrypi/Desktop/gerrymandering-project/data/post-processing/processed_districtplan_path_seawulf/histogram_ensemble_data/' + stateIdName + '_histogram_data_seawulf_ensemble.json'
    with open(path, 'w') as f:
        json.dump(HistogramJSON, f)


if __name__ == "__main__":
    # creates 10,000 district Plan JSONS and 1 histogram JSON per state
    create_district_plan_JSON(districtPlanDfs_co)
    create_district_plan_JSON(districtPlanDfs_tn)
    create_district_plan_JSON(districtPlanDfs_sc)

