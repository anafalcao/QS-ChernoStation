import paho.mqtt.client as mqtt
import time
import json
import random
from datetime import datetime
import sys
import json
import psycopg2


con = psycopg2.connect(database="mcwmotzg", user="mcwmotzg", password="lHaH0VRzaHD0oNAecVdF9vafhldRrE-b", host="motty.db.elephantsql.com", port="5432")
print("Database opened successfully")

cur = con.cursor()

cur.execute("update rules set max_value=2.6, min_value=2 where id=1")
cur.execute("update rules set max_value=2.7, min_value=2 where id=2")
cur.execute("update rules set max_value=2.75, min_value=2 where id=3")
cur.execute("update rules set max_value=3.7, min_value=3 where id=4")
cur.execute("update rules set max_value=3.8, min_value=3 where id=5")
cur.execute("update rules set max_value=3.9, min_value=3 where id=6")
cur.execute("update rules set max_value=0.15, min_value=-0.3 where id=7")
cur.execute("update rules set max_value=0.20, min_value=-0.3 where id=8")
cur.execute("update rules set max_value=0.22, min_value=-0.3 where id=9")
cur.execute("update rules set max_value=400, min_value=300 where id=10")
cur.execute("update rules set max_value=420, min_value=300 where id=11")
cur.execute("update rules set max_value=435, min_value=300 where id=12")
cur.execute("update rules set max_value=2300, min_value=1900 where id=13")
cur.execute("update rules set max_value=2325, min_value=1900 where id=14")
cur.execute("update rules set max_value=2350, min_value=1900 where id=15")

con.commit()












