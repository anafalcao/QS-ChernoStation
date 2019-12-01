import paho.mqtt.client as mqtt
import time
import json
import random
import datetime
import sys
import json
import psycopg2


class simulador_UM:

    def __init__(self, uranio : float, xenonio : float, radioatividade : float, temperatura : int, pressao : int, energiaprod : float, numero : str):
        #Dados a serem simulados e enviados à Cloud da IBM
        self.uranio = uranio
        self.xenonio = xenonio
        self.radioatividade = radioatividade
        self.temperatura = temperatura
        self.pressao = pressao
        self.energiaprod = energiaprod
        self.numero = numero

        #######################################################################################################
        
        #######################################################################################################

        # self.scale = scale # 1 para 1 segundo e 60 para 1 minuto
        # self.time_interval = 15
        # self.blow_interval = 0.5



    # def get_velocidade(self):
    #     return (random.randint(self.velocidade_media - 5, self.velocidade_media + 5))

    # def get_temperatura(self):
    #     return (random.randint(self.temperatura_media-1, self.temperatura_media+1))

    # def get_umidade(self):
    #     return (random.randint(self.umidade_media-1, self.umidade_media+1))

    # def mqtt_connect(self):
    #     self.client.connect("{}.messaging.internetofthings.ibmcloud.com".format(self.org_id), 1883)


    # def generate_payload(self, vento, umidade, temperatura, rajada, classificacao):
    #     data = str(date.today())
    #     hora = time.strftime('%X')
    #     payload = {"d": {"Localidade":self.localidade, "Data":data, "Hora": hora, "Velocidade do Vento": vento, "Rajada" : rajada,"Classificacao": classificacao, "Umidade": umidade, "Temperatura":temperatura }}
    #     payload = json.dumps(payload)
    #     return payload



    def main(self):
        while True:
            numero = self.numero
            uranio = self.uranio
            xenonio = self.xenonio
            radioatividade = self.radioatividade
            temperatura = self.temperatura
            pressao = self.pressao
            energiaprod = self.energiaprod
            ts = datetime.datetime.now().isoformat()
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

            # owner, name = repo.split('/', 1)
            # variables = {
            #     'id1': owner,
            #     'id2': name,
            #     'id3': name,
            # }

            con = psycopg2.connect(database="mcwmotzg", user="mcwmotzg", password="lHaH0VRzaHD0oNAecVdF9vafhldRrE-b", host="motty.db.elephantsql.com", port="5432")
            print("Database opened successfully")

            cur = con.cursor()

            cur.execute(query)

            con.commit()
            time.sleep(5)












