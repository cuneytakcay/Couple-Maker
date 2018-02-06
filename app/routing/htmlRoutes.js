// Require dependencies 
var express = require('express');
var path = require('path');

// Create an instance of Router object
var router = express.Router();

// Route to the index.html
router.use(express.static('app/public'));

// Route to the survey.html
router.get('/survey', function(req, res) {
	res.sendFile(path.join(__dirname, '../public/survey.html'));
});

// Export the router
module.exports = router;