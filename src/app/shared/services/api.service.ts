import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { Subject } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthService, ApiRequestConfigInterfaced, ApiResponseConfigInterfaced, BroadcasterService} from '../shared.barrel';
import { User } from '../../user/user.barrel';


@Injectable()
export class ApiService {

  public constructor(private _http: Http,
                     private _authService: AuthService,
                     private _broadcaster: BroadcasterService) { }

  public request(requestConfig: ApiRequestConfigInterfaced, responseConfig: ApiResponseConfigInterfaced): void {
    this._http.request(
      this._getRequestUrl(requestConfig),
      this._getRequestOptions(requestConfig)
    ).subscribe(
      response => {
        let responseJson = response.json();
        if (responseConfig.success != undefined) {
          responseConfig.success(responseJson);
        }
        if (responseConfig.finally != undefined) {
          responseConfig.finally();
        }
      },
      error => {
        let responseJson = error.json();
        if (['token_expired', 'token_invalid', 'token_not_provided'].indexOf(responseJson['error']) !== -1) {
          this._tokenErrorSendToApiRequestStorage(requestConfig, responseConfig);
          return;
        }
        if (responseConfig.error != undefined) {
          responseConfig.error(responseJson);
        } else {
          window.alert(responseJson['error'] ? responseJson['error'] : 'Unexpected system error.');
          console.error(responseJson);
        }
        if (responseConfig.finally != undefined) {
          responseConfig.finally();
        }
      }
    );
  }

  private _getRequestUrl(requestConfig: ApiRequestConfigInterfaced) {
    return environment.apiEndpoint + '/' + requestConfig.url.replace(/^\/+|\/+$/g, '');
  }

  private _getRequestOptions(requestConfig: ApiRequestConfigInterfaced) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    if (this._authService.token) {
      headers.append('Authorization', 'Bearer ' + this._authService.token);
    }
    let body = (requestConfig.body == undefined) ? '' : JSON.stringify(requestConfig.body);
    return new RequestOptions({
      method: RequestMethod[requestConfig.method],
      headers: headers,
      body: body,
      responseType: ResponseContentType.Json
    });
  }

  /* Üzenetek küldése esemény hatására */
  private _tokenErrorSendToApiRequestStorage(requestConfig: ApiRequestConfigInterfaced, responseConfig: ApiResponseConfigInterfaced) {
    this._broadcaster.broadcast('addApiRequest', [requestConfig, responseConfig]);
  }

}
