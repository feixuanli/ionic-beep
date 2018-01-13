import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';
import { Message } from '../../models/messages/message.interface';
import { MESSAGE_LIST } from '../../mocks/messages/message';
import { AuthService } from '../../providers/auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { User } from 'firebase/app';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  selectedProfile : Profile;
  messageList: Message[];
  userId: string;
  constructor(private auth: AuthService,public navCtrl: NavController, public navParams: NavParams) {
    this.messageList = MESSAGE_LIST;
  }

  ionViewWillLoad() {
    this.selectedProfile = this.navParams.get('profile');
    this.auth.getAuthenticateUser().subscribe(auth => {
      this.userId = auth.uid;
    });
  }

}
