// Require dependencies
var express = require('express');

// Set up Express App and PORT
var app = express();
var PORT = process.env.PORT || 3000;

// Require html and api modules
app.use(require('./app/routing/htmlRoutes.js'));
app.use(require('./app/routing/apiRoutes.js'));

// Start the server to begin listening
app.listen(PORT, function() {
	console.log('Server is ready on port ' + PORT);
});

