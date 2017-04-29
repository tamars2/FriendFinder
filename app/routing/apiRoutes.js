var path = require('path');
//give us visibility to the data contained in friends.js
var friendsList = require('../data/friends.js');

module.exports = function(app) {
	//show the friends list when the api link is clicked
	app.get('/api/friends', function(req,res) {
		res.json(friendsList);		
	});
	//when the POST is called, calculate the difference in opinions
	//from the user and the friends list
	//then return the most compatible friend to the survey.html modal
	app.post('/api/friends', function(req,res) {
		var totalDifference;
		var lowestDifference = 99999;
		var bestFriend;
		// //loop thru the friends list
		for (var i = 0; i < friendsList.length; i++) {
			totalDifference = 0;
			//loop thru the user results and the current friendList index results
			for (var j = 0; j < 10; j++) {
				totalDifference = totalDifference + Math.abs(parseInt(friendsList[i].results[j]) - parseInt(req.body.results[j]));
			}
			//calculate difference in opinion from friend in database vs user input
			if  (totalDifference < lowestDifference) {
				lowestDifference = totalDifference;
				bestFriend = i;
			}
		}
		//response (json format) back to the survey.html modal
		res.json({name: friendsList[bestFriend].name, photo: friendsList[bestFriend].photo});
	});
}