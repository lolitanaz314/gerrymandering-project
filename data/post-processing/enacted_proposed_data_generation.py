import geopandas as gpd
import pandas as pd
import maup
import json
import numpy as np

from shapely import wkt
from shapely.validation import make_valid
from shapely.geometry.base import geom_factory
from shapely.geos import lgeos
from shapely.ops import unary_union
import warnings; warnings.filterwarnings('ignore', 'GeoSeries.isna', UserWarning)

# DO THE 4 THINGS ASAP FOR SHITS SAKE

# 1) box and whisker data - JSON
# 2) seat vote curve data - JSON
# 3) DistrictPlanData - JSON
# 4) DistrictData - JSON

'''
The summary will
include data for each of the districtings including identifier, 

Number of majority-minority districts
Equal population measure
Polsby-Popper value
Republican/Democratic split
'''

variables_co = ["CVAP_TOT20", "CVAP_ASN20", "CVAP_BLK20", "CVAP_NHP20", "CVAP_WHT20", "CVAP_HSP20", "CVAP_2OM20"]

renamed_precincts_co=precincts_co.rename(columns={"PRECINCT": "precinctId", 
                                                  'STATEFP': 'stateId',
                                                  "G20PREDBID": "democraticPres", 'G20PRERTRU': 'republicanPres', 
                                                  'G20USSDHIC': 'democraticSen', 'G20USSRGAR': 'republicanSen'})
print(renamed_precincts_co.columns)
# Drop columns that don't have to do with the President or Senate, or democratic/republican
final_precincts_co = renamed_precincts_co.drop(['VTDST', 'G20PRELJOR', 'G20PREGHAW', 'G20PRECBLA', 'G20PREUWES', 'G20PREOOTH', 'G20USSLDOA', 'G20USSODOY', 'G20USSOEVA', 'G20USSOWRI'], 1)

final_precincts_co['stateId']=final_precincts_co['stateId'].replace("08", "Co")

# all shapefiles
# STILL MISSING 1 for colorado, 2 for SC, 2 for Tennessee

# Colorado
district_co_2021_congressional_enacted = gpd.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/co_data/district/2021_CO_Final_ENACTED_Congressional_Plan_shp")

district_co_2021_congressional_proposed_1=gpd.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/co_data/district/2021_First_Staff_Congressional_Final_Proposed")
district_co_2020_congressional_proposed_2=gpd.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/co_data/district/2021_Second_Congressional_Staff_Plan_proposed")

# South Carolina
district_sc_2022_congressional_proposed = gpd.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/sc_data/district/sc_congressional_districts_approved_plan_2022_PROPOSED_shp")
district_sc_2020_congressional_proposed = gpd.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/sc_data/district/sc_2020_congress_proposed.json")

# Tennessee
district_tn_2022_congressional_enacted = gpd.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/sc_data/district/sc_congressional_districts_approved_plan_2022_PROPOSED_shp")
district_tn_2020_congressional_enacted = gpd.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/sc_data/district/sc_2020_congress_proposed.json")

# adding election data to the district data

final_precincts_co.to_crs(district_co_2021_congressional_enacted.crs, inplace=True)
assignment_prec_to_district_co = maup.assign(final_precincts_co, district_co_2021_congressional_enacted)
final_precincts_co["districtId"] = assignment_prec_to_district_co
final_precincts_co["geometry"] = final_precincts_co["geometry"].buffer(0)
display(final_precincts_co)

# renaming the district column names
d_2021_enacted=district_co_2021_congressional_enacted.drop(['LONGNAME', 'SHORTNAME', 'AIANNH', 'OTHERNH', 'TOTALNH', 'TARGET_DEV', 'COLOR', 'LEGCOMMDIF'], axis=1)
renamed_dist_co_2021_enacted = d_2021_enacted.rename(columns={
                                                  'DISTRICT': 'districtId',
                                                  "TOTAL": "total_pop", 
                                                  'ASIANNH': 'asian',
                                                  "BLACKNH": "af_amer", 
                                                  'HPINH': 'native_hawaiian', 
                                                  'WHITENH': 'white', 
                                                  'TOTALHISP': 'hispanic',
                                                  "MLTMNNH":"two_or_more"})


districts_info_election = final_precincts_co[
            ['democraticPres', 'republicanPres', 'democraticSen', 'republicanSen', 'districtId']].groupby(
            by='districtId').sum()  # summing the precincts's columns by districtId

districts_info_election['stateId'] = final_precincts_co['stateId']
districts_info_election["totalPres"]= districts_info_election["democraticPres"]+districts_info_election["republicanPres"]
districts_info_election["democraticPres_perc"] = districts_info_election["democraticPres"] / districts_info_election["totalPres"]
districts_info_election["republicanPres_perc"] = districts_info_election["republicanPres"] / districts_info_election["totalPres"]

districts_info_election["democraticPres_perc"]=districts_info_election["democraticPres_perc"].fillna(0) # replace naans with 0's just in case
districts_info_election["republicanPres_perc"]=districts_info_election["republicanPres_perc"].fillna(0)

districts_info_election["totalSen"] = districts_info_election["democraticSen"]+districts_info_election["republicanSen"]
districts_info_election["democraticSen_perc"] = districts_info_election["democraticSen"] / districts_info_election["totalSen"]
districts_info_election["republicanSen_perc"] = districts_info_election["republicanSen"] / districts_info_election["totalSen"]

districts_info_election["democraticSen_perc"]=districts_info_election["democraticSen_perc"].fillna(0) # replace naans with 0's just in case
districts_info_election["republicanSen_perc"]=districts_info_election["republicanSen_perc"].fillna(0)

districts_info_election.drop(['totalSen', 'totalPres'], axis=1, inplace=True)
#display(districts_info_election)

districts_co_2021 = renamed_dist_co_2021_enacted.merge(districts_info_election, on='districtId')

white_perc = sorted(list(districts['white'] / districts['total_pop'] ))
af_amer_perc = sorted(list(districts['af_amer'] / districts['total_pop'] ))
asian_perc = sorted(list(districts['asian'] / districts['total_pop'] ))
native_hawaiian_perc = sorted(list(districts['native_hawaiian'] / districts['total_pop'] ))
two_or_more_perc = sorted(list(districts['two_or_more'] / districts['total_pop'] ))
hispanic_perc= sorted(list(districts['hispanic'] / districts['total_pop'] ))

democraticPres_perc=sorted(list(districts['democraticPres_perc']))
republicanPres_perc=sorted(list(districts['republicanPres_perc']))
democraticSen_perc=sorted(list(districts['democraticSen_perc']))
republicanSen_perc=sorted(list(districts['republicanSen_perc']))

# get the box and whisker data 
boxWhisk = {}
boxWhisk['white'] = white_perc
boxWhisk['af_amer'] = af_amer_perc
boxWhisk['asian'] = asian_perc
boxWhisk['hispanic'] = hispanic_perc
boxWhisk['native_hawaiian'] = native_hawaiian_perc
boxWhisk['two_or_more'] = two_or_more_perc
boxWhisk['democraticPres'] = democraticPres_perc
boxWhisk['republicanPres'] = republicanPres_perc
boxWhisk['democraticSen'] = democraticSen_perc
boxWhisk['republicanSen'] = republicanSen_perc

district_plan_columns_list=['districtPlanId', 'stateId', 'proposedBy', "total_pop", 
"white", "af_amer", "asian", "hispanic", "native_hawaiian", "two_or_more", 
"democraticPres", "democraticSen",  "republicanPres", "republicanSen",
"polsby_popper", "efficiency_gap", "num_majority_minority_districts", 
"vote_split_democrats_pres", "vote_split_republicans_pres",
"vote_split_democrats_sen", "vote_split_republicans_sen", "geometry"]
districtPlan = pd.DataFrame(columns=district_plan_columns_list)       

def population_equality(districts) -> float: # the gini index, 1 means perfect equality
        return 1 - (districts['total_pop'].max() - districts['total_pop'].min()) / districts['total_pop'].sum()

def majority_minority(districts) -> float:
        mm = 0   #
        for index, row in districts.iterrows():
            if row['af_amer'] > (row['total_pop'] / 2) or (row['asian'] > row['total_pop'] / 2) or (row['hispanic'] > row['total_pop'] / 2):
                mm += 1
        return mm
    
def geometric_compactness(districts) -> float:
        pp = 0
        for geometry in districts['geometry'].values:
            pp += 4 * np.pi * geometry.area / (geometry.length ** 2)
        pp /= len(districts)
        return pp
    
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
    EG = (wasted_a - wasted_b) / (sum(a_votes) + sum(b_votes))
    
    return EG

def create_district_plan_row(district):
    districtPlan_geo = district[['districtId', 'geometry']].groupby('districtId')['geometry'].apply(
            unary_union).reset_index() # shapely unary union does a union over all the precinct geometries
        
    districtPlanRow={}
    districtPlanRow['districtPlanId']="Co_1" # change from hard coded
    districtPlanRow['stateId']='Co' # change from hard coded
    districtPlanRow['proposedBy']= "Legislature" # change from hard coded
    districtPlanRow['total_pop']=districts_co_2021['total_pop'].sum()
    districtPlanRow['white']=districts_co_2021['white'].sum()
    districtPlanRow['af_amer']=districts_co_2021['af_amer'].sum()
    districtPlanRow['asian']=districts_co_2021['asian'].sum()
    districtPlanRow['hispanic']=districts_co_2021['hispanic'].sum()
    districtPlanRow['native_hawaiian']=districts_co_2021['native_hawaiian'].sum()
    districtPlanRow['two_or_more']=districts_co_2021['two_or_more'].sum()
    
    districtPlanRow['democraticPres']=districts_co_2021['democraticPres'].sum()
    districtPlanRow['democraticSen']=districts_co_2021['democraticSen'].sum()
    districtPlanRow['republicanPres']=districts_co_2021['republicanPres'].sum()
    districtPlanRow['republicanSen']=districts_co_2021['republicanSen'].sum()
    
    districtPlanRow['polsby_popper']=geometric_compactness(district)
    districtPlanRow['efficiency_gap']= EfficiencyGap(district['democraticPres'], district['republicanPres'])
    districtPlanRow['num_majority_minority_districts']=majority_minority(district)
    
    districtPlanRow['vote_split_democrats_pres']=float(district['democraticPres'].sum() / (float(district['democraticPres'].sum() + float(district['republicanPres'].sum() ))))
    districtPlanRow['vote_split_republicans_pres']=float(district['republicanPres'].sum() / (float(district['democraticPres'].sum() + float(district['republicanPres'].sum() ))))
    districtPlanRow['vote_split_democrats_sen']=float(district['democraticSen'].sum() / (float(district['democraticSen'].sum() + float(district['republicanSen'].sum() ))))
    districtPlanRow['vote_split_republicans_sen']=float(district['republicanSen'].sum() / (float(district['democraticSen'].sum() + float(district['republicanSen'].sum() ))))
    
    districtPlanRow['geometry'] = districtPlan_geo
    
    return districtPlanRow

# Dumping Box and Whisker, Seat Vote, DistrictPlan and District JSONS into this directory:
# /Users/cherrypi/Desktop/gerrymandering-project/data/post-processing/processed_districtplan_path/enacted_approved_districtPlans_data







