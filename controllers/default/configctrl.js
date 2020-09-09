/**
 * Created by ignat on 11-Oct-18.
 */

let fixvalue = require('../../utils/fixvalue.json');
let allfunc = require('../../utils/allfunction');
let configmodel = require('../../models/default/configcrud');
let msgvalue = require('../../utils/msgvalue.json');

/* Controller get user configuration pos from tabel */
let getConfigUser = async (req, res, next) => {
  console.log('------------------------ Get Configuration User -----------------------');
  console.log(req.body);

  req.getConnection(function (err, conn) {
    if (res.headersSent) return;

    if (err) {
      console.log('Database Connection -> ' + fixvalue.Code.ServiceUnavailable + ' and StatusMessage -> ' + JSON.stringify(err));
      req.flash('msgDBConnect', msgvalue.General.UnknownError);
      res.redirect('/users/register');
    }
    else {
      configmodel.ConfigUser(conn, req, res, function (err, results) {

        if (err) {
          console.log('Database Process -> ' + fixvalue.Code.ServiceUnavailable + ' and StatusMessage -> ' + JSON.stringify(err));
          req.flash('msgDBProcess', msgvalue.General.UnknownError);
          res.redirect('/users/register');
        }
        else {
          if (results.length === 0) {
            console.log('Database Process -> ' + fixvalue.Database.Empty + ' and StatusMessage -> ' + msgvalue.Database.NotFound);
            res.status(fixvalue.Code.OK).send(allfunc.SurveyParamFailed());
          }
          else {
            console.log('Database Result -> ' + fixvalue.Code.OK + ' and StatusMessage -> ' + JSON.stringify(results));
            req["Config"] = results;
            next();
          }
        }
      });
    }
  });
};

module.exports = {
  getConfigUser
};
