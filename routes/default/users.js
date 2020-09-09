// Copyright (c) 2017 David Kim
// This program is licensed under the "MIT License".
// Please see the file COPYING in the source
// distribution of this software for license terms.

var express = require('express');
var router = express.Router();

const timeout = require('connect-timeout');

const credctrl = require('../../controllers/security/ver1/credctrl');
const userctrl = require('../../controllers/default/userctrl');
const configctrl = require('../../controllers/default/configctrl');

let fixvalue = require('../../utils/fixvalue.json');
let msgvalue = require('../../utils/msgvalue.json');

router.get('/', timeout(fixvalue.Server.TIME_OUT), credctrl.checkUserLogin, userctrl.getGotoLoginPage);

router.post('/', async (req, res) => {
	res.status(fixvalue.Code.OK).json(msgvalue.General.PathNotComplete);
});

/* GET Goto register page */
router.get('/daftar', timeout(fixvalue.Server.TIME_OUT), userctrl.getGotoRegisterPage);

/* POST Goto register page */
router.post('/daftar', timeout(fixvalue.Server.TIME_OUT), configctrl.getConfigUser, userctrl.postGotoRegisterPage);

/* GET Goto login page */
router.get('/login', timeout(fixvalue.Server.TIME_OUT), userctrl.getGotoLoginPage);

/* POST Goto login page */
router.post('/login', timeout(fixvalue.Server.TIME_OUT), credctrl.passportAuthenticate, userctrl.postGotoLoginPage);

/* GET Goto logout page */
router.get('/logout', timeout(fixvalue.Server.TIME_OUT), userctrl.getGotoLogoutPage);

module.exports = router;
