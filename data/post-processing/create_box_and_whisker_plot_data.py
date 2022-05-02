import json as json
import sys
import os
from decimal import *
import numpy as np

def reject_outliers(data): # this is going to come in the form of a list of numbers
    d = np.abs(data - np.median(data))
    mdev = np.median(d)
    s = d/mdev if mdev else 0
    return data [s<m]
    
def getPlotPoints(basis): # FOr ONE category (white, af american, republican , etc)
    for dist in basis:
        # print(dist)
        arr = np.array(dist)
        arr = reject_outliers(arr)
        stats = list(arr)
        med = np.percentile(stats, 50)
        third = np.percentile(stats, 75)
        first = np.percentile(stats, 25)
        mini = min(stats)
        maxi = max(stats)
        stats.clear()
        stats.append(med)
        stats.append(third)
        stats.append(first)
        stats.append(mini)
        stats.append(maxi)
    return stats # returns a length 5 list

# this is going to iterate through the JSON 

# need some way of getting all the 10,000 district plans and 
def populateTheDistrictPlanStats(numDistrictsInThePlan, processedDistrictPlanJSON):
    democratPres=[ [] * 68] # this is going to be a nested arr, by district 
    republicanPres= [[] * 68] 
    democraticSen = [ [] * 68]
    republicanSen = [ [] * 68]

    af_amer=[ [] * 68] 
    white=[ [] * 68] 
    asian=[ [] * 68] 
    hispanic=[ [] * 68] 
    two_or_more=[ [] * 68]

    # Loading all the JSONS
    # need to iterate through all the district plan JSONS

    for item in os.listdir(""): # for each processed plan (AFTER converting from graph to GeoJSON)
        plan_file = open(os.path.join(processed_path, item), "r")
        plan_data = json.load(plan_file)
        for i in range(len(plan_data['PresD'])): # for each district in this plan 
            democratPres[i].append(float(plan_data['democratPres'][i])) # add the percent to the PresD arr at its index i.e. district
            republicanPres[i].append(float(plan_data['republicanPres'][i])) 
            democraticSen[i].append(float(plan_data['democraticSen'][i])) 
            republicanSen[i].append(float(plan_data['republicanSen'][i]))

            af_amer[i].append(float(plan_data['af_amer'][i])) # add the percent to the PresD arr at its index i.e. district
            white[i].append(float(plan_data['white'][i]))
            asian[i].append(float(plan_data['asian'][i])) 
            hispanic[i].append(float(plan_data['hispanic'][i]))
            two_or_more[i].append(float(plan_data['two_or_more'][i]))

    # Call getPlotPoints() for all the the districts' categories

    return democratPres, republicanPres, democraticSen, republicanSen, af_amer, white, asian, hispanic, two_or_more

democratPres, republicanPres, democraticSen, republicanSen, af_amer, white, asian, hispanic, two_or_more  = populateTheDistrictPlanStats(68, "path_to_district_plan_json")

boxWhisk = {}
boxWhisk['democratPres'] = democratPres
boxWhisk['republicanPres'] = republicanPres
boxWhisk['democraticSen'] = democraticSen
boxWhisk['republicanSen'] = republicanSen
boxWhisk['af_amer'] = af_amer
boxWhisk['white'] = white
boxWhisk['asian'] = asian
boxWhisk['hispanic'] = hispanic
boxWhisk['two_or_more'] = two_or_more


# THIS ENTIRE FILE WOULD OUTPUT THE BOX AND WHISKER DATA
file_name = "./boxWhisk.json"
file1 = open(file_name, "w")
json.dump(boxWhisk, file1)