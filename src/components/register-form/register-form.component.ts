import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../providers/auth/auth.service';
import { Account } from '../../models/account/account.interface';
import {LoginResponse } from '../../models/login/login-response.interface';

/**
 * Generated class for the RegisterFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-register-form',
  templateUrl: 'register-form.component.html'
})
export class RegisterFormComponent {

  account= {} as Account;
  @Output() registerStatus: EventEmitter<LoginResponse>;

  constructor(private afAuth: AuthService) {
    this.registerStatus = new EventEmitter<LoginResponse>();
  }
  async register(){
    const registerRes = await this.afAuth.createUserWithEmailAndPassword(this.account);
    this.registerStatus.emit(registerRes);
  }
}
