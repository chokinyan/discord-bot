"""import requests
from bs4 import BeautifulSoup

url = "https://www.monbureaunumerique.fr/"
rep = requests.get(url)
par = BeautifulSoup(rep.content,'html.parser')
test = par.find(class_='fo-section__title').text"""

def liste(k) :
    L = []
    u = 1
    for i in range(0, k+1) :
        L.append(u)
        u = u/(1+u)
    return(L)

print(liste(15))