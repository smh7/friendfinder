

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
 
      res.render('addinput');

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
    print: compareMatch(userInputObj, friendsData)
  };
  res.render('matches', obj2);

});



app.listen(PORT, function () {
  console.log('App listening on PORT: ' + PORT);
});


function compareMatch(obj1, objCompare) {
  var matchArrOfObj = JSON.parse(JSON.stringify(objCompare))
  let scoresUser = JSON.stringify(obj1[0].scores);
  // Starting with a string set up an Array of Int of user's responses
  let workingScores = (scoresUser).split('');
  let userScoresArr = [];
  for (i = 0; i < workingScores.length; i ++){
    if(parseInt(workingScores[i])) {
      userScoresArr.push(parseInt(workingScores[i]));
    }
  }
// Calculate differences between user input and current data
  let differences = [];
  // loop over 
  for (c = 0; c < objCompare.length; c++){
  let dif = 0;
    for (i = 0; i < 10; i ++){
      dif += Math.abs(userScoresArr[i] - objCompare[c].scores[i]) 
    }
    differences.push(dif);
    matchArrOfObj[c].match = dif;
  };

 return matchArrOfObj.sort(function(obj1, obj2) {
   return obj1.match - obj2.match
 })
}
