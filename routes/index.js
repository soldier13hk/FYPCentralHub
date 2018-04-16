import express from 'express';
import React from 'react';
var fs = require('fs');
var content=fs.readFileSync('./rawdata.json','utf8');
content=JSON.parse(content);
const testFolder = './public/images';

let router = express.Router();

router.get('/', function(req, res, next) {
    res.send(renderFullPage());
});

router.get('/SecurityCamera', function(req, res, next) {
    res.send(renderFullPage());
});


router.get('/TimerSwitch', function(req, res, next) {
    res.send(renderFullPage());
});

router.get('/dataOfSwitches', function(req, res, next) {
    res.json(content);
});

router.put('/ModeName', function(req, res, next) {
    console.log(req.headers)
    console.log(req.body);
    if(req.body.ModeChoose==0){
        content.modechoose=[1,0,0];
    }
    else {
        content.modechoose[req.body.ModeChoose]=1;
        content.modechoose[(req.body.ModeChoose+1)%3]=0;
        content.modechoose[(req.body.ModeChoose+2)%3]=0;
    }
    fs.writeFileSync('./rawdata.json',JSON.stringify(content),'utf8');
    //console.log(content);
    res.sendStatus(200);
});

router.put('/timingFunction_add', function(req, res, next) {
    content.timedata.push(req.body.timeadded);
    fs.writeFileSync('./rawdata.json',JSON.stringify(content),'utf8');
    res.sendStatus(200);
});

router.put('/settimeslot', function(req, res, next) {
    //console.log(req.body.newtimedata);
    content.timedata=req.body.newtimedata;
    fs.writeFileSync('./rawdata.json',JSON.stringify(content),'utf8');
    res.sendStatus(200);
});

router.put('/ManualChoose', function(req, res, next) {
    if(req.body.MannualChooses){
	content.manualchoose=1;
    }
    else
	content.manualchoose=0;
    fs.writeFileSync('./rawdata.json',JSON.stringify(content),'utf8');
    res.sendStatus(200);
});

router.get('/imagelists', function(req, res, next) {
    content.imagelist.images=fs.readdirSync(testFolder);
    res.json(content.imagelist);//send the array of image file name as json
});

function renderFullPage() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    	<meta charset="utf-8">
    	<title>React Router Redux Express</title>
    	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" integrity="sha384-y3tfxAZXuh4HwSYylfB+J125MxIs6mR5FOHamPBG064zB+AFeWH94NdvaCBm8qnd" crossorigin="anonymous">
    	<link rel="stylesheet" href="../stylesheets/main.css">
    </head>
    <body>
        <div id="reactbody"></div>
       	<script src="../bin/app.bundle.js"></script>
    </body>
    </html>  `
}
export default router;
