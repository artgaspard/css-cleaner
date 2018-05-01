var scrape = require('website-scraper');
var ucss = require('ucss');
var config = require('./config_ucss.js');
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

var cssArray;
var htmlArray;

scrape(options).then((result) => {
//select css files
	fs.readdir('web-files/css', function(err, files) {
		cssArray = files.filter(function(e) {
			return path.extname(e).toLowerCase() === '.css'
		});
		for(var i = 0; i < cssArray.length; i++) {
			cssArray[i]="./web-files/css/"+cssArray[i];
		}
//select html files
		fs.readdir('web-files', function(err, files) {
			htmlArray = files.filter(function(e) {
				return path.extname(e).toLowerCase() === '.html'
			});
			for(var i = 0; i < htmlArray.length; i++) {
				htmlArray[i]="./web-files/"+htmlArray[i];
			}
//compare css and html
			var css = cssArray;
			var html = htmlArray;
			var context = {
				timeout: 400
			};
			var logger = null;
			ucss.analyze(html, css, context, logger, function(result) {
				console.log(config.result(result));
			});
		});
	});
}).catch((err) => {
	console.log(err);
});

//var cssFiles;
//var htmlFiles;
//var html;
//var css;
//var context;
//var logger;
/*
Promise.all([scrape(options).then(function(cssFiles) {
	fs.readdirSync('web-files/css', function(err, files) {
		if (err) {
			console.log(err);
			return;
		}
		var cssFiles = files.filter(function(e) {
			return path.extname(e).toLowerCase() === '.css'
		});
console.log('cssFiles = ' + cssFiles);
	})}, errHandler).then(function(htmlFiles) {
	fs.readdirSync('web-files', function(err, files) {
		if (err) {
			console.log(err);
			return;
		}
		var htmlFiles = files.filter(function(e) {
			return path.extname(e).toLowerCase() === '.html'
		});
console.log('htmlFiles = ' + htmlFiles);
	})}, errHandler)]).then(() => {
//console.log('cssFiles 2 = ' + cssFiles);
//console.log('htmlFiles 2 = ' + htmlFiles);

		var css = [cssFiles];
		var html = [htmlFiles];
		var context = {
			timeout: 400
		};
		var logger = null;

		ucss.analyze(html, css, context, logger, function(result) {
		console.log('CSS COMPARISON OK');
		console.log('result = ' + result);
		})
	}, errHandler);
*/
/*
.then((cssFiles) => {
	var css = ["./web-files/css/css.css"];
	var html = ["./web-files/index.html"];
	var context = {
		timeout: 400
	};
	var logger = null;

console.log('cssFiles 2 = ' + cssFiles);
	ucss.analyze(html, css, context, logger, function(result) {
		console.log('CSS COMPARISON OK');
		console.log('result = ' + result);
	});
}, errHandler);
*/
