// Require dependencies 
var express = require('express');
var bodyParser = require('body-parser');
var userData = require('../data/users');

// Create an instance of Router object
var router = express.Router();

// Handle data parsing
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Route to the API List
router.get('/api/users', function(req, res) {
	res.json(userData);
});

// Handling incoming survey results and using them 
// for the compatibility logic.
router.post('/api/users', function(req, res) {
	var newUser = req.body;

	var swap = 100;
	var index = 0;
	
	for (var i = 0; i < userData.length; i++) {
		var totalDif = 0;
		for (var j = 0; j < 10; j++) {
			totalDif += Math.abs(userData[i]['scores'][j] - newUser['scores'][j]); 
		}

		if (userData[i]['genPref'] !== newUser['genPref']) {
			if (totalDif < swap) {
				swap = totalDif;
				index = i;
			}
			// Random selection between two equal matches occurs
			if (totalDif === swap && Math.floor(Math.random() * 2) === 1) {
				index = i;
			}
		}

		// console.log(userData[i].name + '= ' + totalDif);
	}

	// console.log('least totalDif belongs to ' + userData[index].name + ' with ' + swap + ' points');

	userData.push(newUser);
	res.json(userData[index]);
});

// Export the router
module.exports = router;

























