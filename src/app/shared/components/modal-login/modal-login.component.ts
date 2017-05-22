import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Subject } from 'rxjs';
import { AuthService, BroadcasterService } from '../../shared.barrel';

import { User, UserService } from '../../../user/user.barrel';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {
  @ViewChild('ModalLogin') modal: ModalComponent;
  public timeOutToken: boolean = false;
  public loading: boolean = true;
  public user: User = new User();
  public form = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    }
  );


  public constructor(private _authService: AuthService,
                     private _router: Router,
                     private _broadcaster: BroadcasterService) {
    this.registerBroadcastLogined();
  }

  public ngOnInit() {
    this.loading = false;
    this.timeOutToken = false;
    this.modal.animation = true;
  }

  public login() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this._authService.login(this.user).subscribe(
      (response: Response) => {
        this.user = new User();
        this.form.reset();
        if (this.timeOutToken) {
          this._sendReLoginedToApiRequestStorageService();
        } else {
          this._router.navigate(['/']);
        }
        this.close();
      },
      (error: any) => {
        console.log(error);
        window.alert('Login failed.');
        this.loading = false;
      },
      () => {
      }
    );
  }

  public cancel() {
    this._sendBackInReLoginToApiRequestStorageService();
    this.close();
  }

  public close() {
    this.modal.close();
    this.loading = false;
    this.timeOutToken = false;
  }

  public open() {
    this.modal.open();
  }


  /* Feliratkozási metodus az üzenetek fogadására! */
  private registerBroadcastLogined() {
    this._broadcaster.on<string>('runModalLogin').subscribe(message => {
      this.timeOutToken = true;
      this.loading = false;
      this.open();
     });
  }


  /* Üzenetek küldése esemény hatására */
  private _sendReLoginedToApiRequestStorageService() {
    this._broadcaster.broadcast('reLogined');
  }

  private _sendBackInReLoginToApiRequestStorageService() {
    this._broadcaster.broadcast('backInReLogin');
  }

}
