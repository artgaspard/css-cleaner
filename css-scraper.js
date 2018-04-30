var scrape = require('website-scraper');
var ucss = require('ucss');
var fs = require('fs');
var path = require('path');

//take the url as first argument
var url = process.argv[2];

//create a 'web-files' directory and store files + define depth
var options = {
	urls: [url],
	directory: './web-files',
	recursive: true,
	maxRecursiveDepth: '1'
};

/*
   var dirPath = path.resolve('./web-files/css'); // path to your directory goes here
   var filesList;
   fs.readdir(dirPath, function(err, files){
   filesList = files.filter(function(e){
   return path.extname(e).toLowerCase() === '.css'
   });
   console.log(filesList);
   });

   var css = [filesList];
   var html = ["./web-files/index.html"];
   var context = {
   timeout: 400
   };
   var logger = null;
   */

var errHandler = function(err) {
	console.log(err);
}

var cssFiles;

/*
//scrape url
scrape(options).then(function() {
		fs.readdir('web-files/css', function(err, files) {
			if (err) {
				console.log('Error reading directory');
				console.log(err);
			return;
			}
			cssFiles = files.filter(function(e){
				return path.extname(e).toLowerCase() === '.css'
			});
			console.log('cssfiles= ' + cssFiles);
		})}).then( function() {

	console.log('cssfiles2= ' + cssFiles);
		var css = ["./web-files/css/css.css"];
		var html = ["./web-files/index.html"];
		var context = {
			timeout: 400
		};
		var logger = null;
	}).then( function() {
		//compare css and html
		ucss.analyze(html, css, context, logger, function(result) {
			console.log('CSS COMPARISON OK');
			console.log(result);
		})
	});

.catch((err) => {
	console.log('Error scraping files');
	console.log(err);
});
*/

scrape(options).then((cssFiles) => {
	fs.readdir('web-files/css', function(err, files) {
		if (err) {
			console.log(err);
			return;
		}
		cssFiles = files.filter(function(e) {
			return path.extname(e).toLowerCase() === '.css'
		})
	console.log(cssFiles);
	});
}, errHandler).then(() => {
	var css = ["./web-files/css/css.css"];
	var html = ["./web-files/index.html"];
	var context = {
		timeout: 400
	};
	var logger = null;

	ucss.analyze(html, css, context, logger, function(result) {
		console.log('CSS COMPARISON OK');
		console.log(result);
	});
}, errHandler);












