/**
 * Created by ignat on 03-Jan-19.
 */

let fixvalue = require('../../utils/fixvalue.json');
let msgvalue = require('../../utils/msgvalue.json');

module.exports.ConfigUser =
function (conn, req, res, callback)
{
  console.log('------------------------ CRUD Configuration User -----------------------');

  try {
    strQuery = 'SELECT paramsID FROM configuration a WHERE a.ConfigName IN ("User")';

    conn.query(strQuery, function (err, results) {
      if (err) {
        console.log('Database Process -> ' + fixvalue.Code.ServiceUnavailable + ' and StatusMessage -> ' + JSON.stringify(err));
        req.flash('msgDBProcess', msgvalue.General.UnknownError);
        res.redirect('/users/register');
      }
      else {
        if (results.length === 0) {
          console.log('Database Process -> ' + fixvalue.Code.ServiceUnavailable + ' and StatusMessage -> ' + JSON.stringify(results));
          req.flash('msgDBProcess', msgvalue.General.UnknownError);
          res.redirect('/users/register');
        }
        else {
          strQuery = 'SELECT id, ParamName, ParamValue FROM parameter WHERE id IN (' + results[0]["paramsID"] + ');';
          conn.query(strQuery, callback);
        }
      }
    });
  }
  catch (err) {
    console.log('ConfigUser Process -> ' + fixvalue.Code.ServiceUnavailable + ' and StatusMessage -> ' + JSON.stringify(err));
    req.flash('msgDBProcess', msgvalue.General.UnknownError);
    res.redirect('/users/register');
  }
};
