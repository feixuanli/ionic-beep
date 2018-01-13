import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';
import { Message } from '../../models/messages/message.interface';
import { MESSAGE_LIST } from '../../mocks/messages/message';
import { AuthService } from '../../providers/auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { User } from 'firebase/app';
import { DataService } from '../../providers/data/data.service';
import { ChatService } from '../../providers/chat/chat.service';

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
  userProfile: Profile;
  constructor(private chat: ChatService ,private data: DataService, private auth: AuthService,public navCtrl: NavController, public navParams: NavParams) {
    this.messageList = MESSAGE_LIST;
  }

  ionViewWillLoad() {
    this.selectedProfile = this.navParams.get('profile');
    this.data.getAuthenticatedUserProfile().subscribe(
      profile => {
        this.userProfile = profile;
        this.userId = profile.$key;
      }
    )
  }
  async sendMessage(content: string) {
    try {
      const message: Message = {
        content: content,
        userToId: this.selectedProfile.$key,
        userToProfile: {
          firstName: this.selectedProfile.firstName,
          lastName: this.selectedProfile.lastName
        },
        userFromProfile: {
          firstName: this.userProfile.firstName,
          lastName: this.userProfile.lastName
        },
        userFromId: this.userId,
      }
      await this.chat.sendChat(message);
    } catch(e) {
      console.error(e);
    }
  }

}
