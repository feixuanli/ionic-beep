import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../providers/auth/auth.service';
import { DataService } from '../../providers/data/data.service';
import { User } from 'firebase/app';
import { Profile } from '../../models/profile/profile.interface';
import { LoadingController, Loading } from 'ionic-angular';

/**
 * Generated class for the ProfileViewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-profile-view',
  templateUrl: 'profile-view.component.html'
})
export class ProfileViewComponent implements OnInit {
  public userProfile: Profile;
  private loader: Loading;
  @Output() existingProfile: EventEmitter<Profile>;

  ngOnInit() {
    this.loader.present();
    this.data.getAuthenticatedUserProfile().subscribe(profile =>
      { this.userProfile = profile;
        this.existingProfile.emit(this.userProfile);
        this.loader.dismiss();
      });
  }
  constructor(private loading: LoadingController,private data: DataService, private auth: AuthService) {
    this.existingProfile = new EventEmitter<Profile>();
    this.loader = this.loading.create({
      content: 'Loading Profile....'
    });
  }

}
