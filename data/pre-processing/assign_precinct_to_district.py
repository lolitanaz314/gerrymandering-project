import geopandas
import pandas
import maup
import warnings; warnings.filterwarnings('ignore', 'GeoSeries.isna', UserWarning)

precinct_tn = geopandas.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/tn_data/precinct/tn_precinct_election_2020_shp")
district_tn = geopandas.read_file("/Users/cherrypi/Desktop/gerrymandering-project/data/tn_data/district/tn_enacted_district_plan_HOR_2022_shp")

precinct_tn.to_crs(district_tn.crs, inplace=True)

assignment_prec_to_district_tn = maup.assign(precinct_tn, district_tn)
# Add the assigned districts as a column of the `precincts` GeoDataFrame:
precinct_tn["districtID"] = assignment_prec_to_district_tn

print(assignment_prec_to_district_tn) # just to check that nothing messed up

# Now precinct data has districtID, convert back from geopandas to geoJSON and store in directory

geoJSON_precinct_with_districtID_path = "/Users/cherrypi/Desktop/gerrymandering-project/data/tn_data/precinct_tn_with_districtID.json"
precinct_tn.to_file(geoJSON_precinct_with_districtID_path, driver="GeoJSON")