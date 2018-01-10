import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database-deprecated";

@Injectable()
export class ChatService {
    constructor(private database: AngularFireDatabase){

    }
    addChannel(channelName:String) {
        this.database.list(`/channel-names/`).push({name: channelName});
    }

}