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

let iGetAuthTokenResult: IGetAuthTokenResult;

export function saveOAuthTokens(token_obj: ITokenObj): Promise<void> {
  return new Promise(function(resolve, reject) {
    //iGetAuthTokenResult = accessTokenHack(token_obj);
    iGetAuthTokenResult = {
      accesstoken: token_obj.access_token,
      expirytime: token_obj.expiry_time,
      refreshtoken: token_obj.refresh_token,
    };
    resolve();
  });
}

export function updateOAuthTokens(token_obj: ITokenObj): Promise<void> {
  return new Promise(function(resolve, reject) {
    //iGetAuthTokenResult = accessTokenHack(token_obj);
    iGetAuthTokenResult = {
      accesstoken: token_obj.access_token,
      expirytime: token_obj.expiry_time,
      refreshtoken: token_obj.refresh_token,
    };
    resolve();
  });
}

export function getOAuthTokens(
  user_identifier
): Promise<IGetAuthTokenResult[]> {
  return new Promise(function(resolve, reject) {
    const result: IGetAuthTokenResult = { ...iGetAuthTokenResult };
    var result_array: IGetAuthTokenResult[] = [result];
    resolve(result_array);
  });
}
