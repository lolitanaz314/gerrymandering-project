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

class Seawulf: # THIS is the meat & bones of the whole project

    # ***NEED TO RUN ON THE TN DATA***

    def __init__(self, precincts_path, state, random_initial_partition=True, node_repeats=2,
                 cut_edges_multiplier=2, population_deviation=0.1, output_path=''):
        
        self.precincts = geopandas.read_file(precincts_path)
        self.district_list = list(self.precincts['districtId'].unique())
        self.state = state
        self.graph = Graph.from_geodataframe(self.precincts)
        self.random_initial_partition = random_initial_partition
        self.seawulf_updaters = self.create_updaters()
        self.ideal_metric = self.precincts[self.target_metric].sum() / len(self.district_list)
        self.initial_partition = self.create_partition()
        self.seawulf_districtings = pd.DataFrame(columns=['districtingId', 'state'])
        self.seawulf_districts = pd.DataFrame(
            columns=['districtId', 'districtingId', 'population', 'white', 'black', 'asian', 'hispanic', 'democrat', 'republican',
                     'geometry'])
        self.output_path = output_path # for the graph

    def create_partition(self) -> Partition:
        initial_partition = Partition(graph=self.graph, assignment=self.assignment_criteria,
                                      updaters=self.seawulf_updaters)
        if self.random_initial_partition:
            random_assignment = tree.recursive_tree_part(self.graph, self.district_list, self.ideal_metric,
                                                         self.target_metric)
            initial_partition.assignment.update(random_assignment)
        return initial_partition

    # updaters in Gerrychain are used to have extra data in each geometric location
    def create_updaters(self) -> dict:
        seawulf_updaters = {}
        for column in self.precincts.columns:
            if column != 'geometry' and 'id' not in column.lower():
                seawulf_updaters[column] = updaters.Tally(column)
        return seawulf_updaters

    def process_iteration(self, partition, id) -> (pd.DataFrame, pd.DataFrame):
        precincts = []
        for node in partition.graph.nodes:
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
            'districtId').sum().reset_index()  
        districts_info['districtingId'] = id
        districts_geo = precincts[['districtId', 'geometry']].groupby('districtId')['geometry'].apply(
            unary_union).reset_index()
        districts = districts_info.merge(districts_geo, on='districtId')
        districting = pd.DataFrame([[id, self.state]], columns=['districtingId', 'state'])
        return districting, districts

    def run(self, num_districtings, iterations, max_time):

        for i in range(num_districtings):
            chain_start = time.time()
            chain = MarkovChain(
                proposal=self.proposal,
                constraints=self.constraints,
                accept=always_accept,
                initial_state=self.initial_partition,
                total_steps=iterations)
            iterations_begin = time.time()
            for idx, new_partition in enumerate(chain):
                iterations_end = time.time()
                if iterations_end - iterations_begin > max_time:
                    break
            chain_end = time.time()
            id = ''.join([self.state, 'SW', str(i)])

        # CALL THE BOX AND WHISKER.py FILE ON THE DISTRICT HERE!!!!!
