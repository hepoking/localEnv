var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');
var readline = require('readline');
global.configArr = [];
var app = require('../app.js');

/* properties */
var macroPath = path.join(__dirname, '../', 'macro');
var csvPath = path.join(macroPath, 'conf', 'env.csv');
var macroFilePath = path.join(macroPath, 'login.ttl');

var getFile = function (fname) {
  var stream = fs.createReadStream(fname, "utf8");

  var reader = readline.createInterface({ input: stream });
  reader.on("line", (data) => {
    //    global.configArr.push(data);
  });
  console.log('aaa' + app.prop);
};

var getPropByKey = function (fname, key) {
  var stream = fs.createReadStream(fname, "utf8");
  console.log('test_');
  var reader = readline.createInterface({ input: stream });
  var ret = null;
  reader.on("line", (data) => {
    var dataArr = data.split(',');

    console.log(dataArr[0]);
    console.log(key);
    console.log(dataArr[0] == key);
    if (dataArr[0] == key) {
      ret = dataArr;
    }
  });
  console.log(global.configArr);
  console.log(ret);
  return ret;
};

//getFile(csvPath);

/* GET home page. */
router.get('/', function (req, res, next) {
  getFile(csvPath, 'zakshare');
  res.render('index', { title: 'Express' });
});

router.get('/index', function (req, res, next) {
  getFile(csvPath, 'zakshare');
  res.render('index', { title: 'Express' });
});

/* call bat */
router.get('/callBat', function (req, res, next) {
  var cmd = '"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" --new-window "https://www.google.com/?hl=ja"';
  exec(cmd, function (error, stdout, stderr) {
    // シェル上でコマンドを実行できなかった場合のエラー処理
    if (error !== null) {
      console.log('exec error: ' + error);
      return;
    }

    // シェル上で実行したコマンドの標準出力が stdout に格納されている
    console.log('stdout: ' + stdout);
  });
  res.render('index', { title: 'Express' });
});

/* file読み込みサンプル */
router.get('/fileRead', function (req, res, next) {
  getFile(csvPath);
  res.render('index', { title: 'Express' });
});

/* exec bat */
router.get('/exec', function (req, res, next) {
  var prop = getPropByKey(csvPath, 'zakshare');
  if (prop == null) {
    res.render('index', { title: 'Express' });
    return;
  }

  //  "C:\Program Files (x86)\teraterm\ttpmacro.exe" % macrofile %  %% a %% b %% c %% d %% e
  var cmd = '"C:\Program Files (x86)\teraterm\ttpmacro.exe" ' + macroFilePath + ' ' + prop[0] + ' ' + prop[1] + ' ' + prop[2] + ' ' + prop[3] + ' ' + prop[4];
  exec(cmd, function (error, stdout, stderr) {
    // シェル上でコマンドを実行できなかった場合のエラー処理
    if (error !== null) {
      console.log('exec error: ' + error);
      return;
    }

    // シェル上で実行したコマンドの標準出力が stdout に格納されている
    console.log('stdout: ' + stdout);
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
