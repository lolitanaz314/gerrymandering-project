# This is going to actually execute the measures.py file on a given District Plan
# Code on local Anaconda environment, STILL TESTING!!
import geopandas
import pandas as pd
import shapely
import matplotlib.pyplot as plt

if __name__ == '__main__':
	# CHeck the logic flow later, don't leave this unattended
	
    precincts = geopandas.read_file('[INSERT PRECINCT PATH HERE]')
    districts = pd.read_csv('[INSERT DISTRICT PATH HERE]')
    districtPlan = pd.read_csv("[INSERT DISTRICT PLAN PATH HERE]")
    
    districts = geopandas.GeoDataFrame(districts)
    districts['geometry'] = districts['geometry'].apply(shapely.wkt.loads)
    districts.crs = precincts.crs

    enacted_districts = pd.read_csv('[INSERT ENACTED DISTRICT PLAN HERE]')
    average_districts = pd.read_csv('[INSERT AVERAGE DISTRICT PLAN HERE]')

    # We are computing each of the measures for the district plan here
    # Sourcing the district that corresponds to the district plan

    districtPlan['population_equality'] = districtPlan.apply(lambda x: Measures.population_equality(districts[districts['districtPlanID'] == x['districtPlanID']]), axis = 1) # axis = 1 means this applies to columns, NOT rows
    districtPlan['geometric_compactness'] = districtPlan.apply(lambda x: Measures.geometric_compactness(districts[districts['districtPlanID'] == x['districtPlanID']]), axis = 1)
    districtPlan['majority_minority'] = districtPlan.apply(lambda x: Measures.majority_minority(districts[districts['districtPlanID'] == x['districtPlanID']]), axis = 1)
    districtPlan['dev_from_enacted_population'] = districtPlan.apply(lambda x: Measures.dev_population(districts[districts['districtPlanID'] == x['districtPlanID']], enacted_districts), axis = 1)
    districtPlan['dev_from_enacted_white'] = districtPlan.apply(lambda x: Measures.dev_white(districts[districts['districtPlanID'] == x['districtPlanID']], enacted_districts), axis = 1)
    districtPlan['dev_from_enacted_black'] = districtPlan.apply(lambda x: Measures.dev_black(districts[districts['districtPlanID'] == x['districtPlanID']], enacted_districts), axis = 1)
    districtPlan['dev_from_enacted_asian'] = districtPlan.apply(lambda x: Measures.dev_asian(districts[districts['districtPlanID'] == x['districtPlanID']], enacted_districts), axis = 1)
    districtPlan['dev_from_enacted_demographics'] = districtPlan.apply(lambda x: Measures.dev_demographics(districts[districts['districtPlanID'] == x['districtPlanID']], average_districts), axis = 1)
    districtPlan['dev_from_average_population'] = districtPlan.apply(lambda x: Measures.dev_population(districts[districts['districtPlanID'] == x['districtPlanID']], enacted_districts), axis = 1)
    districtPlan['dev_from_average_white'] = districtPlan.apply(lambda x: Measures.dev_white(districts[districts['districtPlanID'] == x['districtPlanID']], average_districts), axis = 1)
    districtPlan['dev_from_average_black'] = districtPlan.apply(lambda x: Measures.dev_black(districts[districts['districtPlanID'] == x['districtPlanID']], average_districts), axis = 1)
    districtPlan['dev_from_average_asian'] = districtPlan.apply(lambda x: Measures.dev_asian(districts[districts['districtPlanID'] == x['districtPlanID']], average_districts), axis = 1)
    districtPlan['dev_from_average_demographics'] = districtPlan.apply(lambda x: Measures.dev_demographics(districts[districts['districtPlanID'] == x['districtPlanID']], average_districts), axis = 1)
    
    districtPlan.to_csv("[INSERT DISTRICT PLAN PATH HERE]")  # DUMPS FILE INTO THE DIRECTORY