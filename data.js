//var fs = require('fs');
//var content=fs.readFileSync('./rawdata.json','utf8');
//content=JSON.parse(content);
//console.log(content);

module.exports.imagelist={
    "images": [

    ]
};
module.exports.timedata=['9:00','11:00','13:00'];
module.exports.modechoose=[true,false,false];
module.exports.manualchoose=true;
module.exports.setmode=function (i) {
    if(i==0)
    {
        module.exports.modechoose=[true,false,false];
    }else {
        module.exports.modechoose[i]=true;
        module.exports.modechoose[(i+1)%3]=false;
        module.exports.modechoose[(i+2)%3]=false;
    }

}
module.exports.getMode=function () {
    return module.exports.modechoose;
}