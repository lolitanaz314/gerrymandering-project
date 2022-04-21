import sys
from read_config import read_yaml

# this takes in the .yaml file that's going to be modified every single time that we run Seawulf

if __name__ == '__main__':
    # precincts_path, output_path, num_districtings, num_iterations, state = 
    # sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5]

    config_path = sys.argv[1]
    config = read_yaml(config_path)
    
    num_districtings = config['num_districtings']
    iterations = config['iterations']
    precincts_path = config['precincts_path']
    output_path = config['output_path']
    random_initial_partition = config['random_initial_partition']
    cut_edges_multiplier = config['cut_edges_multiplier']
    state = config['state']
    
    seawulf = Seawulf(precincts_path=precincts_path, output_path=output_path, 
                      random_initial_partition=random_initial_partition,
                      cut_edges_multiplier=cut_edges_multiplier, state=state
                      )
    seawulf.run(num_districtings=num_districtings, iterations=iterations)