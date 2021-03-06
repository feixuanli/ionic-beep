import { Component, OnDestroy, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'firebase/app';
import { Profile } from '../../models/profile/profile.interface';
import { AuthService } from '../../providers/auth/auth.service';
import { DataService } from '../../providers/data/data.service';

/**   AngularFireDatabase
 * Generated class for the EditProfileFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-edit-profile-form',
  templateUrl: 'edit-profile-form.component.html'
})
export class EditProfileFormComponent implements OnInit, OnDestroy{

  private authenticatedUser$: Subscription;
  private authenticatedUser: User;
  @Input() profile: Profile;
  @Output() saveProfileResult : EventEmitter<Boolean>;
  
  ngOnInit(): void {
    if(!this.profile) {
      this.profile = {} as Profile;
    }
  }
  constructor(private auth: AuthService, private data: DataService) {
    this.saveProfileResult = new EventEmitter<Boolean>();
    this.authenticatedUser$ = this.auth.getAuthenticateUser().subscribe((user: User)=> {
      this.authenticatedUser = user;
    })
  }
  async saveProfile(){
    if(this.authenticatedUser) {
      this.profile.email = this.authenticatedUser.email;
      const result = await this.data.saveProfile(this.authenticatedUser, this.profile);
      this.saveProfileResult.emit(result);
    }
  }
  ngOnDestroy(){
    this.authenticatedUser$.unsubscribe();
  }

}
