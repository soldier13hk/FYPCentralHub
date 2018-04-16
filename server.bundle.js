/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _react = __webpack_require__(9);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = __webpack_require__(8);
var content = fs.readFileSync('./rawdata.json', 'utf8');
content = JSON.parse(content);
var testFolder = './public/images';

var router = _express2.default.Router();

router.get('/', function (req, res, next) {
    res.send(renderFullPage());
});

router.get('/SecurityCamera', function (req, res, next) {
    res.send(renderFullPage());
});

router.get('/TimerSwitch', function (req, res, next) {
    res.send(renderFullPage());
});

router.get('/dataOfSwitches', function (req, res, next) {
    res.json(content);
});

router.put('/ModeName', function (req, res, next) {
    console.log(req.headers);
    console.log(req.body);
    if (req.body.ModeChoose == 0) {
        content.modechoose = [1, 0, 0];
    } else {
        content.modechoose[req.body.ModeChoose] = 1;
        content.modechoose[(req.body.ModeChoose + 1) % 3] = 0;
        content.modechoose[(req.body.ModeChoose + 2) % 3] = 0;
    }
    fs.writeFileSync('./rawdata.json', JSON.stringify(content), 'utf8');
    //console.log(content);
    res.sendStatus(200);
});

router.put('/timingFunction_add', function (req, res, next) {
    content.timedata.push(req.body.timeadded);
    fs.writeFileSync('./rawdata.json', JSON.stringify(content), 'utf8');
    res.sendStatus(200);
});

router.put('/settimeslot', function (req, res, next) {
    //console.log(req.body.newtimedata);
    content.timedata = req.body.newtimedata;
    fs.writeFileSync('./rawdata.json', JSON.stringify(content), 'utf8');
    res.sendStatus(200);
});

router.put('/ManualChoose', function (req, res, next) {
    if (req.body.MannualChooses) {
        content.manualchoose = 1;
    } else content.manualchoose = 0;
    fs.writeFileSync('./rawdata.json', JSON.stringify(content), 'utf8');
    res.sendStatus(200);
});

router.get('/imagelists', function (req, res, next) {
    content.imagelist.images = fs.readdirSync(testFolder);
    res.json(content.imagelist); //send the array of image file name as json
});

function renderFullPage() {
    return '\n    <!DOCTYPE html>\n    <html lang="en">\n    <head>\n    \t<meta charset="utf-8">\n    \t<title>React Router Redux Express</title>\n    \t<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" integrity="sha384-y3tfxAZXuh4HwSYylfB+J125MxIs6mR5FOHamPBG064zB+AFeWH94NdvaCBm8qnd" crossorigin="anonymous">\n    \t<link rel="stylesheet" href="../stylesheets/main.css">\n    </head>\n    <body>\n        <div id="reactbody"></div>\n       \t<script src="../bin/app.bundle.js"></script>\n    </body>\n    </html>  ';
}
exports.default = router;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("consolidate");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import childprogram from './routes/childprogram';

var path = __webpack_require__(5);
var favicon = __webpack_require__(6);
var logger = __webpack_require__(4); //used to display something at log console
var bodyParser = __webpack_require__(2);
var cons = __webpack_require__(3);
//var exec = require('child_process').exec;
var app = (0, _express2.default)();

app.use(function (req, res, next) {
    var auth;
    //console.log(req.headers)//Need this to check why the accept in header doesn't change
    if (req.headers.authorization) {
        auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');
    }

    if (!auth || auth[0] !== 'user' || auth[1] !== '123456') {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="UserName"');
        res.end('Unauthorized');
    } else {
        next();
    }
});

//need this to handle the post request
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// view engine setup
app.engine('html', cons.swig);
app.set('views', './views');
app.set('view engine', 'html');

app.use('/bin', _express2.default.static('./bin'));
app.use('/stylesheets', _express2.default.static('./public/stylesheets'));
app.use('/', _index2.default);
//app.use('/timerSwitch', timerSwitches);
//app.use('/securityCamera', securityCamera);
//app.use('/childprogram', childprogram);
/*var child;
child = exec("python timerSwitch.py", function (error, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});*/

app.use(_express2.default.static(path.join(__dirname, 'public')));
app.use(_express2.default.static(path.join('public/images')));

app.listen(3000, function () {
    console.log('Hello World listening on port 3000!');
});
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })
/******/ ]);