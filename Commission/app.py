from flask import Flask, render_template, jsonify
import pandas as pd
app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')

def read_top_stations():
    df = pd.read_csv('csv/Electric_Vehicle_Charging_Stations 1.csv')  
    
    df['EV Level1 EVSE Num'] = pd.to_numeric(df['EV Level1 EVSE Num'], errors='coerce')
    df = df.dropna(subset=['EV Level1 EVSE Num'])
    df = df.nlargest(13, 'EV Level1 EVSE Num')   

    return {
        "labels": df['Station Name'].tolist(),
        "datasets": [{
            "label": 'Top EV Level 1 Stations',
            "data": df['EV Level1 EVSE Num'].tolist(),
        }]
    }

def read_total_vehicles():
    df = pd.read_csv('csv/Electric_Vehicle_Charging_Stations 2.csv')  
    
    df['Total Vehicles'] = pd.to_numeric(df['Total Vehicles'], errors='coerce')
    df = df.dropna(subset=['Total Vehicles'])
    filtered_df = pd.concat([
            df.iloc[0:50]
        ])
    filtered_df = filtered_df.sort_values('Total Vehicles')

    return {
        "labels": filtered_df['County'].tolist(),
        "datasets": [{
            "label": 'Total Elictric Vehicles',
            "data": filtered_df['Total Vehicles'].tolist(),
        }]
    }


def read_batt_vehicles():
    df = pd.read_csv('csv/Electric_Vehicle_Charging_Stations 2.csv')  
    
    df['Non-Electric Vehicle Total'] = pd.to_numeric(df['Non-Electric Vehicle Total'], errors='coerce')
    df = df.dropna(subset=['Non-Electric Vehicle Total'])
    filtered_df = pd.concat([
            df.iloc[0:12]
        ])
    filtered_df = filtered_df.sort_values('Non-Electric Vehicle Total')

    df['Electric Vehicle (EV) Total'] = pd.to_numeric(df['Electric Vehicle (EV) Total'], errors='coerce')
    df = df.dropna(subset=['Electric Vehicle (EV) Total'])
    filtered_df = pd.concat([
            df.iloc[0:12]
        ])
    filtered_df = filtered_df.sort_values('Electric Vehicle (EV) Total')

    return {
        "labels": filtered_df['Date'].tolist(),
        "datasets": [
            {
                "label": 'Non-Electric Vehicle Total',
                "data": filtered_df['Non-Electric Vehicle Total'].tolist(),
                "borderColor": 'rgba(255, 99, 132, 1)',
                "backgroundColor": 'rgba(255, 99, 132, 0.9)' 
            },
            {
                "label": 'Electric Vehicle Total',
                "data": filtered_df['Electric Vehicle (EV) Total'].tolist(),
                "borderColor": 'rgba(54, 162, 235, 1)',
                "backgroundColor": 'rgba(54, 162, 235, 0.9)'
            }
        ]
    }


@app.route('/api/chart-data/batt_vehicles', methods=['GET'])
def batt_vehicles_chart():
    return jsonify(read_batt_vehicles())

@app.route('/api/chart-data/total_vehicles', methods=['GET'])
def total_vehicles_chart():
    return jsonify(read_total_vehicles())

@app.route('/api/chart-data/top_stations', methods=['GET'])
def top_stations_chart():
    return jsonify(read_top_stations())                


        
if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)

