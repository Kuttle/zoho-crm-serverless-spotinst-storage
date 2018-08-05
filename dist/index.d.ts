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
export declare function saveOAuthTokens(token_obj: ITokenObj): Promise<void>;
export declare function updateOAuthTokens(token_obj: ITokenObj): Promise<void>;
export declare function getOAuthTokens(user_identifier: any): Promise<IGetAuthTokenResult[]>;
