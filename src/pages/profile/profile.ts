import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';
import { AuthService } from '../../providers/auth/auth.service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  existingProfile = {} as Profile;

  constructor(private navCtrl: NavController, private navParams: NavParams, private auth: AuthService) {
  }
  getExsitingProfile(profile) {
    this.existingProfile = profile;
  }
  navigateToEditProfilePage(){
    this.navCtrl.push('EditProfilePage', {existingProfile: this.existingProfile});
  }
  signOut(){
    this.auth.signOut();
    this.navCtrl.setRoot('LoginPage');
  }

}
