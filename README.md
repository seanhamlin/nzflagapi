# NZ Flag API

So I wanted to write an application that used the data from the NZ Govt to form my own voting application. It is only currently available in HTML format, so I thought I would fix that. The API is currently a flat JSON file, with as much information as I could extract from the govt.nz website.

## Scrape it

CasperJS is used to scrape the data from the website, luckily the data is fairly semantic on the website, so this was not a challenge.

### Installation of the scraper

First you will need to install PhantomJS, the [2.0 release](http://phantomjs.org/download.html) is preferred. If you are running Mac OSX there is a critical bug that effects this, you will need this [fork](https://github.com/eugene1g/phantomjs/releases) in the mean time. Once you have downloaded the binary, symlink this to <code>/usr/local/bin/phantomjs</code>.

Next is CasperJS, you can git clone this repo

```
git clone https://github.com/n1k0/casperjs.git
git checkout phantomjs-2
```

Then symlink the bin/casperjs script to <code>/usr/local/bin/casperjs</code>.

You can verify this works by running:

```
casperjs --version
phantomjs --version
```

From anywhere (as these should now be on your path).

### Run the scraper

```
casperjs flag-collect.js
```

It takes a while to download the 10,293 flags so be patient. There is a check to no download the flag if a file is already there with the same name.

## Licence

The NZ Govt website content is licenced under a Creative Commons Attribution 3.0 licence, the link back to the main website is https://www.govt.nz/browse/engaging-with-government/the-nz-flag-your-chance-to-decide/gallery/ and also each item in the JSON feed has a permalink to it's flag page on the site as well.
