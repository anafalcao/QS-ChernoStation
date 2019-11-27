import paho.mqtt.client as mqtt
import time
import json
import random
from datetime import date
import sys
import json
from sgqlc.endpoint.http import HTTPEndpoint


class simulador_UM:

    def __init__(self, velocidade_media : int, temperatura_media : int, umidade_media : int, localidade : str, numero : str, scale : int):
        #Dados a serem simulados e enviados à Cloud da IBM
        self.velocidade_media = velocidade_media
        self.temperatura_media = temperatura_media
        self.umidade_media = umidade_media
        self.localidade = localidade
        self.numero = numero

        #######################################################################################################
        
        #######################################################################################################

        self.scale = scale # 1 para 1 segundo e 60 para 1 minuto
        self.time_interval = 15
        self.blow_interval = 0.5



    def get_velocidade(self):
        return (random.randint(self.velocidade_media - 5, self.velocidade_media + 5))

    def get_temperatura(self):
        return (random.randint(self.temperatura_media-1, self.temperatura_media+1))

    def get_umidade(self):
        return (random.randint(self.umidade_media-1, self.umidade_media+1))

    def mqtt_connect(self):
        self.client.connect("{}.messaging.internetofthings.ibmcloud.com".format(self.org_id), 1883)


    def generate_payload(self, vento, umidade, temperatura, rajada, classificacao):
        data = str(date.today())
        hora = time.strftime('%X')
        payload = {"d": {"Localidade":self.localidade, "Data":data, "Hora": hora, "Velocidade do Vento": vento, "Rajada" : rajada,"Classificacao": classificacao, "Umidade": umidade, "Temperatura":temperatura }}
        payload = json.dumps(payload)
        return payload



    def main(self):
        # while True:
        #     times = int(self.time_interval/self.blow_interval) #Vezes que irá colher os dados no intervalo de tempo entre envio
        #     velocidade = 0
        #     rajada = 0
        #     for i in range(1,times+1):

        #         velocidade = self.get_velocidade()
        #         rajada = max(velocidade, rajada)

        #         time.sleep(self.blow_interval*self.scale)

        #     umidade = self.get_umidade()
        #     temperatura = self.get_temperatura()
        #     classificacao = self.get_classificacao(velocidade)
        #     payload = self.generate_payload(velocidade, umidade, temperatura, rajada, classificacao)

        #     #Nova conexão a cada envio, visto que o tempo de conexão é 60 segundos
        #     self.mqtt_connect()
        #     self.client.publish(self.topic, payload=payload, qos=2, retain=False)
        #     print("Published : {}".format(payload))

        # try:
        #     token, repo = sys.argv[1:]
        # except ValueError:
        #     raise SystemExit('Usage: <token> <team/repo>')

        while True:
            query = '''
            mutation MyMutation($id: Int!, $id2: Int!, $id3: Int!) {
            __typename
            first: createMeasurement(input: {measurement: {id: $id}}) {
                measurement {
                nodeId
                }
            }
            second: createMeasurement(input: {measurement: {id: $id2}}) {
                measurement {
                nodeId
                }
            }
            third: createMeasurement(input: {measurement: {id: $id3}}) {
                measurement {
                nodeId
                }
            }
            }

            '''

            # owner, name = repo.split('/', 1)
            variables = {
                'id1': owner,
                'id2': name,
                'id3': name,
            }

            url = 'http://localhost:5000/graphql'
            headers = {}

            endpoint = HTTPEndpoint(url, headers)
            data = endpoint(query, variables)

            json.dump(data, sys.stdout, sort_keys=True, indent=2, default=str)
            time.sleep(5)












