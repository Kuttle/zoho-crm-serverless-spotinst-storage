"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rp = require("request-promise");
var oauthKey = 'oauthKey';
function init(context, account, token, environment) {
    var _context = context;
    function postStore(key, value) {
        var payload = {
            uri: "https://api.spotinst.io/functions/environment/" + environment + "/userDocument",
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
        };
        console.log('POST payload...');
        console.log(JSON.stringify(payload));
        return rp(payload);
    }
    function putStore(key, value) {
        var payload = {
            uri: "https://api.spotinst.io/functions/environment/" + environment + "/userDocument/" + key,
            method: 'PUT',
            qs: {
                accountId: account,
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: {
                userDocument: {
                    value: value,
                },
            },
            json: true,
        };
        console.log('PUT payload...');
        console.log(JSON.stringify(payload));
        return rp(payload);
    }
    var returnObj = {
        saveOAuthTokens: function saveOAuthTokens(token_obj) {
            console.log("saveOAuthTokens: token_obj:" + JSON.stringify(token_obj));
            return new Promise(function (resolve, reject) {
                var iGetAuthTokenResult = {
                    accesstoken: token_obj.access_token,
                    expirytime: token_obj.expiry_time,
                    refreshtoken: token_obj.refresh_token,
                };
                console.log("saveOAuthTokens: iGetAuthTokenResult:" + JSON.stringify(iGetAuthTokenResult));
                postStore(oauthKey, JSON.stringify(iGetAuthTokenResult)).then(function () {
                    resolve();
                });
            });
        },
        updateOAuthTokens: function updateOAuthTokens(token_obj) {
            console.log("updateOAuthTokens: token_obj:" + JSON.stringify(token_obj));
            return new Promise(function (resolve, reject) {
                returnObj
                    .getOAuthTokens('')
                    .then(function (_a) {
                    var storedAuth = _a[0];
                    console.log("updateOAuthTokens: storedAuth:" + JSON.stringify(storedAuth));
                    storedAuth.expirytime = token_obj.expiry_time;
                    storedAuth.accesstoken = token_obj.access_token;
                    console.log("updateOAuthTokens: storedAuthCombined:" + JSON.stringify(storedAuth));
                    return putStore(oauthKey, JSON.stringify(storedAuth)).then(function () {
                        return resolve();
                    });
                });
            });
        },
        getOAuthTokens: function getOAuthTokens(user_identifier) {
            return new Promise(function (resolve, reject) {
                console.log("getOAuthTokens...");
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
    console.log("about to print init: " + JSON.stringify(returnObj));
    return returnObj;
}
exports.init = init;
//# sourceMappingURL=index.js.map