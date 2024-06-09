import pandas as pd
import json
import requests
import os
from io import StringIO

# Define the URL for the CSV file
url = "https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/env_waseleeos/?format=SDMX-CSV&i"

# Fetch the CSV data from the URL
response = requests.get(url)
csv_data = response.content.decode('utf-8')

# Read the CSV data into a DataFrame
df = pd.read_csv(StringIO(csv_data))

# Function to filter data based on country, unit, and waste operation
def filter_data(country, unit, waste_operation, category):
    filtered_df = df[(df['geo'] == country) & (df['unit'] == unit) & (df['wst_oper'] == waste_operation) & (df['waste'] == category)]
    return filtered_df

# Example: Filter data for each country, unit, and waste operation
countries = df['geo'].unique()
units = df['unit'].unique()
operations = df['wst_oper'].unique()
categories = df['waste'].unique()

for country in countries:
    for unit in units:
        for operation in operations:    
            datapoints = {}
            current_directory = os.path.dirname(os.path.realpath(__file__))
            for categorie in categories:
                filtered_data = filter_data(country, unit, operation, categorie)
                # Extract datapoints as arrays of objects
                for index, row in filtered_data.iterrows():
                    key = row['TIME_PERIOD']
                    if(not key in datapoints):
                        datapoints[key] = 0
                    datapoints[key] += row['OBS_VALUE']
               
            if (len(datapoints) == 0): # Filter out tables with no data
                continue
    
            data_arr = []
            keys = datapoints.keys()

            for key in keys:
                data_arr.append({'year': key, 'value': datapoints[key]})

            # Export datapoints to JSON file
            filename = f"{current_directory}/eu/{country}_{operation}_{unit}.json"  # Example file name: "US_kg_COL.json"
            with open(filename, 'w') as file:
                json.dump(data_arr, file)

print("Data exported successfully.")
