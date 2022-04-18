import matplotlib.pyplot as plt
'''
from gerrychain import (GeographicPartition, Partition, Graph, MarkovChain,
                        proposals, updaters, constraints, accept, Election)
                     
from gerrychain.proposals import recom'''

import gerrychain
from functools import partial
import pandas

import json
import sys
import matplotlib.pyplot as plt

# JUST AN EXMAPLE GUYS, RELAX
'''
In order to run a Markov chain, we need an adjacency Graph of our 
VTD geometries and Partition of our adjacency graph into districts.
 This Partition will be the initial state of our Markov chain.
'''

'''
What the data is supposed to look like, being fed into Seawulf
{
    "1": {
        "adjacent_nodes": [
            "2",
            "12"
        ],
        "population": 50,
        "voting_history": "D",
        "district": "A"
    },
    "2": {
        "adjacent_nodes": [
            "3",
            "13"
        ],
        "population": 50,
        "voting_history": "D",
        "district": "A"
    },
    "3": {
        "adjacent_nodes": [
            "4",
            "14"
        ],
        "population": 50,
        "voting_history": "D",
        "district": "A"

'''

graph = Graph.from_json("/Users/cherrypi/Desktop/gerrymandering-project/data/sample_data/PA_VTDs_sample.json") # this is going to be a command line argument (Colorado, SC, or Ten-I-see)

# hypothetical election results
elections = [
    Election("SEN10", {"Democratic": "SEN10D", "Republican": "SEN10R"}),
    Election("SEN12", {"Democratic": "USS12D", "Republican": "USS12R"}),
    Election("SEN16", {"Democratic": "T16SEND", "Republican": "T16SENR"}),
    Election("PRES12", {"Democratic": "PRES12D", "Republican": "PRES12R"}),
    Election("PRES16", {"Democratic": "T16PRESD", "Republican": "T16PRESR"})
]

# Population updater, for computing how close to equality the district
# populations are. "TOTPOP" is the population column from our shapefile.
my_updaters = {"population": updaters.Tally("TOTPOP", alias="population")}

# Election updaters, for computing election results using the vote totals
# from our shapefile.
election_updaters = {election.name: election for election in elections}
my_updaters.update(election_updaters)

# instantiating the partition
initial_partition = GeographicPartition(graph, assignment="CD_2011", updaters=my_updaters)

'''
initial_partition = Partition(
    graph,
    assignment="CD_2011",
    updaters={
        "cut_edges": cut_edges,
        "population": Tally("TOTPOP", alias="population"),
        "SEN12": election
    }
)
'''

# just to display district and population totals
for district, pop in initial_partition["population"].items():
	print("District {}: {}".format(district, pop))

# The ReCom proposal needs to know the ideal population for the districts so that
# we can improve speed by bailing early on unbalanced partitions.

ideal_population = sum(initial_partition["population"].values()) / len(initial_partition)

# We use functools.partial to bind the extra parameters (pop_col, pop_target, epsilon, node_repeats)
# of the recom proposal.
proposal = partial(recom,
                   pop_col="TOTPOP",
                   pop_target=ideal_population,
                   epsilon=0.02,
                   node_repeats=2
                  )

# Constraints
compactness_bound = constraints.UpperBound(
    lambda p: len(p["cut_edges"]),
    2*len(initial_partition["cut_edges"])
)

pop_constraint = constraints.within_percent_of_ideal_population(initial_partition, 0.02)

# ALL OF THIS WILL BE DONE USING SEAWFULF, IGNORE !!!!!
# Configuring the Markov chain
chain = MarkovChain(
    proposal=proposal,
    constraints=[
        pop_constraint,
        compactness_bound
    ],
    accept=accept.always_accept,
    initial_state=initial_partition,
    total_steps=1000
)

'''
Running the chain
Now we’ll run the chain, putting the sorted Democratic vote percentages 
directly into a pandas DataFrame for analysis and plotting. 
The DataFrame will have a row for each state of the chain. 
The first column of the DataFrame will hold the lowest Democratic vote share 
among the districts in each partition in the chain, the second column will 
hold the second-lowest Democratic vote shares, and so on.
'''

# This will take about 10 minutes.

data = pandas.DataFrame(
    sorted(partition["SEN12"].percents("Democratic"))
    for partition in chain
)

# SEGMENTATION FAULT occurs when I uncomment the below lines???? what the fook????? America explain-

'''
fig, ax = plt.subplots(figsize=(8, 6))

# Draw 50% line
ax.axhline(0.5, color="#cccccc")

# Draw boxplot
data.boxplot(ax=ax, positions=range(len(data.columns)))

# Draw initial plan's Democratic vote %s (.iloc[0] gives the first row)
plt.plot(data.iloc[0], "ro")

# Annotate
ax.set_title("Comparing the 2011 plan to an ensemble")
ax.set_ylabel("Democratic vote % (Senate 2012)")
ax.set_xlabel("Sorted districts")
ax.set_ylim(0, 1)
ax.set_yticks([0, 0.25, 0.5, 0.75, 1])

plt.show()'''