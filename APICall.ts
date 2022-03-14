export enum RequestMethod {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
  DELETE = 'delete',
}

/**
 * @param requestMethod
 * @param endpoint
 * @param searchParams
 * @param data
 */
export interface APIRequest{
  requestMethod: RequestMethod,
  endpoint: string,
  searchParams?: URLSearchParams
  data?: any,
}

export interface RequestOptions{
  method?: RequestMethod,
  body?: any,
  headers?: any,
}

export class APICall {
  apiUrl: string = '';

  authToken: string = '';

  /**
   *
   * @param apiUrl api url
   * @param authToken x-auth-token token
   */
  constructor(apiUrl: string, authToken?: string) {
    this.apiUrl = apiUrl;
    this.authToken = authToken || '';
  }

  /**
   *
   * @param request APIRequest
   */
  send(request: APIRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      const {
        requestMethod, endpoint, data, searchParams,
      } = request;
      const options: RequestOptions = {
        method: requestMethod,
        headers: {},
      };

      if (this.authToken) {
        options.headers['x-auth-token'] = this.authToken;
      }

      if (data) {
        options.headers['Content-Type'] = 'application/json';
        try {
          options.body = JSON.stringify(data);
        } catch (error) {
          reject(error);
        }
      }

      const url = new URL(`${this.apiUrl}/${endpoint}`);
      if (searchParams) {
        url.search = searchParams.toString();
      }

      fetch(url.toString(), options)
        .then((res) => {
          if (res.status !== 200) {
            reject(res);
          }
          return res.json();
        })
        .then((resData) => { resolve(resData); })
        .catch(reject);
    });
  }
}
