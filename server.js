var express = require('express');
var cors = require('cors');
require('dotenv').config();
const bodyparser = require('body-parser');
const multer = require("multer");
var path = require("path");
var app = express();


var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/images/')
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
});

var upload = multer({storage: storage})

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));


app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res)=>{
  console.log(req.file)
  console.log(req.file.filename)
  console.log(req.file.mimetype)
  console.log(req.file.size)
  res.send({
    name: req.file.filename,
    type: req.file.mimetype,
    size: req.file.size})
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
