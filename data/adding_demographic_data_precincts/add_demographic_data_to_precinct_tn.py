import geopandas
import pandas
import maup

precincts_tn=geopandas.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/tn_data/precinct/tn_precinct_election_2020_shp")
blocks_tn=geopandas.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/tn_data/precinct/tn_cvap_2020_2020_b_shp")

assignment_tn = maup.assign(blocks_tn, precincts_tn) # this returns a Pandas Series

'''
For the Block shapefile
GEOID20                 Unique Identifier
COUNTYFP20			County FIPS Code
CVAP_TOT20              CVAP Estimate for Total
CVAP_NHS20              CVAP Estimate for Not Hispanic or Latino
CVAP_AIA20            	CVAP Estimate for American Indian or Alaska Native Alone or In Combination
CVAP_ASN20              CVAP Estimate for Asian Alone or In Combination
CVAP_BLK20              CVAP Estimate for Black or African American Alone or In Combination
CVAP_NHP20              CVAP Estimate for Native Hawaiian or Other Pacific Islander Alone
CVAP_WHT20              CVAP Estimate for White Alone
CVAP_AIW20              CVAP Estimate for American Indian or Alaska Native and White
CVAP_ASW20              CVAP Estimate for Asian and White
CVAP_BLW20              CVAP Estimate for Black or African American and White
CVAP_AIB20            	CVAP Estimate for American Indian or Alaska Native and Black or African 
'''

variables_tn = ["CVAP_TOT20", "CVAP_ASN20", "CVAP_BLK20", "CVAP_NHP20", "CVAP_WHT20"]
precincts_tn[variables_tn] = blocks_tn[variables_tn].groupby(assignment_tn).sum()

precincts_tn[variables_tn]
