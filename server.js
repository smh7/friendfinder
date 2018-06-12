//Dependencies:
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const fs = require('fs');
var friendsData = require("./app/data/friends.js");

var app = express();
var PORT = process.env.PORT || 3000;

// Config
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.')
    }
  });

  next();
});

app.get('/', function (req, res) {
 
      res.render('add');

    });

// Added code for form testing this is the simplified form
app.get('/form', function (req, res) {

  res.render('addinput');

});
  var sampleInput = {
    "name": "Ahmed",
    "photo": "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAq7AAAAJDAwYzI4NTQ4LWYwZWUtNGFkYS1hNTYwLTZjYzkwY2ViZDA3OA.jpg",
    "scores": ["5", "1", "4", "4", "5", "1", "2", "5", "4", "1"]
  };
app.get('/test', function (req, res) {
  obj = {
    print: friendsData
  };
  // res.json(obj);
  res.render('matches', obj)

});



app.post('/matchup', function (req, res) {
  var userInputObj = [{
    "name": req.body.name,
    "photo": req.body.photo,
    "scores": [req.body.q1, 
              req.body.q2, 
              req.body.q3, 
              req.body.q4, 
              req.body.q5, 
              req.body.q6, 
              req.body.q7,
              req.body.q8,
              req.body.q9,
              req.body.q10]
  }];
  obj2 = {
    print2: req.body
  };
  res.send(userInputObj);
  // res.render('matches', obj)

});

app.get('/test2', function (req, res) {
  // obj = {
  //   print: friendsData
  // };
  // res.json(obj);
  // res.json(sampleInput);
  res.render('testmatch', sampleInput);

});




app.listen(PORT, function () {
  console.log('App listening on PORT: ' + PORT);
});

