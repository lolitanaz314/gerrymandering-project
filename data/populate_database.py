import mysql.connector
import geopandas
import pandas
import sys
import pandas as pd
import maup
import numpy as np
import json

class DBConnector:
    def __init__(self, host, user, password, database):
        self.db = mysql.connector.connect(host=host, user=user, password=password, database=database)
        self.cursor = self.db.cursor() # allows us to perform various SQL operations.
        
        try:
            if db.is_connected():
                db_Info = connection.get_server_info()
                print("Connected to MySQL Server version ", db_Info)
                cursor = db.cursor()
                cursor.execute("select database();")
                record = cursor.fetchone()
                print("You're connected to database: ", record)

        except Error as e:
            print("Error while connecting to MySQL", e)
            
    def populate_demographic_table(self, demographicJSON):
        sql = "INSERT INTO demographic (id, state_id, district_plan_id, district_id, precinct_id, race, total_pop) VALUE (%s,%s,%s,%s,%s,%s)" # precinct= name of table
        print(demographic.columns)
        values = demographicJSON[['id', 'state_id', 'district_plan_id', 'district_id', 'precinct_id', 'race', 'total_pop']].values
        print(values)
        for index,value in enumerate(values):
            try:
                value = (str(value[0]), str(value[1]), str(value[2]), str(value[3]), str(value[4]), str(value[5]), str(value[6]))
                self.cursor.execute(sql, value) #  execute() methods run the SQL query and return the result.
                self.db.commit()
            except mysql.connector.IntegrityError:
                pass
            
    def populate_districts_table(self, districtsJSON):
        sql = "INSERT INTO district (district_plan_id, id, state_id, incumbent) VALUES(%s,%s,%s,%s)"
        values = districts[['district_plan_id', 'id', 'state_id', 'incumbent']].values
        for value in values:
            try:
                value = (str(value[0]), str(value[1]), str(value[2]), str(value[3]))
                self.cursor.execute(sql, value)
                self.db.commit()
            except mysql.connector.IntegrityError:
                pass
            
    def populate_district_plan_table(self, district_plan_JSON):
        sql = "INSERT INTO district_plan (id, state_id, date, proposed_by, status, seat_bias, vote_bias) VALUES(%s,%s,%s,%s,%s,%s)"
        values = district_plan_JSON[['id', 'state_id', 'date', 'proposed_by', 'status', 'seat_bias', 'vote_bias']].values
        for value in values:
            try:
                value = (str(value[0]), str(value[1]), str(value[2]), str(value[3]), str(value[4]), str(value[5]),str(value[6]))
                self.cursor.execute(sql, value)
                self.db.commit()
            except mysql.connector.IntegrityError:
                pass
            
    def populate_precinct_table(self, precinct_JSON): # parameters = columns of the table
        sql = "INSERT INTO precinct (id, state_id, total_pop) VALUE (%s,%s,%s)" # precinct= name of table
        print(precinct.columns)
        values = precinct_JSON[['id', 'state_id', 'total_pop']].values
        print(values)
        for index,value in enumerate(values):
            try:
                value = (str(value[0]), str(value[1]), str(value[2]))
                self.cursor.execute(sql, value) #  execute() methods run the SQL query and return the result.
                self.db.commit()
            except mysql.connector.IntegrityError:
                pass

    def populate_seat_vote_table(self, seatvoteJSON):
        sql = "INSERT INTO seat_vote (id, state_id, seat_bias, vote_bias) VALUES(%s,%s,%s,%s)"
        id_list, stateid_list, seatbias_list, votebias_list = seatvoteJSON['id'], seatvoteJSON['state_id'], seatvoteJSON['seat_bias'], seatvoteJSON['vote_bias']
        for i in range(len(id_list)):
            try:
                value = (str(id_list[i]), str(stateid_list[i]), str(seatbias_list[i]), str(votebias_list[i]))
                self.cursor.execute(sql, value)
                self.db.commit()
            except mysql.connector.IntegrityError:
                pass

    if __name__ == "__main__":
	    databaseConnection = DBConnector(host='mysql3.cs.stonybrook.edu', database='Lynx', user='lnazarov', password='110722612')
	    # a Python object (dict):
	    x = {
	      "id": [1, 4, 5],
	      "state_id": [1, 1, 1],
	      "seat_bias": [50, 64, 24],
	      "vote_bias": [30, 45, 43]
	    }
	    # convert into JSON:
	    seatVoteExampleJSON = json.dumps(x)
	    seatVoteExampleJSON = json.loads(seatVoteExampleJSON)
	    # the result is a JSON string:
	    print(seatVoteExampleJSON)

	    databaseConnection.populate_seat_vote_table(seatVoteExampleJSON)
	    
	    if databaseConnection.db.is_connected():
	        databaseConnection.cursor.close()
	        databaseConnection.db.close()
	        print("MySQL connection is closed")
