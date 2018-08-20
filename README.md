# Introduction
This module is a dependency of [zoho-crm-serverless](https://github.com/Kuttle/zoho-crm-serverless). This readme serves as an explanation, so that if you want to write your own storage mechanism drop-in replacement for say Amazon Lambda, you can.

# TL;DR;
Write a module that exports a function named `init` that returns an object that conforms with the `IInitFunction` interface below. if you need to pass in any run time arguments that are required for your storage mechanism, these can be passed in, you will just need to fork [zoho-crm-serverless](https://github.com/Kuttle/zoho-crm-serverless) for your specific implementation.
```ts
export interface IInitFunction {
    (...args: any[]) => IStorage;
}

export interface IStorage {
  saveOAuthTokens: (token_obj: ITokenObj) => Promise<void>;
  updateOAuthTokens: (token_obj: Partial<ITokenObj>) => Promise<void>;
  getOAuthTokens(user_identifier: string): Promise<IGetAuthTokenResult[]>;
}

export interface IGetAuthTokenResult {
  accesstoken: string;
  expirytime: number;
  refreshtoken: string;
}

export interface ITokenObj {
  access_token: string;
  expiry_time?: number;
  refresh_token: string;
  user_identifier: string;
}
```

# Further explanation
Zoho crm uses OAuth 2.0 for its API. This api requires the generation of `access tokens` using a `refresh token` which is valid for an hour before a new one needs generating. The access tokens need to persist somewhere for reuse and since serverless functions cannot hold state reliably, they should be stored in persistant storage such as a database. zoho crm provide their own [js SDK](https://www.zoho.com/crm/help/developer/server-side-sdks/node-js.html) that wraps its REST API for ease of use. By default it expects a mysql server to be available for storing the `access tokens` and `refresh tokens`, automatically generating a new `access token` if it has expired. the [js SDK](https://www.zoho.com/crm/help/developer/server-side-sdks/node-js.html) also allows you to override their default mysql implementation with your own custom module. However, this is in the form of a module import (if you read their SDK documentation they expect you to pass in the name of the module so that they can import and use it at runtime). If your storage solution requres anything injected at runtime you are out of luck! This storage module uses `POST` and `PUT` requests for updating the [Document Store](https://help.spotinst.com/hc/en-us/articles/115005769089-Using-Document-Store-API). But uses the [Document Store SDK](https://help.spotinst.com/hc/en-us/articles/115005949369-Using-Document-Store-SDK) for faster retrieval of values - and it uses an object that is created at runtime to do that. So a storage module that is imported at runtime would not work.

So, I took their [js SDK](https://www.zoho.com/crm/help/developer/server-side-sdks/node-js.html), changed it so that it expected an object that conforms to the `IStorage` interface above and then did a basic conversion to typescript. The final result is [here](https://github.com/Kuttle/zoho-crm-nodejs-sdk).