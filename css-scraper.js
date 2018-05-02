var scrape = require('website-scraper');
var ucss = require('ucss');
var config = require('./config_ucss.js');
var fs = require('fs');
var path = require('path');

//take the url as first argument
var url = process.argv[2];

//create a 'web-files' to store datas + define depth
var options = {
	urls: [url],
	directory: './web-files',
	recursive: true,
	maxRecursiveDepth: '2'
};

var cssArray;
var htmlArray;

//scrape url
scrape(options).then((result) => {
//select .css files
	fs.readdir('web-files/css', function(err, files) {
		cssArray = files.filter(function(e) {
			return path.extname(e).toLowerCase() === '.css'
		});
		for(var i = 0; i < cssArray.length; i++) {
			cssArray[i]="./web-files/css/"+cssArray[i];
		}
//select .html files
		fs.readdir('web-files', function(err, files) {
			htmlArray = files.filter(function(e) {
				return path.extname(e).toLowerCase() === '.html'
			});
			for(var i = 0; i < htmlArray.length; i++) {
				htmlArray[i]="./web-files/"+htmlArray[i];
			}
//compare css and html using ucss
			var css = cssArray;
			var html = htmlArray;
			var context = {
				timeout: 400
			};
			var logger = null;
			ucss.analyze(html, css, context, logger, function(result) {
				console.log(config.result(result));
//result goes through config_ucss.js to modify output
			});
		});
	});
}).catch((err) => {
	console.log(err);
});
