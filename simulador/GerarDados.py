import SimuladorDados
import threading
import random

#Cria um nó virtual para simular uma unidade meteorológica que produzirá os dados
def simular(uranio, xenonio, radioatividade, temperatura, pressao, energiaprod, numero):
    um = SimuladorDados.simulador_UM(uranio, xenonio, radioatividade, temperatura, pressao, energiaprod, numero)
    um.main()


n = 2 #Numero de threads/conexões com a cloud, maximo suportado é 30
for i in range(1,n):

    uranio = round(random.uniform(2.5,2.8), 3)
    xenonio = round(random.uniform(3,4), 3)
    radioatividade = round(random.uniform(-0.25,0.25), 3)
    temperatura = random.randint(300, 450)
    pressao = random.randint(2000,2400)
    energiaprod = round(random.uniform(1,3), 3)
    numero = str(i)

    t = threading.Thread(target=simular,args=(uranio, xenonio, radioatividade, temperatura, pressao, energiaprod, numero))
    t.start()





#
# um01 = SimuladorDados.simulador_UM(50, 40, 50, "Cidade Universitaria", "01",1)
# um01.main()