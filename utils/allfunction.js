/**
 * Created by ignat on 05-Jan-17.
 */

let fixvalue = require('./fixvalue.json');
let msgvalue = require('./msgvalue.json');

let strRspID = fixvalue.Code;
let strDBID = fixvalue.Database;
let strJSON;

module.exports =
{
  SQLFailed: function () {
    strJSON = { "StatusRsp": { "Code": strRspID.Fail, "Msg": msgvalue.General.SQLFailed } };
    return strJSON;
  },
  MerchantsBrandsFailed: function () {
    strJSON = { "StatusRsp": { "Code": strRspID.Fail, "Msg": msgvalue.MerchantsBrands.Failed } };
    return strJSON;
  },
  MerchantsBrandsEmpty: function () {
    strJSON = { "StatusRsp": { "Code": fixvalue.Database.Empty, "Msg": msgvalue.MerchantsBrands.Empty } };
    return strJSON;
  },
  MerchantsBrandsSuccess: function (results) {
    strJSON = { "StatusRsp": { "Code": strRspID.Success, "Msg": msgvalue.MerchantsBrands.Success }, "MerchantBrandsRsp": results };
    return strJSON;
  },
  BasicAuthFailed: function () {
    strJSON = { "ErrorCode": strRspID.Failed, "ErrorDescription": msgvalue.General.BasicAuth };
    return strJSON;
  },
  TokenOTPSuccess: function () {
    strJSON = { "ErrorCode": strRspID.Success, "ErrorDescription": msgvalue.SetOTP.TokenOTP };
    return strJSON;
  },
  TokenOTPNotSuccess: function (state, result) {
    if (state === 0)
      strJSON = { "ErrorCode": result.code, "ErrorDescription": result.message };
    else
    if(state === 1)
      strJSON = { "ErrorCode": result.response.message.status, "ErrorDescription": result.response.message.text };

    return strJSON;
  },
  GatewayFailed: function (err) {
    strJSON = { "ErrorCode": strRspID.Failed, "ErrorDescription": err };
    return strJSON;
  },
  ValidOTP: function () {
    strJSON = { "ErrorCode": strRspID.Success, "ErrorDescription": msgvalue.SetOTP.ValidOTP };
    return strJSON;
  },
  InvalidOTP: function () {
    strJSON = { "ErrorCode": strRspID.Failed, "ErrorDescription": msgvalue.SetOTP.InvalidOTP };
    return strJSON;
  },
  InvalidReq: function () {
    strJSON = { "ErrorCode": fixvalue.Database.Empty, "ErrorDescription": msgvalue.General.InvalidReq };
    return strJSON;
  },
  InvalidReqOTP: function () {
    strJSON = { "ErrorCode": strRspID.Failed, "ErrorDescription": msgvalue.General.InvalidReqOTP };
    return strJSON;
  },
  DatabaseProcessFailed: function () {
    strJSON = { "a:FaultCode": strRspID.Failed, "a:FaultDescription": msgvalue.General.UnknownError };
    return strJSON;
  },
  BodyEmpty: function () {
    strJSON = { "a:FaultCode": strRspID.Failed, "a:FaultDescription": msgvalue.General.BodyEmpty };
    return strJSON;
  },
  UserPOSEmpty: function () {
    strJSON = { "a:FaultCode": strRspID.Failed, "a:FaultDescription": msgvalue.UserPOS.Empty };
    return strJSON;
  },
  UserPOSStrillLogin: function () {
    strJSON = { "a:FaultCode": strRspID.Failed, "a:FaultDescription": msgvalue.UserPOS.StillLogin };
    return strJSON;
  },
  MerchantEmpty: function () {
    strJSON = { "a:FaultCode": strRspID.Failed, "a:FaultDescription": msgvalue.MerchantPOS.Empty };
    return strJSON;
  },
  DeviceNotAuth: function () {
    strJSON = { "a:FaultCode": strRspID.Failed, "a:FaultDescription": msgvalue.DevicesPOS.NotAuth };
    return strJSON;
  },
  DeviceNotFound: function () {
    strJSON = { "a:FaultCode": fixvalue.Database.Empty, "a:FaultDescription": msgvalue.DevicesPOS.NotFound };
    return strJSON;
  },
  APISoapFailed: function () {
    strJSON = { "a:FaultCode": strRspID.Failed, "a:FaultDescription": msgvalue.General.UnknownError };
    return strJSON;
  },
  LogoutSuccess: function () {
    strJSON = { "a:FaultCode": strRspID.Success, "a:FaultDescription": "" };
    return strJSON;
  },
  DatabaseQueryFailed: function () {
    strJSON = { "a:FaultCode": fixvalue.Database.Query, "a:FaultDescription": msgvalue.General.UnknownError };
    return strJSON;
  },
  SettlementSuccess: function () {
    strJSON = { "a:FaultCode": strRspID.Success, "a:FaultDescription": msgvalue.SettlementPOS.Success };
    return strJSON;
  },
  AlreadySettlement: function () {
    strJSON = { "a:FaultCode": strRspID.Failed, "a:FaultDescription": msgvalue.SettlementPOS.Already };
    return strJSON;
  },
  SettlementFailed: function () {
    strJSON = { "a:FaultCode": strRspID.Failed, "a:FaultDescription": msgvalue.SettlementPOS.Failed };
    return strJSON;
  },
  TransactionEmpty: function () {
    strJSON = { "a:FaultCode": strRspID.Failed, "a:FaultDescription": msgvalue.TransactionPOS.Empty };
    return strJSON;
  },
  MemberNotFound: function () {
    strJSON = { "a:FaultCode": strRspID.Failed, "a:FaultDescription": msgvalue.TransactionPOS.Member };
    return strJSON;
  },
  PosNotFound: function () {
    strJSON = { "a:FaultCode": strRspID.Failed, "a:FaultDescription": msgvalue.TransactionPOS.Pos };
    return strJSON;
  },
  MerchantsBrandsFailed2: function () {
    strJSON = { "a:FaultCode": strRspID.Failed, "a:FaultDescription": msgvalue.MerchantsBrands.Failed };
    return strJSON;
  },
  SQLFailed2: function () {
    strJSON = { "a:FaultCode": strRspID.Failed, "a:FaultDescription": msgvalue.General.SQLFailed };
    return strJSON;
  },
  MerchantsBrandsEmpty2: function () {
    strJSON = { "a:FaultCode": fixvalue.Database.Empty, "a:FaultDescription": msgvalue.MerchantsBrands.Empty };
    return strJSON;
  },
  MerchantsBrandsSuccess2: function (results) {
    strJSON = { "a:FaultCode": strRspID.Success, "a:FaultDescription": "", "AvalueList": results };
    return strJSON;
  },
  TransactionListFailed: function () {
    strJSON = { "a:FaultCode": strRspID.Failed, "a:FaultDescription": msgvalue.TransactionPOS.Failed };
    return strJSON;
  },
  TransactionListSuccess: function () {
    strJSON = { "a:FaultCode": strRspID.Success, "a:FaultDescription": msgvalue.TransactionPOS.Success };
    return strJSON;
  },
  FileSurveyNotFound: function () {
    strJSON = { "a:FaultCode": strRspID.Failed, "a:FaultDescription": null, "Information": msgvalue.UploadFile.FileNotFound };
    return strJSON;
  },
  UploadFileFailed: function (filephoto) {
    strJSON = { "a:FaultCode": strRspID.Failed, "a:FaultDescription": null, "Information":  filephoto + " -> " + msgvalue.UploadFile.Failed };
    return strJSON;
  },
  UploadFileSuccess: function (filephoto) {
    strJSON = { "a:FaultCode": strRspID.Success, "a:FaultDescription": null, "Information":  filephoto + " -> " + msgvalue.UploadFile.Success };
    return strJSON;
  },
  MaksTransExceed: function () {
    strJSON = { "ErrorCode": strRspID.Failed, "ErrorDescription": msgvalue.TransactionPOS.MaksTransExceed };
    return strJSON;
  },
  ResourceIDEmpty: function () {
    strJSON = { "a:FaultCode": strRspID.Failed, "a:FaultDescription": msgvalue.General.ResourceIDEmpty };
    return strJSON;
  },
  ImageNotFound: function (err) {
    strJSON = { "a:FaultCode": strRspID.Failed, "a:FaultDescription": err };
    return strJSON;
  },
  AllMobileKey: function () {
    strJSON = {
      "ErrorCode": strRspID.Success, "RspMobile": {
        "aaaa": fixvalue.RspMobile.aaaa,
        "bbbb": fixvalue.RspMobile.bbbb,
        "cccc": fixvalue.RspMobile.cccc,
        "dddd": fixvalue.RspMobile.dddd
      }
    };
    return strJSON;
  },
  LoginWrapper: function (result) {
    strJSON = {
      "ErrorCode": result.ErrorCode, "ErrorDescription": result.ErrorDescription, "Token": result.Data.Authorization.Token,
      "ResourceID": result.Data.Authorization.ResourceID };
    return strJSON;
  },
  DataNotFound: function () {
    strJSON = { "ErrorCode": strRspID.Failed, "ErrorDescription": msgvalue.TransactionPOS.Pos };
    return strJSON;
  },
  DuplicateTransaction: function () {
    strJSON = { "ErrorCode": strRspID.Failed, "ErrorDescription": msgvalue.ShopeePayment.Duplicate };
    return strJSON;
  },
  SQLError: function () {
    strJSON = { "ErrorCode": strRspID.Failed, "ErrorDescription": msgvalue.General.SQLFailed };
    return strJSON;
  },
  DataProcessInvalid: function () {
    strJSON = { "ErrorCode": strRspID.Failed, "ErrorDescription": msgvalue.General.DataNotValid };
    return strJSON;
  },
  VoucherWithOfferSuccess: function (result) {
    strJSON = { "ErrorCode": strRspID.Success, "ErrorDescription": "", "Data": result };
    return strJSON;
  },
  VoucherWithOfferFailed: function (result) {
    strJSON = { "ErrorCode": strRspID.Failed, "ErrorDescription": result };
    return strJSON;
  },
  UseVoucherNotFound: function () {
    strJSON = { "ErrorCode": strRspID.Failed, "ErrorDescription": msgvalue.Database.NotFound };
    return strJSON;
  },
  UseVoucherSuccess: function (results) {
    strJSON = { "ErrorCode": strRspID.Success, "ErrorDescription": "", "UseVoucher": results };
    return strJSON;
  },
  MerchantsProductSuccess: function (results) {
    strJSON = {
      "ErrorCode": strRspID.Success, "ErrorDescription": "", "Data": {"Items": results } };
    return strJSON;
  },
  MerchantsProductEmpty: function () {
    strJSON = { "ErrorCode": fixvalue.Database.Empty, "ErrorDescription": msgvalue.MerchantsBrands.Empty };
    return strJSON;
  },
  InternalServerError: function () {
    strJSON = { "ErrorCode": strRspID.Failed, "ErrorDescription": msgvalue.General.InternalServerError };
    return strJSON;
  },
  BadRequestError: function () {
    strJSON = { "ErrorCode": strRspID.Failed, "ErrorDescription": msgvalue.General.BadRequestError };
    return strJSON;
  },
  ParamDataFailed: function () {
    strJSON = { "ErrorCode": strRspID.Failed, "ErrorDescription": msgvalue.Database.msgError };
    return strJSON;
  },
  ParamDataEmpty: function () {
    strJSON = { "ErrorCode": strRspID.Failed, "ErrorDescription": msgvalue.Database.NotFound };
    return strJSON;
  },
  DBFailed: function () {
    strJSON = { "ErrorCode": strDBID.Query, "ErrorDescription": msgvalue.Database.msgError };
    return strJSON;
  },
  TransactionNotFound: function () {
    strJSON = { "ErrorCode": strRspID.Failed, "ErrorDescription": msgvalue.TransactionPOS.Empty };
    return strJSON;
  }
};
