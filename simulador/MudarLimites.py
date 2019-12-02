import paho.mqtt.client as mqtt
import time
import json
import random
from datetime import datetime
import sys
import json
import psycopg2

# arquivo para modificar as regras de cada tipo de medida (basta mudar o max_value e min_value),
# comentar as medidas que você não quer mudar, e rodar o arquivo

con = psycopg2.connect(database="mcwmotzg", user="mcwmotzg", password="lHaH0VRzaHD0oNAecVdF9vafhldRrE-b", host="motty.db.elephantsql.com", port="5432")
print("Database opened successfully")

cur = con.cursor()

cur.execute("update rules set max_value=2.6, min_value=2 where id=1") #uranio niveis altos
cur.execute("update rules set max_value=2.7, min_value=2 where id=2") #uranio niveis muito altos
cur.execute("update rules set max_value=2.75, min_value=2 where id=3") #uranio niveis criticos
cur.execute("update rules set max_value=3.7, min_value=3 where id=4") #xenonio niveis altos
cur.execute("update rules set max_value=3.8, min_value=3 where id=5") #xenonio niveis muito altos
cur.execute("update rules set max_value=3.9, min_value=3 where id=6") #xenonio niveis criticos
cur.execute("update rules set max_value=0.15, min_value=-0.3 where id=7") #radioatividade nivel alto
cur.execute("update rules set max_value=0.20, min_value=-0.3 where id=8") #radioatividade nivel muito alto
cur.execute("update rules set max_value=0.22, min_value=-0.3 where id=9") #radioatividade nivel critico
cur.execute("update rules set max_value=400, min_value=300 where id=10") #temperatura niveis altos
cur.execute("update rules set max_value=420, min_value=300 where id=11") #temperatura niveis muito altos
cur.execute("update rules set max_value=435, min_value=300 where id=12") #temperatura niveis criticos
cur.execute("update rules set max_value=2300, min_value=1900 where id=13") #pressao niveis altos
cur.execute("update rules set max_value=2325, min_value=1900 where id=14") #pressao niveis muito altos
cur.execute("update rules set max_value=2350, min_value=1900 where id=15") #pressao niveis criticos

con.commit()












