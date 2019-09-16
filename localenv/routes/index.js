var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index', function (req, res, next) {
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

module.exports = router;
