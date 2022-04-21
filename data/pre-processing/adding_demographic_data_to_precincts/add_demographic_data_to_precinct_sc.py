import geopandas
import pandas
import maup

import warnings; 

warnings.filterwarnings('ignore', 'GeoSeries.isna', UserWarning)

precincts_sc=geopandas.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/sc_data/precinct/sc_precinct_and_election_results_shp")
precincts_sc.to_crs(inplace=True, crs="EPSG:4269")

block_sc=geopandas.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/sc_data/precinct/sc_cvap_2020_block_shp")
block_sc.to_crs(inplace=True, crs="EPSG:4269")

'''

Columns of the block geopandas:
'GEOID20', 'COUNTYFP20', 'CVAP_TOT20', 'CVAP_NHS20', 'CVAP_AIA20',
       'CVAP_ASN20', 'CVAP_BLK20', 'CVAP_NHP20', 'CVAP_WHT20', 'CVAP_AIW20',
       'CVAP_ASW20', 'CVAP_BLW20', 'CVAP_AIB20', 'CVAP_2OM20', 'CVAP_HSP20',
       'C_TOT20', 'C_NHS20', 'C_AIA20', 'C_ASN20', 'C_BLK20', 'C_NHP20',
       'C_WHT20', 'C_AIW20', 'C_ASW20', 'C_BLW20', 'C_AIB20', 'C_2OM20',
       'C_HSP20', 'geometry'
'''

assignment_sc=maup.assign(block_sc, precincts_sc) # this returns a Pandas Series

variables_sc = ["CVAP_TOT20", "CVAP_ASN20", "CVAP_BLK20", "CVAP_NHP20", "CVAP_WHT20"]
precincts_sc[variables_sc] = block_sc[variables_sc].groupby(assignment_sc).sum()
precincts_sc[variables_sc]

with open('/Users/cherrypi/Desktop/gerrymandering-project/data/sc_data/final_precinct_geoJSON_sc.json', 'w') as f:
    json.dump(precincts_sc, f)
