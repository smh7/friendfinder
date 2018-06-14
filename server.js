// Test Data
var sampleInput = {
  "name": "Ahmed",
  "photo": "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAq7AAAAJDAwYzI4NTQ4LWYwZWUtNGFkYS1hNTYwLTZjYzkwY2ViZDA3OA.jpg",
  "scores": ["5", "1", "4", "4", "5", "1", "2", "5", "4", "1"]
};

const sampleArrayInput = [{
  "name": "Ahmed",
  "photo": "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAq7AAAAJDAwYzI4NTQ4LWYwZWUtNGFkYS1hNTYwLTZjYzkwY2ViZDA3OA.jpg",
  "scores": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
}];


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
    print: compareMatch(userInputObj, friendsData)
  };
  console.dir(userInputObj);
  // compareMatch(userInputObj, friendsData);
  // need to figure out how to push the results into the data file without messing with the match process
  // res.send(compareMatch(userInputObj, friendsData));
  res.render('matches', obj2);

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


function compareMatch(obj1, objCompare) {
  var matchArrOfObj = JSON.parse(JSON.stringify(objCompare))
  let scoresUser = JSON.stringify(obj1[0].scores);
  console.log(scoresUser, typeof obj1[0].score);
  // Starting with a string set up an Array of Int of user's responses
  let workingScores = (scoresUser).split('');
  let userScoresArr = [];
  for (i = 0; i < workingScores.length; i ++){
    if(parseInt(workingScores[i])) {
      userScoresArr.push(parseInt(workingScores[i]));
    }
    console.log(userScoresArr);
  }

  // console.log(workingScores, typeof workingScores);

  let differences = [];
  // console.log("scoresUserArr is ", userScoresArr, typeof scoresUser)
  console.log("objCompare.length is ", objCompare.length)
  // loop over 
  for (c = 0; c < objCompare.length; c++){
  let dif = 0;

    for (i = 0; i < 10; i ++){

      dif += Math.abs(userScoresArr[i] - objCompare[c].scores[i]) 
    console.log("iteration", c, "counter i is ", i,"dif", dif, differences);
      
      // console.log("i is ", i, " c is ", c)
      // console.log("dif is ", dif)
      // console.log(`obj1[0].scores`, obj1[0].scores)
      // console.log(`scoresUser${i}`,scoresUser[i], typeof scoresUser[i])
      // console.log(`objCompare${c}.scores${i}`, objCompare[c].scores[i])
    }
    differences.push(dif);
    matchArrOfObj[c].match = dif;
    // console.log("scores to compare", objCompare[c].scores)
    // console.log("  ")
  };

//  console.log(`macthArrOfObj`, matchArrOfObj)
//  console.log("sorted");
 return matchArrOfObj.sort(function(obj1, obj2) {
   return obj1.match - obj2.match
 })

    // console.log(matchArrOfObj.sort(compareValues('match', 'asc')))
  //  return matchArrOfObj.sort(compareValues('match', 'asc'));
  
}
