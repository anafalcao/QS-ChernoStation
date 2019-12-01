import SimuladorDados
import threading
import random

#Cria um nó virtual para simular uma unidade meteorológica que produzirá os dados
def simular():
  while True:
    um = SimuladorDados.simulador_UM()
    um.main()

n = 2 #Numero de threads/conexões com a cloud, maximo suportado é 30
for i in range(1,n):
    numero = str(i)

    t = threading.Thread(target=simular,args=())
    t.start()
    t.join()





#
# um01 = SimuladorDados.simulador_UM(50, 40, 50, "Cidade Universitaria", "01",1)
# um01.main()