var friendsData = require("./app/data/friends.js");

const sampleArrayInput = [{
  "name": "Ahmed",
  "photo": "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAq7AAAAJDAwYzI4NTQ4LWYwZWUtNGFkYS1hNTYwLTZjYzkwY2ViZDA3OA.jpg",
  "scores": "[ '6', '1', '2', '3', '4', '5', '6', '7', '8', '9' ]"
}];



function compareMatch(obj1, objCompare) {
  var matchArrOfObj = JSON.parse(JSON.stringify(objCompare))
  let scoresUser = JSON.stringify(obj1.scores);
  console.log(sampleArrayInput[0].scores, typeof sampleArrayInput[0].scores);
  // Starting with a string set up an Array of Int of user's responses
  let workingScores = (sampleArrayInput[0].scores).split('');
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


module.exports = compareMatch;
 console.log(compareMatch(sampleArrayInput, friendsData));