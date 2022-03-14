import { Campaign } from 'https://tcskhemata.github.io/SBase/Campaign.ts';
import { Subscription } from 'https://tcskhemata.github.io/SBase/Subscription.ts';
import { APICall, RequestMethod, APIRequest } from 'https://tcskhemata.github.io/SBase/APICall.ts';

/**
 * constants
 */
const AUTH_TOKEN = 'skhemataToken';

enum CampaignFileRegion {
  header = 1, // Campaign header
  body = 2, // Links for campaign Body
  thumbnail = 3, // Thumbnail for the campaign
  top_header = 5, // Campaign Top Header Image
  thumbnail_video = 6, // Video thumbnail link for campaign
}

/**
 * Shemata interface
 */
interface SkhemataInterface {
  authToken?: string,
  api: APICall,
}

/**
 * Auth interface
 */
interface Auth {
  authToken?: string,
  email?: string,
  password?: string
}

interface Registration {
  email: string,
  password: string,
  password_confirm: string,
  first_name: string,
  last_name: string,
}

/**
 * Campaign Search Inerface
 */
interface CampaignSearch {
  sort?: string,
  filter?: string,
  page?: {
    page?: number,
    page_entries?: number,
    page_limit?: number,
  }
}

export class Skhemata implements SkhemataInterface {
  api: APICall;

  /**
   *
   * @param apiUrl string
   * @param authToken string
   */
  constructor(apiUrl: string, authToken?: string) {
    this.api = new APICall(apiUrl, authToken);
    window.addEventListener('skhemata-login', (e: any) => {
      this.api.authToken = e.detail.authToken;
    });
  }

  /**
   * initialize skhemata api object
   * @returns boolean of auth status
   */
  init(): Promise<boolean> {
    const authToken = window.localStorage.getItem(AUTH_TOKEN) || undefined;

    return new Promise((resolve) => {
      if (!authToken) {
        resolve(false);
        return;
      }
      this.authenticate({ authToken })
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  }

  /**
   * authenticate
   * @param auth auth info
   * @returns Promise with api response
   */
  authenticate(auth: Auth): Promise<any> {
    const { authToken, email, password } = auth;
    let data;
    if (email && password) {
      data = {
        email,
        password,
      };
    }
    if (authToken) {
      this.api.authToken = authToken;
    }
    const request: APIRequest = {
      requestMethod: data ? RequestMethod.POST : RequestMethod.GET,
      endpoint: 'authenticate',
      data,
    };

    return this.api.send(request)
      .then((res) => {
        this.handleAuthResponse(res);
      });
  }

  authenticateOkta(idToken: string): Promise<any> {
    const request: APIRequest = {
      requestMethod: RequestMethod.POST,
      endpoint: 'authenticate/okta/social',
      data: {
        id_token: idToken,
      },
    };
    return this.api.send(request)
      .then((res) => {
        this.handleAuthResponse(res);
      });
  }

  handleAuthResponse(res: any): any {
    if (res?.auth_token) {
      this.api.authToken = res.auth_token;
      window.localStorage.setItem(AUTH_TOKEN, this.api.authToken);
      window.dispatchEvent(new CustomEvent('skhemata-login', {
        detail: {
          authToken: this.api.authToken,
        },
      }));
    }
    return res;
  }

  register(data: Registration): Promise<any> {
    const request: APIRequest = {
      requestMethod: RequestMethod.POST,
      endpoint: 'register',
      data,
    };
    return this.api.send(request);
  }

  logout() {
    this.api.authToken = '';
    localStorage.removeItem(AUTH_TOKEN);
    window.dispatchEvent(new CustomEvent('skhemata-logout'));
  }

  /** *************
  * Campaign *
  ************** */

  /**
   *
   * @param id ID of the campaign
   * @returns Promise<Campaign>
   */
  getCampaign(id: number): Promise<Campaign> {
    const campaignRequest: APIRequest = {
      requestMethod: RequestMethod.GET,
      endpoint: `campaign/${id}`,
    };
    const imageRequest: APIRequest = {
      requestMethod: RequestMethod.GET,
      endpoint: `campaign/${id}/resource/file`,
    };

    let newCampaign: Campaign;

    return this.api.send(campaignRequest)
      .then((campaign) => {
        newCampaign = new Campaign(campaign, this.api);
      })
      .then(() => this.api.send(imageRequest))
      .then((images) => {
        newCampaign.images = images.filter(
          (image: any) => image.region_id === CampaignFileRegion.thumbnail,
        );
        return newCampaign;
      });
  }

  /**
   *
   * @param data campaign data
   * @returns Promise<Campaign>
   */
  createCampaign(data: any): Promise<Campaign> {
    const request: APIRequest = {
      requestMethod: RequestMethod.POST,
      endpoint: 'campaign',
      data,
    };
    return this.api.send(request)
      .then((campaign) => new Campaign(campaign, this.api));
  }

  /**
   *  getCampaigns
   * @param params CampaignSearch object
   * @returns Promise with Array of Campaign objects or Error
   */
  getCampaigns(params: CampaignSearch): Promise<Array<Campaign> | Error> {
    const { sort, filter, page } = params;
    const searchParams = new URLSearchParams();
    if (sort) {
      searchParams.set('sort', JSON.stringify(sort));
    }
    if (sort) {
      searchParams.set('filter', JSON.stringify(filter));
    }
    if (page) {
      if (typeof page.page !== undefined) {
        searchParams.set('page', `${page.page}`);
      }
      if (typeof page.page_entries !== undefined) {
        searchParams.set('page_entries', `${page.page_entries}`);
      }
    }
    const request: APIRequest = {
      requestMethod: RequestMethod.GET,
      endpoint: 'campaign',
      searchParams,
    };
    return this.api.send(request)
      .then((res) => res.map((campaign: any) => new Campaign(campaign, this.api)))
      .catch(() => new Error('Error'));
  }

  /** *************
  * SUBSCRIPTION *
  ************** */

  /**
   *
   * @param data data to create the subscription
   * @returns Subscription object
   */
  createSubscription(data: any): Subscription {
    return new Subscription(data, this.api);
  }
}
