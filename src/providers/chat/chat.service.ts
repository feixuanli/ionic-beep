import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/first';
import { AngularFireDatabase } from "angularfire2/database-deprecated";
import { ChannelMessage } from "../../models/channel/channel-message.interface";
import { Message } from "../../models/messages/message.interface";
import { AuthService } from "../auth/auth.service";
import 'rxjs/add/operator/mergeMap'
@Injectable()
export class ChatService {
    constructor(private auth: AuthService,private database: AngularFireDatabase){

    }
    addChannel(channelName:String) {
        this.database.list(`/channel-names/`).push({name: channelName});
    }
    getChannelListRef(){
        return this.database.list('channel-names');
    }
    getChannelChatRef(channelKey: string) {
        return this.database.list(`channels/${channelKey}`);
    }
    async sendChannelChatMessage(channelKey: string, message: ChannelMessage){
        await this.database.list(`/channels/${channelKey}`).push(message);
    }
    async sendChat(message: Message) {
        await this.database.list(`/messages`).push(message);
    }
    getChats(userTwoId: string) {
        return this.auth.getAuthenticateUser().map(auth => auth.uid)
        .mergeMap(uid => this.database.list(`/user-messages/${uid}/${userTwoId}`))
        .mergeMap(chats => {
            return Observable.forkJoin(
                chats.map(chat => this.database.object(`/messages/${chat.$key}`).first())
            ,
            (...vals: Message[]) => {
                console.log(vals);
                return vals;
            });
    });
}}