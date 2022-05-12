import geopandas
import pandas
import maup

import warnings; 

warnings.filterwarnings('ignore', 'GeoSeries.isna', UserWarning)

precincts_sc=geopandas.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/sc_data/precinct/sc_precinct_and_election_results_shp")
precincts_sc.to_crs(inplace=True, crs="EPSG:4269")

block_sc=geopandas.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/sc_data/precinct/sc_cvap_2020_block_shp")
block_sc.to_crs(inplace=True, crs="EPSG:4269")

assignment_sc=maup.assign(block_sc, precincts_sc) # this returns a Pandas Series

# making the geometries valid

precincts_sc['geometry']=precincts_sc['geometry'].buffer(0)

new_geom_series=[]
for geom in precincts_sc['geometry']:
    if geom.is_valid:
        new_geom_series.append(geom)
    else:
        new_geom_series.append(geom_factory(lgeos.GEOSMakeValid(geom._geom)))
precincts_sc['geometry'] = new_geom_series

variables_sc = ["CVAP_TOT20", "CVAP_ASN20", "CVAP_BLK20", "CVAP_NHP20", "CVAP_WHT20", "CVAP_HSP20", "CVAP_2OM20"]
precincts_sc[variables_sc] = block_sc[variables_sc].groupby(assignment_sc).sum()
#display(precincts_co[variables_co])

renamed_precincts_sc=precincts_sc.rename(columns={"PCODE": "precinctId", 
                                                  'STATEFP': 'stateId',
                                                  "G20PREDBID": "democraticPres", 'G20PRERTRU': 'republicanPres', 
                                                  'G20USSDHAR': 'democraticSen', 'G20USSRGRA': 'republicanSen',
                                                  "CVAP_TOT20":"total_pop", "CVAP_ASN20":"asian", 
                                                  "CVAP_BLK20":"af_amer", "CVAP_NHP20":"native_hawaiian", "CVAP_WHT20": 
                                                  "white", "CVAP_HSP20":"hispanic", "CVAP_2OM20": "two_or_more"})
print(renamed_precincts_sc.columns)

# Drop columns that don't have to do with the President or Senate, or democratic/republican
final_precincts_sc = renamed_precincts_sc.drop(['G20PRELJOR', 'G20PREGHAW', 'G20PREAFUE', 'G20USSCBLE', 'G20USSOWRI'], 1)

# making the demographics all ints
final_precincts_sc['total_pop']=final_precincts_sc['total_pop'].astype(int)
final_precincts_sc['asian']=final_precincts_sc['asian'].astype(int)
final_precincts_sc['af_amer']=final_precincts_sc['af_amer'].astype(int)
final_precincts_sc['native_hawaiian']=final_precincts_sc['native_hawaiian'].astype(int)
final_precincts_sc['white']=final_precincts_sc['white'].astype(int)
final_precincts_sc['hispanic']=final_precincts_sc['hispanic'].astype(int)
final_precincts_sc['two_or_more']=final_precincts_sc['two_or_more'].astype(int)

state_id_column = ['Sc' for i in range(len(precincts_sc))]
final_precincts_sc['stateId']=state_id_column

district_sc=geopandas.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/sc_data/district/sc_congressional_districts_approved_plan_2022_PROPOSED_shp")

final_precincts_sc.to_crs(district_sc.crs, inplace=True)
assignment_prec_to_district_sc = maup.assign(final_precincts_sc, district_sc)
final_precincts_sc["districtId"] = assignment_prec_to_district_sc
final_precincts_sc["geometry"] = final_precincts_sc["geometry"].buffer(0)


# export dataframe to csv
file_path_name = "/Users/cherrypi/Desktop/gerrymandering-project/data/pre-processing/preseawulf_precincts_path/final_precincts_preseawulf_sc.csv"
final_precincts_sc.to_csv(file_path_name, encoding='utf-8')




