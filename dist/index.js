"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var iGetAuthTokenResult;
function saveOAuthTokens(token_obj) {
    return new Promise(function (resolve, reject) {
        //iGetAuthTokenResult = accessTokenHack(token_obj);
        iGetAuthTokenResult = {
            accesstoken: token_obj.access_token,
            expirytime: token_obj.expiry_time,
            refreshtoken: token_obj.refresh_token,
        };
        resolve();
    });
}
exports.saveOAuthTokens = saveOAuthTokens;
function updateOAuthTokens(token_obj) {
    return new Promise(function (resolve, reject) {
        //iGetAuthTokenResult = accessTokenHack(token_obj);
        iGetAuthTokenResult = {
            accesstoken: token_obj.access_token,
            expirytime: token_obj.expiry_time,
            refreshtoken: token_obj.refresh_token,
        };
        resolve();
    });
}
exports.updateOAuthTokens = updateOAuthTokens;
function getOAuthTokens(user_identifier) {
    return new Promise(function (resolve, reject) {
        var result = __assign({}, iGetAuthTokenResult);
        var result_array = [result];
        resolve(result_array);
    });
}
exports.getOAuthTokens = getOAuthTokens;
//# sourceMappingURL=index.js.map