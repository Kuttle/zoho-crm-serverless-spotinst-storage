import * as rp from 'request-promise';
export interface IGetAuthTokenResult {
  accesstoken: string;
  expirytime: number;
  refreshtoken: string;
}

export interface ITokenObj {
  access_token: string;
  expiry_time: number;
  refresh_token: string;
}

export interface IStorage {
  saveOAuthTokens: (token_obj: ITokenObj) => Promise<void>;
  updateOAuthTokens: (token_obj: ITokenObj) => Promise<void>;
  getOAuthTokens(user_identifier: string): Promise<IGetAuthTokenResult[]>;
}

const oauthKey = 'oauthKey';
export function init(
  context,
  account: string,
  token: string,
  environment: string
) {
  const _context = context;
  function postStore(key: string, value: string): Promise<IStorage> {
    return rp({
      uri:
        'https://api.spotinst.io/functions/environment/' +
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
  const returnObj = {
    saveOAuthTokens: function saveOAuthTokens(
      token_obj: ITokenObj
    ): Promise<void> {
      return new Promise(function(resolve, reject) {
        const iGetAuthTokenResult = {
          accesstoken: token_obj.access_token,
          expirytime: token_obj.expiry_time,
          refreshtoken: token_obj.refresh_token,
        };
        postStore(oauthKey, JSON.stringify(iGetAuthTokenResult)).then(() => {
          resolve();
        });
      });
    },
    updateOAuthTokens: function updateOAuthTokens(
      token_obj: ITokenObj
    ): Promise<void> {
      return new Promise(function(resolve, reject) {
        const iGetAuthTokenResult = {
          accesstoken: token_obj.access_token,
          expirytime: token_obj.expiry_time,
          refreshtoken: token_obj.refresh_token,
        };
        postStore(oauthKey, JSON.stringify(iGetAuthTokenResult)).then(() => {
          resolve();
        });
      });
    },
    getOAuthTokens: function getOAuthTokens(
      user_identifier: string
    ): Promise<IGetAuthTokenResult[]> {
      return new Promise(function(resolve, reject) {
        _context.getDoc(oauthKey, function(err, res) {
          if (res) {
            const result: IGetAuthTokenResult = JSON.parse(res);
            var result_array: IGetAuthTokenResult[] = [result];
            resolve(result_array);
          }
          reject(err);
        });
      });
    },
  };
  console.log(`about to print init: ${JSON.stringify(returnObj)}`);
  return returnObj;
}
