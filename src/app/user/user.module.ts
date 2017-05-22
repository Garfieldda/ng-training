import { ApiService } from '../shared/services/api.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  UserRoutingModule,
  RegistrationComponent,
  UserService,
} from './user.barrel';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
  ],
  declarations: [
    RegistrationComponent,
  ],
  providers: [
    UserService,
    ApiService
  ]
})
export class UserModule { }
