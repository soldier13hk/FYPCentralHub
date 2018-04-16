import urllib3
import requests
import json

from datetime import datetime
from bs4 import BeautifulSoup

#Initial current time
currentDay=int(datetime.now().strftime('%d'))
currentMonth=int(datetime.now().strftime('%m'))

#Initial sunset time
http = urllib3.PoolManager()
r=http.request('GET','http://www.hko.gov.hk/contentc.htm')
html = BeautifulSoup(requests.get('http://www.hko.gov.hk/contentc.htm').text)
newSunSetTime=str((html.body.find(id='sunSet').contents)[0])
TurnOn=True
CurrentTurnOn=TurnOn
while True:
    
    data = json.load(open('./rawdata.json','r'))#Need regular check for new change of data from server

    if (currentDay!=int(datetime.now().strftime('%d')))or(currentMonth!=int(datetime.now().strftime('%m'))):
	#Get new sunset time of next day
        r=http.request('GET','http://www.hko.gov.hk/contentc.htm')
        html = BeautifulSoup(requests.get('http://www.hko.gov.hk/contentc.htm').text)
        newSunSetTime=str((html.body.find(id='sunSet').contents)[0])
        currentDay=int(datetime.now().strftime('%d'))
        currentMonth=int(datetime.now().strftime('%m'))
        data["sunSet_time"]=newSunSetTime
        json.dump(data,open("./data.json","w"))#Write new sunset time to json file

    currentTime=str(datetime.now().strftime('%H:%M'))

    if data["modechoose"][0]:#Auto
        if(data["sunSet_time"]>=currentTime):#Check if current time later than sunset!!!!
            print('Match turn on time!')
            TurnOn=True
        else:
            TurnOn=False

    elif data["modechoose"][1]:#Manual
        TurnOn=data["manualchoose"]

    elif data["modechoose"][2]:#Timing function 
        for i in range(0, len(data["timedata"])):
            #print(data["timedata"][i])
            if(data["timedata"][i][0]==currentTime):
                TurnOn=True
                #print("Turn on by timing function")
            if(data["timedata"][i][1]==currentTime):
                TurnOn=False
                #print("Turn off by timing function")

    if CurrentTurnOn!=TurnOn:
        if TurnOn:
#Send turn on signal
            print("Turn On")
        else:
#Send turn off signal
            print("Turn Off")
        CurrentTurnOn=TurnOn

    #if(data["sunSet_time"]==newSunSetTime):
    #   print('Success!')
