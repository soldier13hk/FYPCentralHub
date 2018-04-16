import urllib3
import requests
import json
from pprint import pprint

data = json.load(open('data.json','r'))

from bs4 import BeautifulSoup
http = urllib3.PoolManager()
r=http.request('GET','http://www.hko.gov.hk/contentc.htm')

#html=BeautifulSoup(r.data)
html = BeautifulSoup(requests.get('http://www.hko.gov.hk/contentc.htm').text)

#print(html.body.find(id='sunSet'))

print(html.body.find(id='sunSet').contents)
temp=str((html.body.find(id='sunSet').contents)[0])
print(type(temp))
print(temp)

data["sunSet_time"]=temp

json.dump(data,open("./data.json","w"))

if(data["sunSet_time"]==temp):
    print('Success!')




#print(html.body.find(id='sunRise'))
#print(html.body.find(id='sunRise').contents)
#print(html.body.find(html.body.find_all("tr")))

#pprint(data)
#print(data)

#print(data["sunSet_time"])
#sunSetTag=html.body.find(id='sunSet')
#sunRiseTag=html.body.find(id='sunRise')
#sunRiseTag=html.body.find_all("tr")
#sunSet=[]
#sunRise=[]

#for x in sunSetTag:
#	sunSet.append(str(x))
#
#for y in sunRiseTag:
#	sunRise.append(str(y))
