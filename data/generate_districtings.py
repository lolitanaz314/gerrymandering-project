import sys
from read_config import read_yaml

# this takes in the .yaml file that's going to be modified every single time that we run Seawulf

if __name__ == '__main__':
    # precincts_path, output_path, num_districtings, num_iterations, save_on, state = sys.argv[1], sys.argv[2], sys.argv[
    #     3], sys.argv[4], sys.argv[5], sys.argv[6]
    config_path = sys.argv[1]
    config = read_yaml(config_path)
    
    num_districtings = config['num_districtings']
    iterations = config['iterations']
    precincts_path = config['precincts_path']
    output_path = config['output_path']
    category = config['category']
    random_initial_partition = config['random_initial_partition']
    node_repeats = config['node_repeats']
    cut_edges_multiplier = config['cut_edges_multiplier']
    population_deviation = config['population_deviation']
    save_on = config['save_on']
    state = config['state']
    
    '''
    seawulf = Seawulf(precincts_path=precincts_path, state=state, assignment_criteria=assignment_criteria,
                      random_initial_partition=random_initial_partition, epsilon=epsilon, node_repeats=node_repeats,
                      cut_edges_multiplier=cut_edges_multiplier, population_deviation=population_deviation,
                      output_path=output_path)
    seawulf.run(num_districtings=num_districtings, iterations=iterations, maxtime=600)  # this would be 10 minutes
    '''