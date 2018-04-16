import express from 'express';
import React from 'react';


var sys = require('sys');
var exec = require('child_process').exec;

//If I can import data to a json file and write a python script which load new data automatically, do I need to call the child process?
//If not, I just need to know how to import data to json file
//If yes, I need to know when to start the script(by mode & time)
//If the python script only involve on/off, I need to use express to get time data
//If use different script for different mode, I need to know how to stop another one (May be check json file status to close automatically)

var router=express.Router();
var child;
child = exec("python timerSwitch.py", function (error, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});

module.exports = router;

