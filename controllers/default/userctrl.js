/**
 * Created by ignat on 11-Oct-18.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');

let usercrud = require('../../models/default/usercrud');
let msgvalue = require('../../utils/msgvalue.json');
let fixvalue = require('../../utils/fixvalue.json');
let allfunc = require('../../utils/allfunction');

/* Controller get goto login page */
let getGotoLoginPage = async (req, res) =>
{
	console.log('------------------------ Get Goto Login Page -----------------------');

	res.render('user/login');
};

/* Controller post goto login page */
let postGotoLoginPage = async (req, res) => {
	console.log('------------------------ Post Goto Login Page -----------------------');

	res.redirect('/');
};

/* Controller get goto register page */
let getGotoRegisterPage = async (req, res) => {
	console.log('------------------------ Get Goto Register Page -----------------------');

	res.render('user/daftar');
};

/* Controller post goto register page */
let postGotoRegisterPage = async (req, res) => {
	console.log('------------------------ Post Goto Register Page -----------------------');
	console.log(req.body);

	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(req.body.password, salt, function (err, hash) {
			req.body.password = hash;
			console.log(req.body);

			req.getConnection(function (err, conn) {
				if (res.headersSent) return;

				if (err) {
					console.log('Database Connection -> ' + fixvalue.Code.ServiceUnavailable + ' and StatusMessage -> ' + JSON.stringify(err));
					req.flash('msgDBConnect', msgvalue.General.UnknownError);
					res.redirect('/users/daftar');
				}
				else {
					usercrud.SaveRegisterUser(conn, req.body, req, res, function (err, results) {
						if (err) {
							console.log('Database Process -> ' + fixvalue.Code.ServiceUnavailable + ' and StatusMessage -> ' + JSON.stringify(err));
							req.flash('msgDBProcess', msgvalue.General.UnknownError);
							res.redirect('/users/daftar');
						}
						else {
							console.log('Database Result -> ' + fixvalue.Code.OK + ' and StatusMessage -> ' + JSON.stringify(results));

							if (results.affectedRows === 1 && results.insertId !== 0) {
								req.flash('msgDBProcess', msgvalue.User.RegistrationSuccess);
								res.redirect('/users/login');
							}
							else {
								req.flash('msgDBProcess', msgvalue.User.UserAlreadyExist);
								res.redirect('/users/daftar');
							}
						}
					});
				}
			});
		});
	});

/*
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		res.render('user/register', {
			errors: errors
		});
	} else {
		var newUser = new User({
			name: name,
			email: email,
			username: username,
			password: password
		});

		usercrud.createUser(newUser, function (err, user) {
			if (err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
*/
};

/* Controller goto logout page */
let getGotoLogoutPage = async (req, res) => {
	console.log('------------------------ Goto Logout Page -----------------------');

	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/users/login');
};

passport.use(new LocalStrategy(
	function (username, password, done) {
		User.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, {
					message: 'Unknown User'
				});
			}

			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				}
				else {
					return done(null, false, {
						message: 'Invalid password'
					});
				}
			});
		});
	}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});

module.exports = {
	getGotoLoginPage, postGotoLoginPage, getGotoRegisterPage,
	postGotoRegisterPage, getGotoLogoutPage
};
