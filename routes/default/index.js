// Copyright (c) 2017 David Kim
// This program is licensed under the "MIT License".
// Please see the file COPYING in the source
// distribution of this software for license terms.

var express = require('express'),
	app = express(),
  StoryblokClient = require('storyblok-node-client'),
  url = require('url'),
	router = express.Router();

let Storyblok = new StoryblokClient({
  privateToken: 'igKwQp1pAi4cL2r6GU4rZgtt'
})

// get main page
router.get('/', function (req, res) {
  res.render('layouts/landing', {
    LogoURL: "/",
    Logo: "/images/logo.png"
  });
});

// get global page
router.get('/global', function (req, res) {
  res.render('layouts/global');
});

router.get('/main', function (req, res) {
  var path = url.parse(req.url).pathname
  path = path == '/' ? 'home' : path

  Storyblok
    .get(`stories/${path}`, {
      version: req.query._storyblok ? 'draft' : 'published'
    })
    .then((response) => {
      res.render('layouts/landing', {
        story: response.body.story,
        params: req.query,
        LogoURL: "/",
        Logo: "/images/logo.png"
      })
    })
    .catch((error) => {
      console.log(error)
      res.send('A ' + error.statusCode.toString() + ' error ocurred')
    })
});

module.exports = router;
