import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AuthService,
  ApiRequestStorageService,
  ModalLoginComponent
} from '../../shared.barrel';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @ViewChild(ModalLoginComponent) modalLoginComponent: ModalLoginComponent;

  public constructor(public authService: AuthService,
                     private _ApiRequestStorageService: ApiRequestStorageService
                    ) {
    //
  }

  public ngOnInit() {
    //
  }

  public showModalLogin() {
    this.modalLoginComponent.open();
  }

}
