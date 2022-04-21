# This is going to actually execute the measures.py file on a given District Plan
# Code on local Anaconda environment, STILL TESTING!!
import geopandas
import pandas as pd
import shapely
import matplotlib.pyplot as plt
import Measures 

if __name__ == '__main__':
	# CHeck the logic flow later, don't leave this unattended
	
    precincts = geopandas.read_file('[INSERT PRECINCT PATH HERE]')
    districts = pd.read_csv('[INSERT DISTRICT PATH HERE]')
    districtPlan = pd.read_csv("[INSERT DISTRICT PLAN PATH HERE]")

    enacted_districts = pd.read_csv('[INSERT ENACTED DISTRICT PLAN HERE]')
    average_districts = pd.read_csv('[INSERT AVERAGE DISTRICT PLAN HERE]')

    # We are computing each of the measures for the district plan here
    # Sourcing the district that corresponds to the district plan

    # INSERT the rest of the code here for calling all the Measures from Measures.py

    districtPlan.to_csv("[INSERT DISTRICT PLAN PATH HERE]")  # DUMPS FILE INTO THE DIRECTORY