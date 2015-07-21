var flags = [];
var page = 0;
var id = 0;
var baseURL = 'https://www.govt.nz';
var flagsPerPage = 60;
var fs = require('fs');
var utils = require('utils');
var casper = require('casper').create({
  verbose: true,
  logLevel: 'error',
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
    userAgent: 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.2 Safari/537.36'
  }
});

function getFlags() {
  page++;
  this.echo(this.getTitle() + ' | Page #' + page);
  var flagSelector = '.ga-content-container .flag';
  var flagImg = this.getElementsInfo(flagSelector + ' img'); // an array of object literals
  var flagTitle = this.getElementsInfo(flagSelector + ' .flag-title');
  var flagSubmitter = this.getElementsInfo(flagSelector + ' .flag-submitter');

  // Pull out the data.
  for (var i = 0; i < flagImg.length; i++) {
    id++;
    var src = baseURL + flagImg[i]['attributes']['src'].trim();
    var filename =  src.split('/').pop();
    var alt = flagImg[i]['attributes']['alt'].trim();
    var title = flagTitle[i].text.trim();
    var submitter = flagSubmitter[i].text.trim();
    flags.push({
      'id': id,
      'src': src,
      //'img': 'api/flags/' + filename,
      'alt': alt,
      'title' : title,
      'submitter': submitter
    });

    // Download the flag (optional).
    //if (!fs.exists('api/flags/' + filename)) {
    //  this.download(src, 'api/flags/' + filename);
    //}
  }

  // Recursion.
  var nextLink = ".prev .fa-angle-right";
  if (casper.visible(nextLink)) {
    casper.thenOpen(baseURL + '/browse/engaging-with-government/the-nz-flag-your-chance-to-decide/gallery/' + '?start=' + (page * flagsPerPage));
    casper.then(getFlags);
  } else {
    casper.echo("END")
  }
}

casper.start(baseURL + '/browse/engaging-with-government/the-nz-flag-your-chance-to-decide/gallery/', function () {
  this.echo(this.getTitle());
});

casper.then(getFlags);

casper.run(function () {
  this.echo("Found " + flags.length + " flags");
  var json = JSON.stringify(flags, null, '  ');
  fs.write('api/flags.json', json, 'w');
  this.echo("Log file written");
  this.exit();
});
