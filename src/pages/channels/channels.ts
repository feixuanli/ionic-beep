import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ChatService } from '../../providers/chat/chat.service';
import { Channel } from '../../models/channel/channel.interface';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ChannelsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-channels',
  templateUrl: 'channels.html',
})
export class ChannelsPage {
  channelList: Observable<Channel[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private alertCtrl: AlertController, private chat: ChatService) {
  }
  getChannel(){
    this.channelList =  this.chat.getChannelListRef();
  }
  selectChannel(channel: Channel) {
    this.navCtrl.push('ChannelChatPage', {channel});
  }
  ionViewWillLoad(){
    this.getChannel();
  }
  showAddChannelDialog(){
    this.alertCtrl.create({
      title: 'Channel Name',
      inputs: [{
        name: 'channelName'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
      }, {
        text: 'Add',
        handler: data => {
          this.chat.addChannel(data.channelName)
        }
      }],
    }).present();
  }

}
