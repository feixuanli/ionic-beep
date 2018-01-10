import { Component, OnInit } from '@angular/core';
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
  userProfile: Profile;
  loader: Loading;
  ngOnInit() {
    this.loader.present();
    this.auth.getAuthenticateUser().subscribe((user: User) => {
      this.data.getProfile(user).subscribe((profile) => {
        this.userProfile = <Profile>profile.val();
        this.loader.dismiss();
      })
    })
  }
  constructor(private loading: LoadingController,private data: DataService, private auth: AuthService) {
    this.loader = this.loading.create({
      content: 'Loading Profile....'
    });
  }

}
