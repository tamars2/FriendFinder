var path = require('path');
var express = require('express');

module.exports = function(app) {
	//make /public dir static so that CSS and JS will work
	app.use(express.static(path.join(__dirname, '../public')));
	//route us to the survey.html
	app.get('/survey', function(req, res) {
		res.sendFile(path.join(__dirname, '../public/survey.html'));
	});
	//default use route that gets us back to home.html
	app.use(function(req, res){
    	res.sendFile(path.join(__dirname + '/../public/home.html'));
 	});
}