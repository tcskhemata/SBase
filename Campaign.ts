import { APICall, APIRequest, RequestMethod } from './APICall';

export interface Campaign{
  data: any;
  api: APICall;
  id: number;
  images: Array<string>;
}

export class Campaign implements Campaign {
  data: any = {};

  api: APICall;

  images: Array<string> = [];

  constructor(data: any = {}, api: APICall) {
    this.data = data;
    this.id = data.id;
    this.api = api;
  }

  save(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const request: APIRequest = {
        requestMethod: this.id ? RequestMethod.PUT : RequestMethod.POST,
        endpoint: this.id ? `campaign/${this.id}` : 'campaign',
        data,
      };
      this.api.send(request)
        .then((res) => {
          this.data = res;
          resolve(res);
        }).catch(reject);
    });
  }
}
