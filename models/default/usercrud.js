// Copyright (c) 2017 David Kim
// This program is licensed under the "MIT License".
// Please see the file COPYING in the source
// distribution of this software for license terms.

var bcrypt = require('bcryptjs');

let msgvalue = require('../../utils/msgvalue.json');
let fixvalue = require('../../utils/fixvalue.json');
const uuidv4 = require('uuid');

module.exports.SaveRegisterUser =
	function (conn, data, req, res, callback) {
		console.log('------------------------ CRUD Save Register User -----------------------');

		let datasave = {
			"Nama": data.your_name_full,
			"Ponsel": data.cellular_phone,
			"Telpon": data.regular_phone,
			"Email": data.your_email,
			"Password": data.password,
			"RSN": uuidv4()
    }

		try {
			strQuery = "INSERT INTO userdata SET ? ON DUPLICATE KEY UPDATE Notes='" + msgvalue.Database.DuplicateData + "'";
			conn.query(strQuery, datasave, callback);
		}
		catch (err) {
			console.log('SaveRegisterUser Process -> ' + fixvalue.Code.ServiceUnavailable + ' and StatusMessage -> ' + JSON.stringify(err));
			req.flash('msgDBProcess', msgvalue.General.UnknownError);
			res.redirect('/users/register');
		}
	};
