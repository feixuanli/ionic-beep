import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Channel } from '../../models/channel/channel.interface';
import { ChatService } from '../../providers/chat/chat.service';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { ChannelMessage } from '../../models/channel/channel-message.interface';

/**
 * Generated class for the ChannelChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-channel-chat',
  templateUrl: 'channel-chat.html',
})
export class ChannelChatPage {
  channel: Channel;
  channelMessages: FirebaseListObservable<ChannelMessage[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, private chat: ChatService) {
  
  }

  ionViewWillLoad() {
    this.channel = this.navParams.get('channel');
    this.channelMessages = this.chat.getChannelChatRef(this.channel.$key);
  }
  sendMessage(content: string) {
    let channelMessages: ChannelMessage = {
      content
    }
    this.chat.sendChannelChatMessage(this.channel.$key, channelMessages);
  }

}
