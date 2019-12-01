import paho.mqtt.client as mqtt
import time
import json
import random
from datetime import datetime
import sys
import json
import psycopg2


class simulador_UM:

    def __init__(self):
        self.numero = 1
        self.uranio = round(random.uniform(2.5,2.8), 3)
        self.xenonio = round(random.uniform(3,4), 3)
        self.radioatividade = round(random.uniform(-0.25,0.25), 3)
        self.temperatura = random.randint(300, 450)
        self.pressao = random.randint(2000,2400)
        self.energiaprod = round(random.uniform(1,3), 3)


    def main(self):
        numero = self.numero
        uranio = self.uranio
        xenonio = self.xenonio
        radioatividade = self.radioatividade
        temperatura = self.temperatura
        pressao = self.pressao
        energiaprod = self.energiaprod
        ts = datetime.now().isoformat()
        formattedts = "TIMESTAMP '{}'".format(ts)

        query = '''
        INSERT INTO measurements (sensor_id, measurement_type_id, value, datetime)
        VALUES 
        ({}, 1, {}, {}),
        ({}, 2, {}, {}),
        ({}, 3, {}, {}),
        ({}, 4, {}, {}),
        ({}, 5, {}, {}),
        ({}, 6, {}, {})
        '''.format(
            numero,uranio,formattedts,
            numero,xenonio,formattedts,
            numero,radioatividade,formattedts,
            numero,temperatura,formattedts,
            numero,pressao,formattedts,
            numero,energiaprod,formattedts                
            )


        con = psycopg2.connect(database="mcwmotzg", user="mcwmotzg", password="lHaH0VRzaHD0oNAecVdF9vafhldRrE-b", host="motty.db.elephantsql.com", port="5432")
        print("Database opened successfully")

        cur = con.cursor()

        cur.execute(query)

        con.commit()
        time.sleep(5)












