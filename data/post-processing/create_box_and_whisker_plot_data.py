import json as json
import sys
import os
from decimal import *
import numpy as np

# this would be happening while running MGGG 
def reject_outliers(data, m=2.):
    data=np.array(data)
    d = np.abs(data - np.median(data))
    mdev = np.median(d)
    s = d / (mdev if mdev else 1.)
    return data[s <= m]
    
def getBoxAndWhiskerPoints(districtNestedList): # array of all districts for 1 category
    newDistrictNestedList=[]
    for district in districtNestedList:
        # print(dist)
        arr = np.array(district)
        arr = reject_outliers(arr)
        stats = list(arr)
        
        mini = min(stats)
        first = np.percentile(stats, 25)
        med = np.percentile(stats, 50)
        third = np.percentile(stats, 75)
        maxi = max(stats)
        
        stats.clear()
        stats.append(mini)
        stats.append(first)
        stats.append(med)
        stats.append(third)
        stats.append(maxi)
        newDistrictNestedList.append(stats)
    return newDistrictNestedList

processed_path_co = '/Users/cherrypi/Desktop/gerrymandering-project/data/post-processing/processed_districtplan_path_seawulf/co_processed_plans/'

processed_path_tn = '/Users/cherrypi/Desktop/gerrymandering-project/data/post-processing/processed_districtplan_path_seawulf/tn_processed_plans/'

processed_path_sc = '/Users/cherrypi/Desktop/gerrymandering-project/data/post-processing/processed_districtplan_path_seawulf/sc_processed_plans/'

def generate_box_and_whisker_data_for_state(processedStateDistrictPlansFilePath):
    # count how many districts are in 1 district Plan, that's the number of districts for all district Plans FOR THIS STATE
    numDistricts=0
    stateId=0  # for the box and whisker path file
    
    for item in os.listdir(processedStateDistrictPlansFilePath):
        if (item.endswith('.json')):
            #print(item)
            plan_file = open(os.path.join(processedStateDistrictPlansFilePath, item), "r")
            plan_data = json.load(plan_file)
            #print(plan_data['Box_Whisker_Percents'].keys())
            numDistricts=len(plan_data['Box_Whisker_Percents']['white'])
            stateId=plan_data['stateId']
            
            break
    
    if stateId=='5':
        stateId="Co"
    elif stateId=='39':
        stateId="Sc"
    elif stateId=='41':
        stateId="Tn"
        
    # [10,000 district plan points for district 1], [10,000 district plan points for district 2], 
    # [10,000 points for district 3], etc
    white_districts= [[] for _ in range(numDistricts)] # nested arr, by district 
    af_amer_districts= [[] for _ in range(numDistricts)] # nested arr, by district 
    asian_districts= [[] for _ in range(numDistricts)] # nested arr, by district 
    hispanic_districts= [[] for _ in range(numDistricts)] # nested arr, by district 
    native_hawaiian_districts= [[] for _ in range(numDistricts)] # nested arr, by district 
    two_or_more_districts= [[] for _ in range(numDistricts)] # nested arr, by district 
    democraticPres_districts= [[] for _ in range(numDistricts)] # nested arr, by district 
    republicanPres_districts= [[] for _ in range(numDistricts)] # nested arr, by district 
    democraticSen_districts= [[] for _ in range(numDistricts)] # nested arr, by district 
    republicanSen_districts= [[] for _ in range(numDistricts)] # nested arr, by district 
    
    for item in os.listdir(processedStateDistrictPlansFilePath): # iterating through every single district plan
        if (item.endswith('.json')):
            #print(item)
            plan_file = open(os.path.join(processedStateDistrictPlansFilePath, item), "r")
            plan_data = json.load(plan_file)

            for i in range(numDistricts): # iterating through every number in each district
                white_districts[i].append(float(plan_data["Box_Whisker_Percents"]['white'][i]))
                af_amer_districts[i].append(float(plan_data["Box_Whisker_Percents"]['af_amer'][i]))
                asian_districts[i].append(float(plan_data["Box_Whisker_Percents"]['asian'][i]))
                hispanic_districts[i].append(float(plan_data["Box_Whisker_Percents"]['hispanic'][i]))
                native_hawaiian_districts[i].append(float(plan_data["Box_Whisker_Percents"]['native_hawaiian'][i]))
                two_or_more_districts[i].append(float(plan_data["Box_Whisker_Percents"]['two_or_more'][i]))
                democraticPres_districts[i].append(float(plan_data["Box_Whisker_Percents"]['democraticPres'][i]))
                republicanPres_districts[i].append(float(plan_data["Box_Whisker_Percents"]['republicanPres'][i]))
                democraticSen_districts[i].append(float(plan_data["Box_Whisker_Percents"]['democraticSen'][i]))
                republicanSen_districts[i].append(float(plan_data["Box_Whisker_Percents"]['republicanSen'][i]))

    white_districts_bw=getBoxAndWhiskerPoints(white_districts)  # returns an array of 5 values (min, q1, med, q3, max)
    af_amer_districts_bw=getBoxAndWhiskerPoints(af_amer_districts)
    asian_districts_bw=getBoxAndWhiskerPoints(asian_districts)
    hispanic_districts_bw=getBoxAndWhiskerPoints(hispanic_districts)
    native_hawaiian_districts_bw=getBoxAndWhiskerPoints(native_hawaiian_districts)
    two_or_more_districts_bw=getBoxAndWhiskerPoints(two_or_more_districts)
    democraticPres_districts_bw=getBoxAndWhiskerPoints(democraticPres_districts)
    republicanPres_districts_bw=getBoxAndWhiskerPoints(republicanPres_districts)
    democraticSen_districts_bw=getBoxAndWhiskerPoints(democraticSen_districts)
    republicanSen_districts_bw=getBoxAndWhiskerPoints(republicanSen_districts)
    
    boxWhisk = {}
    boxWhisk['white'] = white_districts_bw
    boxWhisk['af_amer'] = af_amer_districts_bw
    boxWhisk['asian'] = asian_districts_bw
    boxWhisk['hispanic'] = hispanic_districts_bw
    boxWhisk['native_hawaiian'] = native_hawaiian_districts_bw
    boxWhisk['two_or_more'] = two_or_more_districts_bw
    boxWhisk['democraticPres'] = democraticPres_districts_bw
    boxWhisk['republicanPres'] = republicanPres_districts_bw
    boxWhisk['democraticSen'] = democraticSen_districts_bw
    boxWhisk['republicanSen'] = republicanSen_districts_bw

    file_name = '/Users/cherrypi/Desktop/gerrymandering-project/data/post-processing/box_and_whisker_seawulf/box_whisk_' + str(stateId) + '.json' 
    file1 = open(file_name, "w")
    json.dump(boxWhisk, file1)

if __name__ == "__main__":
    
    generate_box_and_whisker_data_for_state(processed_path_co)
    generate_box_and_whisker_data_for_state(processed_path_tn)
    generate_box_and_whisker_data_for_state(processed_path_sc)
