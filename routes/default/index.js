// Copyright (c) 2017 David Kim
// This program is licensed under the "MIT License".
// Please see the file COPYING in the source
// distribution of this software for license terms.

var express = require('express'),
	app = express(),
	router = express.Router(),
  url = require('url'),
  Storyblok = require('../../utils/storycon').Storyblok

// get clear cache
router.get('/clear_cache', function (req, res) {
  Storyblok.flushCache();
  res.send('Cache flushed!');
});

router.get('/*', function (req, res) {
  var path = url.parse(req.url).pathname
  path = path === '/' ? 'home' : path

  Storyblok
    .get(`stories/${path}`, {
      version: req.query._storyblok ? 'draft' : 'published'
    })
    .then((response) => {
      res.render(`layouts/${path}`, {
        story: response.body.story,
        params: req.query
      })
    })
    .catch((error) => {
      console.log("Status Code -> " + error.statusCode + ", Error -> " + JSON.stringify(error));

      if (error.statusCode === 404) {
        res.render('layouts/notfound');
      } else {
        console.log(error);
        res.send('An ' + error.statusCode.toString() + ' error ocurred. Please take a look at your error log.');
      }
    })
});

// get main page
router.get('/', function (req, res) {
  res.render('layouts/home');
});

// get main page
router.get('/home', function (req, res) {
  res.render('layouts/home');
});

// get global page
router.get('/global', function (req, res) {
  res.render('layouts/global');
});

module.exports = router;
