import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../user/user.barrel';
import { BroadcasterService } from '../shared.barrel';

@Injectable()
export class AuthService {

  public user: User;
  public token: string;

  constructor(private _http: Http, private _router: Router, private _broadcasterService: BroadcasterService) {
    this._loadFromStorage();
  }

  public login(user: User) {
    console.log('this._http.post');
    let observable: Observable<Response> = this._http.post(
      environment.apiEndpoint + '/auth',
      user
    );

   observable.subscribe(
      (response: Response) => {
        this.user = response.json()['user'];
        this.token = response.json()['token'];
        this._saveToStorage();
        this._loginOfSuccess();
      },
      (error: any) => {
        this.token = undefined;
        this._loginOfFailed(error);
      }
    );
  }

  public logout(): void {
    this.user = undefined;
    this.token = undefined;
    this._saveToStorage();
    this._router.navigate(['/']);
  }

  private _saveToStorage(): void {
    if (this.token) {
      localStorage.setItem('token', this.token);
    } else {
      localStorage.removeItem('token');
    }
    if (this.user) {
      localStorage.setItem('user', JSON.stringify(this.user));
    } else {
      localStorage.removeItem('user');
    }
  }

  private _loadFromStorage(): void {
    this.token = localStorage.getItem('token');
    let userString: string = localStorage.getItem('user');
    this.user = userString ? JSON.parse(userString) : undefined;
  }

  private _loginOfSuccess() {
    this._broadcasterService.broadcast('loginOfSuccess');
  }

  private _loginOfFailed(error: any) {
    this._broadcasterService.broadcast('loginOfFailed', error);
  }

}
