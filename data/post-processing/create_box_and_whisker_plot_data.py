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
def populateTheDistrictPlanStats(numDistrictsInThePlan, processedDistrictPlanJSON):
    PresD=[] # this is going to be a nested arr, by district 
    PresR= [] 
    Black=[] 
    White=[] 
    Asian=[] 
    Hisp=[] 

    # DID NOT FINISH YET!!!!

    # Call getPlotPoints() for all the the districts' categories

    return PresD, PresR, Black, White, Asian, Hisp, Polsby

PresD, PresR, Black, White, Asian, Hisp, Polsby = populateTheDistrictPlanStats()

boxWhisk = {}
boxWhisk['PresD'] = PresD
boxWhisk['PresR'] = PresR
boxWhisk['AfAmer'] = Black
boxWhisk['White'] = White
boxWhisk['Asian'] = Asian
boxWhisk['His'] = Hisp
boxWhisk['Polsby'] = Polsby

# THIS ENTIRE FILE WOULD OUTPUT THE BOX AND WHISKER DATA
file_name = "./boxWhisk.json"
file1 = open(file_name, "w")
json.dump(boxWhisk, file1)