import numpy as np
import geopandas
import pandas as pd
import shapely

class Measures:
    # Make everything here static because it's going to be called in compute_measures.py
    # Inputs for every single method - Pandas dataframe 

    @staticmethod 
    def population_equality(districts) -> float:
        return 1 - (districts['population'].max() - districts['population'].min()) / districts['population'].sum()

    @staticmethod  # polsby popper is computed in seawulf using Gerrychain but impleneted here just in case just in case Gerrychian messes it up
    def geometric_compactness(districts) -> float:
        pp = 0
        for geometry in districts['geometry'].values:
            pp += 4 * np.pi * geometry.area / (geometry.length ** 2)
        pp /= len(districts)
        return pp

    # Basing this computation off the Wikipedia definition: "majority-minority area
    # or minority-majority area is a term describing a U.S. state or jurisdiction whose population is composed of less than 50% non-Hispanic whites."
    @staticmethod
    def majority_minority(districts) -> float: # I think this is how it's computed???? (Re-CHECK THIS,)
        mm = 0   #
        for index, row in districts.iterrows():
            if row['black'] > (row['population'] / 2) or (row['asian'] > row['population'] / 2) or (row['hispanic'] > row['population'] / 2):
                mm += 1
        return mm

    @staticmethod
    def split_county():

        # NOT YET
        pass

    @staticmethod
    def dev_population(districts, enacted):
        districts = districts.reset_index() # renumber districts
        enacted = enacted.reset_index()
        return 1 - sum(abs(districts['population'] - enacted['population'])) / sum(districts['population'])

    @staticmethod
    def dev_white(districts, enacted):  # RETURN VALUE: A PERCENT!!!!!!! PLS MAKE SURE THIS IS RIGHT!!!! CRHIST's SAKE!!!!!(future note)
        districts = districts.reset_index() # do the same thing for everything else
        enacted = enacted.reset_index()
        return 1 - sum(abs(districts['white'] - enacted['white'])) / sum(districts['white']) 

    @staticmethod
    def dev_black(districts, enacted):
        districts = districts.reset_index()
        enacted = enacted.reset_index()
        return 1 - sum(abs(districts['black'] - enacted['black'])) / sum(districts['black'])

    @staticmethod
    def dev_asian(districts, enacted):
        districts = districts.reset_index()
        enacted = enacted.reset_index()
        return 1 - sum(abs(districts['asian'] - enacted['asian'])) / sum(districts['asian'])

    @staticmethod
    def dev_hispanic(districts, enacted):
        districts = districts.reset_index()
        enacted = enacted.reset_index()
        return 1 - sum(abs(districts['hispanic'] - enacted['hispanic'])) / sum(districts['hispanic'])
    
    @staticmethod
    def dev_demographics(districts, enacted):
        districts = districts.reset_index()
        enacted = enacted.reset_index()
        
        dev = (sum(abs(districts['asian'] - enacted['asian'])) / sum(districts['asian']) + sum(
            abs(districts['black'] - enacted['black'])) / sum(districts['black']) + sum(
            abs(districts['white'] - enacted['white'])) / sum(districts['white'])  + sum(
            abs(districts['hispanic'] - enacted['hispanic'])) / sum(districts['hispanic']))
            / 4

        return 1 - dev