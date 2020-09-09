/**
 * Created by ignat on 11-Oct-18.
 */

var passport = require('passport');

/* Controller to read all product menu */
let checkUserLogin = async (req, res, next) =>
{
	console.log('------------------------ Check User Login -----------------------');

	if (req.isAuthenticated())
		return next();
	else
		res.redirect('/users/login');
};

/* Controller to Passport Authenticate */
let passportAuthenticate = async (req, res, next) => {
	console.log('------------------------ Passport Authenticate -----------------------');

	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/users/login',
		failureFlash: true
	});

	next();
};

module.exports = {
	checkUserLogin, passportAuthenticate
};
