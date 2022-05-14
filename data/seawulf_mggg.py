from shapely.ops import unary_union
from shapely import wkt
import pandas as pd
import geopandas as gpd

from gerrychain.accept import always_accept
import numpy as np
from gerrychain import (Partition, Graph, MarkovChain, updaters, constraints)
from gerrychain.proposals import recom
from functools import partial
from gerrychain import tree

class Seawulf:
    def __init__(self, precincts_df, state,
                 target_metric='total_pop',
                 assignment_criteria='districtId', random_initial_partition=True, epsilon=0.02, node_repeats=2,
                 cut_edges_multiplier=2, population_deviation=0.1, output_path=''):
        
        self.precincts = precincts_df # geopandas.read_file(precincts_path)  
        self.district_list = list(self.precincts['districtId'].unique())
        self.state = state
        self.districts = None
        self.graph = Graph.from_geodataframe(self.precincts, ignore_errors=True)
        self.random_initial_partition = random_initial_partition
        self.target_metric = target_metric
        self.assignment_criteria = assignment_criteria
        self.seawulf_updaters = self.create_updaters()
        
        #print("the updaters: ", self.seawulf_updaters)
        self.epsilon = epsilon
        self.ideal_metric = self.precincts[self.target_metric].sum() / len(self.district_list)
        self.initial_partition = self.create_partition()
        self.proposal = self.create_proposal(node_repeats)
        self.constraints = self.create_constraints(population_deviation)
        self.seawulf_districtPlans = pd.DataFrame(columns=['districtPlanId', 'state'])
        self.seawulf_districts = pd.DataFrame(
            columns=['districtId', 'districtPlanId', 'total_pop', 'white', 'af_amer', 'asian', 'hispanic', 'native_hawaiian', 'two_or_more',
                     'democraticPres', 'republicanPres', 'democraticSen', 'republicanSen', 
                     'geometry'])
        self.output_path = output_path

    def create_partition(self) -> Partition:
        initial_partition = Partition(graph=self.graph, assignment=self.assignment_criteria,
                                      updaters=self.seawulf_updaters)
        if self.random_initial_partition:
            random_assignment = tree.recursive_tree_part(self.graph, self.district_list, self.ideal_metric,
                                                         self.target_metric,
                                                         self.epsilon)
            initial_partition.assignment.update(random_assignment)
        return initial_partition

    def create_updaters(self) -> dict:
        seawulf_updaters = {}
        for column in self.precincts.columns:
            #print("column: ", column)
            if column != 'geometry' and 'precinctId' not in column.lower(): # don't put in the geometries or the ID's of anything in  the updaters
                seawulf_updaters[column] = updaters.Tally(column)
        return seawulf_updaters

    def create_proposal(self, node_repeats):
        return partial(recom, pop_col=self.target_metric, pop_target=self.ideal_metric, epsilon=self.epsilon,
                       node_repeats=node_repeats)
    
    def create_constraints(self, population_deviation) -> list:
        population_constraint = constraints.within_percent_of_ideal_population(self.initial_partition,
                                                                               population_deviation, pop_key="total_pop")
        return [population_constraint]

    def process_iteration(self, partition, id) -> (pd.DataFrame, pd.DataFrame):
        precincts = []
    
        for node in partition.graph.nodes:
            precinctId = partition.graph.nodes[node]['precinctId']
            districtId = "".join([id, str(partition.assignment[node])])
            total_pop = partition.graph.nodes[node]['total_pop']
            white = partition.graph.nodes[node]['white']
            af_amer = partition.graph.nodes[node]['af_amer']
            asian = partition.graph.nodes[node]['asian']
            native_hawaiian = partition.graph.nodes[node]['native_hawaiian']
            hispanic = partition.graph.nodes[node]['hispanic']
            two_or_more = partition.graph.nodes[node]['two_or_more']
            
            democraticPres = partition.graph.nodes[node]['democraticPres']
            republicanPres = partition.graph.nodes[node]['republicanPres']
            democraticSen = partition.graph.nodes[node]['democraticSen']
            republicanSen = partition.graph.nodes[node]['republicanSen']
            geometry = partition.graph.nodes[node]['geometry'].buffer(0)
            
            precincts.append([precinctId, districtId, total_pop, white, af_amer, asian, native_hawaiian,
                              hispanic, two_or_more, democraticPres, republicanPres,
                              democraticSen, republicanSen, geometry])
        
        precincts = pd.DataFrame(precincts,
                                 columns=['precinctId', 'districtId', 'total_pop', 'white', 'af_amer', 'asian', 
                                          'hispanic', 'native_hawaiian', 'two_or_more',
                     'democraticPres', 'republicanPres', 'democraticSen', 'republicanSen', 'geometry'])

        districts_info = precincts[
            ['districtId', 'total_pop', 'white', 'af_amer', 'asian', 'hispanic', 'native_hawaiian', 'two_or_more',
                     'democraticPres', 'republicanPres', 'democraticSen', 'republicanSen']].groupby(
            'districtId').sum().reset_index()  # summing the precincts's columns by districtId
        
        districts_info['districtPlanId'] = id
        districts_geo = precincts[['districtId', 'geometry']].groupby('districtId')['geometry'].apply(
            unary_union).reset_index() # shapely unary union does a union over all the precinct geometries
        
        districts = districts_info.merge(districts_geo, on='districtId')
        districtPlan = pd.DataFrame([[id, self.state]], columns=['districtPlanId', 'state'])
        return districtPlan, districts
    
    def run(self, num_districtPlans, iterations):
        
        for i in range(num_districtPlans):
            chain = MarkovChain(
                proposal=self.proposal,
                constraints=self.constraints,
                accept=always_accept,
                initial_state=self.initial_partition,
                total_steps=iterations)
            
            for new_partition in chain:
                pass  # runs iterations
            
            id = ''.join([self.state, 'SW', str(i)])

            new_districtPlan, new_districts = self.process_iteration(new_partition, id)
            self.seawulf_districtPlans = self.seawulf_districtPlans.append(new_districtPlan, ignore_index=True)
            self.seawulf_districts = self.seawulf_districts.append(new_districts, ignore_index=True)
            
        self.seawulf_districtPlans.to_csv("".join([self.output_path, id, '_districtPlans.csv']), index=False)
        self.seawulf_districts.to_csv("".join([self.output_path, id, '_districts.csv']), index=False)

if __name__ == '__main__':
    # load from csv to DataFrame for SeaWulf to run
    df = pd.read_csv("/Users/cherrypi/Desktop/gerrymandering-project/data/pre-processing/preseawulf_precincts_path/final_precincts_preseawulf_co.csv")
    df['geometry'] = df['geometry'].apply(wkt.loads)
    precincts_gdf = gpd.GeoDataFrame(df, crs='epsg:4326')
    
    if "Unnamed: 0" in precincts.columns:
        precincts_gdf.drop(["Unnamed: 0"], axis=1, inplace=True)

    # insert code here
    precincts_df = precincts_gdf
    state = "Co"
    num_districtPlans = 10
    iterations = 10
    assignment_criteria = 'districtId'
    random_initial_partition = True
    epsilon = 0.02
    node_repeats = 2
    cut_edges_multiplier = 2
    population_deviation = 0.1
    output_path = '/Users/cherrypi/Desktop/gerrymandering-project/data/post-processing/postseawulf_graph_path/'
    
    seawulf = Seawulf(precincts_df=precincts_gdf, state=state, assignment_criteria=assignment_criteria,
                      random_initial_partition=random_initial_partition, epsilon=epsilon, node_repeats=node_repeats,
                      cut_edges_multiplier=cut_edges_multiplier, population_deviation=population_deviation,
                      output_path=output_path)
    
    seawulf.run(num_districtPlans=num_districtPlans, iterations=iterations)