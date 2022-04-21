import geopandas
import pandas
import maup
import warnings; warnings.filterwarnings('ignore', 'GeoSeries.isna', UserWarning)

precincts_co=geopandas.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/co_data/precinct/co_precinct_and_election_shp")
precincts_co.to_crs(inplace=True, crs="EPSG:4269")

block_co=geopandas.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/co_data/precinct/co_cvap_2020_block_shp")
block_co.to_crs(inplace=True, crs="EPSG:4269")

print("colorado block columns: ", block_co.columns)

assignment_co=maup.assign(block_co, precincts_co) # this returns a Pandas Series

variables_co = ["CVAP_TOT20", "CVAP_ASN20", "CVAP_BLK20", "CVAP_NHP20", "CVAP_WHT20"]

precincts_co[variables_co] = block_co[variables_co].groupby(assignment_co).sum()

precincts_co[variables_co] 