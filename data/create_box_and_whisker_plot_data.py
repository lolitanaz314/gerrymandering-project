import json as json
import sys
import os
from decimal import *
import numpy as np

# this would be happening while running MGGG 

def reject_outliers(data): # this is going to come in the form of a list of numbers
    d = np.abs(data - np.median(data))
    mdev = np.median(d)
    s = d/mdev if mdev else 0
    return data [s<m]
    
def getPlotPoints(basis): # for ONE district
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

PresD=     [[],[],[],[],[],[],[],[],[],[],[],[],[],[]] # nested arr, by district 
PresR=     [[],[],[],[],[],[],[],[],[],[],[],[],[],[]] # nested arr, by district 
Black=    [[],[],[],[],[],[],[],[],[],[],[],[],[],[]] # nested arr, by district 
White=     [[],[],[],[],[],[],[],[],[],[],[],[],[],[]] # nested arr, by district 
Asian=     [[],[],[],[],[],[],[],[],[],[],[],[],[],[]] # nested arr, by district 
Hisp=      [[],[],[],[],[],[],[],[],[],[],[],[],[],[]] # nested arr, by district 
Polsby=    [[],[],[],[],[],[],[],[],[],[],[],[],[],[]] # nested arr, by district 

'''
CODE TO POPULATE THE NESTED LISTS WILL GO HERE ONCE I KNOW WHAT THE RANDOM DISTRICT GEOPANDAS WILL LOOK LIKE, HANG TIGHT
'''

boxWhisk = {}
boxWhisk['PresD'] = PresD
boxWhisk['PresR'] = PresR
boxWhisk['AfAmer'] = Black
boxWhisk['White'] = White
boxWhisk['Asian'] = Asian
boxWhisk['His'] = Hisp
boxWhisk['Polsby'] = Polsby

# THIS ENTIRE FILE WOULD OUTPUT THE BOX AND WHISKER DATA
# print(boxWhisk)
file_name = "./boxWhisk2.json"
file1 = open(file_name, "w")
json.dump(boxWhisk, file1)