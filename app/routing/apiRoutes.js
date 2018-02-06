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
router.get('/api/friends', function(req, res) {
	return res.json(userData);
});

router.post('/api/new', function(req, res) {
	console.log('====================================================')

	var newUser = req.body;

	console.log(newUser);

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

			if (totalDif === swap && Math.floor(Math.random() * 2) === 1) {
				index = i;
			}
		}
		

		console.log(userData[i].name + '= ' + totalDif);
	}

	console.log('least totalDif belongs to ' + userData[index].name + ' with ' + swap + ' points');
	console.log('====================================================')
	//userData.push(newUser);
	res.json(newUser);
});

// Export the router
module.exports = router;