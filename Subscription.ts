import { APICall, APIRequest, RequestMethod } from 'https://tcskhemata.github.io/SBase/APICall.ts';

export interface Subscription{
  data: any;
  api: APICall;
  id: number;
}

interface SubscriptionData{
  token: string,
  email: string,
  first_name: string
  last_name: string,
  street1: string,
  mail_code: any,
  city_id: number,
  subscription_plan_id: number,
  portal_name: string,
  terms: number,
  use_sca: number,
  source?: string,
  create_sample_data: number,
  secure_site: number,
  custom_domain: string,
}

export class Subscription implements Subscription {
  data: any = {};

  api: APICall;

  constructor(data: any = {}, api: APICall) {
    this.data = data;
    this.id = data.id;
    this.api = api;
  }

  /**
   *
   * @param stripe the stripe object to create the subscription with
   * @param cardToken token ID of tokenized card
   * @returns
   */
  async payWithStripe(stripe: any, cardToken: string): Promise<any> {
    const subscriptionData: SubscriptionData = {
      token: cardToken,
      email: this.data.email,
      first_name: this.data.first_name,
      last_name: this.data.last_name,
      street1: this.data.street1,
      mail_code: this.data.mail_code,
      city_id: this.data.city_id,
      subscription_plan_id: this.data.subscription_plan_id,
      portal_name: this.data.portal_name.trim().replace(/ /g, '_'),
      terms: this.data.terms,
      use_sca: 1,
      source: this.data.source,
      create_sample_data: this.data.create_sample_data,
      secure_site: 0,
      custom_domain: 'custom',
    };
    /*
    if (this.data.plan.addon) {
      subscriptionData.addon_domain = 1;
    } */

    const request: APIRequest = {
      requestMethod: RequestMethod.POST,
      endpoint: 'subscription',
      data: subscriptionData,
    };

    return new Promise((resolve, reject) => {
      this.api.send(request)
        .then((success) => {
          if (success.sca_status === 'requies_action' || success.sca_status === 'requires_source_action') {
            stripe.confirmCardPayment(success.client_secret).then((pi: any) => {
              if (pi.error) {
                reject(pi.error);
              } else {
                resolve(success);
              }
            }).catch((error: any) => {
              reject(error);
            });
          } else {
            console.log('no auth, resolving');
            resolve(success);
          }
        }).catch((error) => {
          reject(error);
        });
    });
  }
}
