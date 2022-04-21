import geopandas
import pandas as pd
from shapely.ops import unary_union
from gerrychain.accept import always_accept
import numpy as np
from gerrychain import (Partition, Graph, MarkovChain, updaters)
from gerrychain.proposals import recom
from functools import partial
from gerrychain import tree
import time
import yaml
import sys

class Seawulf: # this is the mainest class

    def __init__(self, precincts_path, state, random_initial_partition=True,
                 cut_edges_multiplier=2, output_path=''):
        
        self.precincts = geopandas.read_file(precincts_path) 
        self.district_list = list(self.precincts['districtId'])
        self.state = state
        self.graph = Graph.from_geodataframe(self.precincts) # this creates the graph
        self.random_initial_partition = random_initial_partition # A boolean
        self.seawulf_updaters = self.create_updaters()
        self.initial_partition = self.create_partition() 
        self.seawulf_districtplan = pd.DataFrame(columns=['districtPlanId', 'state'])
        self.seawulf_districts = pd.DataFrame(
            columns=['districtId', 'districtPlanId', 'population', 'white', 'black', 'asian', 'hispanic', 'democrat', 'republican',
                     'geometry'])
        self.output_path = output_path # for the graph

    def create_partition(self) -> Partition:
        initial_partition = Partition(graph=self.graph,  
                                      updaters=self.seawulf_updaters) # instantiate the initial state of our Markov chain

        if self.random_initial_partition:
            random_assignment = tree.recursive_tree_part(self.graph, self.district_list, 
                                                         self.target_metric)
            initial_partition.assignment.update(random_assignment)
        else:
            # put in the district plan you want to base the partition off of
        return initial_partition

    # updaters in Gerrychain are used to have extra data in each geometric location
    def create_updaters(self) -> dict:
        seawulf_updaters = {}
        for column in self.precincts.columns:
            if column != 'geometry' and 'id' not in column.lower():
                seawulf_updaters[column] = updaters.Tally(column) # From the Gerrychain docs: Tally: Aggregates a node attribute (e.g. population) over each part of the partition.
        return seawulf_updaters # returns a dictionary of all the updaters we would need for the Seawulf

    def one_iteration(self, partition, id) -> (pd.DataFrame, pd.DataFrame): # this is executed for every single district plan 
        precincts = []
        for node in partition.graph.nodes: #  # partition is a graph object, the nodes contain all the data 
            precinctId = partition.graph.nodes[node]['precinctId']
            districtId = "".join([id, str(partition.assignment[node])])
            population = partition.graph.nodes[node]['population']
            white = partition.graph.nodes[node]['white']
            black = partition.graph.nodes[node]['black']
            asian = partition.graph.nodes[node]['asian']
            hispanic = partition.graph.nodes[node]['hispanic']
            democrat = partition.graph.nodes[node]['democrat']
            republican = partition.graph.nodes[node]['republican']
            geometry = partition.graph.nodes[node]['geometry']
            precincts.append([precinctId, districtId, population, white, black, asian, hispanic, democrat, republican, geometry])
        
        precincts = pd.DataFrame(precincts,
                                 columns=['precinctId', 'districtId', 'population', 'white', 'black', 'asian','hispanic',
                                          'democrat',
                                          'republican', 'geometry'])

        districts_info = precincts[
            ['districtId', 'population', 'white', 'black', 'asian', 'hispanic', 'democrat', 'republican']].groupby(
            'districtId').sum()
        
        districts_info['districtPlanId'] = id # creates a unique ID
        
        districts_geo = precincts[['districtId', 'geometry']].groupby('districtId')['geometry'].apply(
            unary_union).reset_index() 

        districts = districts_info.merge(districts_geo, on='districtId') # merge the table and the series together 
        districtPlan = pd.DataFrame([[id, self.state]], columns=['districtPlanId', 'state'])
        
        return districtPlan, districts

    def run(self, num_districtPlans, iterations): # iterations = Number of steps to run in the Markov Chain.
        for i in range(num_districtPlans):
            chain = MarkovChain(
                initial_state=self.initial_partition, 
                total_steps=iterations)
            
            id = ''.join([self.state, 'SeaWulf_districtPlan', str(i)])

            new_districtPlan, new_districts = self.one_iteration(chain, id) # One iteration of Markov chain for ONE district Plan!!!!
            self.seawulf_districtPlan = self.seawulf_districtPlan.append(new_districting, ignore_index=True)
            self.seawulf_districts = self.seawulf_districts.append(new_districts, ignore_index=True)
            
        self.seawulf_districtPlan.to_csv("".join([self.output_path, id, '_districtPlan.csv']), index=False)
        self.seawulf_districts.to_csv("".join([self.output_path, id, '_districts.csv']), index=False)
            
if __name__ == '__main__':
    precincts_path = # insert name of precinct path
    state = # insert the name of the state
    num_districtPlans = config['num_districtings']
    iterations = # insert number iterations for the Markov Chain (algorithm metric)
    random_initial_partition = # insert graph object (in the form of a geoJSON)
    output_path = # put in the name for an output_path

    seawulf = Seawulf(precincts_path=precincts_path, output_path=output_path, 
                      random_initial_partition=random_initial_partition, state=state
                      )
    seawulf.run(num_districtPlans=num_districtPlans, iterations=iterations)
                                                                                                             162,5         Bot

