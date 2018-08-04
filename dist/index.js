"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rp = require("request-promise");
var iGetAuthTokenResult;
var oauthKey = 'oauthKey';
function init(context, account, token, environment) {
    var _context = context;
    function postStore(key, value) {
        return rp({
            uri: 'https://api.spotinst.io/functions/environment/' +
                environment +
                '/userDocument',
            method: 'POST',
            qs: { accountId: account },
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: {
                userDocument: {
                    key: key,
                    value: value,
                },
            },
            json: true,
        });
    }
    return {
        saveOAuthTokens: function saveOAuthTokens(token_obj) {
            return new Promise(function (resolve, reject) {
                iGetAuthTokenResult = {
                    accesstoken: token_obj.access_token,
                    expirytime: token_obj.expiry_time,
                    refreshtoken: token_obj.refresh_token,
                };
                postStore(oauthKey, JSON.stringify(iGetAuthTokenResult)).then(function () {
                    resolve();
                });
            });
        },
        updateOAuthTokens: function updateOAuthTokens(token_obj) {
            return new Promise(function (resolve, reject) {
                iGetAuthTokenResult = {
                    accesstoken: token_obj.access_token,
                    expirytime: token_obj.expiry_time,
                    refreshtoken: token_obj.refresh_token,
                };
                postStore(oauthKey, JSON.stringify(iGetAuthTokenResult)).then(function () {
                    resolve();
                });
            });
        },
        getOAuthTokens: function getOAuthTokens(user_identifier) {
            return new Promise(function (resolve, reject) {
                _context.getDoc(oauthKey, function (err, res) {
                    if (res) {
                        var result = JSON.parse(res);
                        var result_array = [result];
                        resolve(result_array);
                    }
                    reject(err);
                });
            });
        },
    };
}
exports.init = init;
//# sourceMappingURL=index.js.map