from gerrychain import Graph
import json
from collections import defaultdict
import geopandas
import sys

'''
The file has to look something like (aka be a GeoJSON, not just any JSON):

{
"type": "FeatureCollection",
"name": "tn_2016",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { "NAME": "8", "VTD": "1611", "G16RPRS": 427, "G16DPRS": 84,
 "G16PREIDeL": 0, "G16PRELJoh": 11, "G16PRESKen": 0, "G16PREISmi": 2, "G16PREGSte": 1, "G16PREOth": 0 },
  "geometry": { "type": "Polygon", "coordinates": [ [ [ -89.056904000136356, 35.81322799933946 ], 
  [ -89.056722999939012, 35.813219999198445 ], [ -89.056510000408394, 35.813231998656093 ], [ -89.056433999652285, 35.813243998806257 ], 
  [ -89.05585699986112, 35.813337999279639 ], [ -89.055452999882704, 35.813386998763477 ], [ -89.055390999626653, 35.813394999043155 ], 
  ...
},

{ "type": "Feature", "properties": { "NAME": "6", "VTD": "1612", "G16RPRS": 403, "G16DPRS": 89, "G16PREIDeL": 0, 
"G16PRELJoh": 9, "G16PRESKen": 0, "G16PREISmi": 1, "G16PREGSte": 1, "G16PREOth": 4 }, 
"geometry": { "type": "Polygon", "coordinates": [ [ [ -89.021846000565191, 35.854395999491793 ], [ -89.021515000040765, 35.853796999185029 ], 
[ -89.021461000406902, 35.853659998694617 ], [ -89.021428000554948, 35.853340999362359 ], [ -89.021508999941389, 35.852087998942551 ], 
[ -89.021448999747705, 35.850520999130325 ], [ -89.021456999843835, 35.849762999128103 ], [ -89.021451999956895, 35.847100998723199 ], 
[ -89.02142500040101, 35.846919999135174 ], [ -89.021315999640521, 35.846474998663311 ], [ -89.020447000153766, 35.843835999188649 ], 
[ -89.020407000043434, 35.843291998890678 ], [ -89.020306000156708, 35.842900998669109 ], [ -89.01967200000189, 35.841867999004634 ], 
[ -89.019415999580346, 35.841283998887526 ], 
}
or otherwise it will not work
'''

# Only applies when running something from local:
#------------------------------------------------
# run this command in terminal:
# python findAdjacentPrecinctNeighbors.py [filename]

# samplepath from local machine (that actually works) = '/Users/cherrypi/Desktop/tn_2016.geojson'
'''
if len(sys.argv) != 2:
	print("provide the (precinct or county) json path you wish to turn into an adjacency graph")
'''
print(len(sys.argv))

# currently this file is being gitignored in Github because it's far too large
# this is going to become a command line arg later
df_geo_ten = geopandas.read_file('tn_data/tn_precinct_election_2016.geojson', ignore_errors=True, reproject=True) 
df_geo_ten.to_crs(inplace=True, crs="EPSG:5070")
#print(df_geo_ten.crs)

adjacency_graph = Graph.from_geodataframe(df_geo_ten, ignore_errors=True, reproject=False)

for i in range(10): # just to see what the adjacency list looks like
    print(adjacency_graph[i])

adjacency_graph_path_name = "tennessee_precinct_adj_graph.json" # this name will be changed to a custom state name
adjacency_graph.to_json(adjacency_graph_path_name)