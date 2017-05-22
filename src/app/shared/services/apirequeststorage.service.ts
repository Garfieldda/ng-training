import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {
    ApiRequestConfigInterfaced,
    ApiResponseConfigInterfaced,
    ApiService,
    AuthService,
    BroadcasterService
    } from '../shared.barrel';



class ApiRequestStorage {
  public ApiRequestConfig: ApiRequestConfigInterfaced;
  public ApiResponseConfig: ApiResponseConfigInterfaced;
  public isRequested: boolean = false;

  public constructor(requestConfig: ApiRequestConfigInterfaced, responseConfig: ApiResponseConfigInterfaced, isRequested: boolean) {
    this.ApiRequestConfig = requestConfig;
    this.ApiResponseConfig = responseConfig;
    this.isRequested = isRequested;
  }
}

@Injectable()
export class ApiRequestStorageService {
  private _apiRequestStorage: ApiRequestStorage[] = [];

  public constructor(private _apiService: ApiService,
                     private _authService: AuthService,
                     private _broadcasterService: BroadcasterService,
                     private _routerService: Router) {
    this._registerBroadcastBackInReLogin();
    this._registerBroadcastLogined();
    this._registerBroadcastAddApiRequest();
  }

  /* Feliratkoz�si metodusok az �zenetek fogad�s�ra! */
  private _registerBroadcastLogined() {
    this._broadcasterService.on<string>('reLogined').subscribe(message => {
      this._reSubmitRequest();
    });
  }

  private _registerBroadcastBackInReLogin() {
    this._broadcasterService.on<string>('backInReLogin').subscribe(message => {
      this._clearAllRequest();
      this._runLogOut();
    });
  }

  private _registerBroadcastAddApiRequest() {
    this._broadcasterService.on<any>('addApiRequest').subscribe(data => {
      this._clearIsRequested();
      this._addApiRequest(data[0] as ApiRequestConfigInterfaced, data[1] as ApiResponseConfigInterfaced);
    });
  }


  /* �zenetek k�ld�se esem�ny hat�s�ra */
  private _showModalLiginSendToModalLogin() {
    this._broadcasterService.broadcast('runModalLogin');
  }



  /* �zenetekhez tartoz� esem�nyek */
  private _clearIsRequested() {
    for (let ars of  this._apiRequestStorage) {
        if (ars.isRequested) {
          let index = this._apiRequestStorage.indexOf(ars);
          this._apiRequestStorage.splice(index);
      }
    }
  }

  private _clearAllRequest() {
    for (let ars of  this._apiRequestStorage) {
      let index = this._apiRequestStorage.indexOf(ars);
      this._apiRequestStorage.splice(index);
    }
  }

  private _reSubmitRequest() {
    for (let ars of  this._apiRequestStorage) {
        if (!ars.isRequested) {
          ars.isRequested = true;
          this._apiService.request(ars.ApiRequestConfig, ars.ApiResponseConfig);
      }
    }
  }

  private _addApiRequest(requestConfig: ApiRequestConfigInterfaced, responseConfig: ApiResponseConfigInterfaced) {
    this._apiRequestStorage.push(new ApiRequestStorage(requestConfig, responseConfig, false));
    this._runModalLogin();
  }

  private _runModalLogin() {
    this._showModalLiginSendToModalLogin();
  }

  private _runLogOut() {
      this._authService.logout();
    }

}
