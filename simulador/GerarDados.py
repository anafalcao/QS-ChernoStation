import SimuladorDados
import threading
import random

def simular():
  while True:
    um = SimuladorDados.simulador_UM()
    um.main()

n = 2 
for i in range(1,n):
    numero = str(i)

    t = threading.Thread(target=simular,args=())
    t.start()
    t.join()
