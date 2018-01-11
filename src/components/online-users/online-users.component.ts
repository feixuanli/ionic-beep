import { Component, OnInit } from '@angular/core';
import { DataService } from '../../providers/data/data.service';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Profile } from '../../models/profile/profile.interface';

/**
 * Generated class for the OnlineUsersComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-online-users',
  templateUrl: 'online-users.component.html'
})
export class OnlineUsersComponent implements OnInit{
  userList: FirebaseListObservable<Profile[]>;
  ngOnInit(): void {
    this.setUserOnline();
    this.getOnlineUsers();
  }
  setUserOnline(){
    this.data.getAuthenticatedUserProfile().subscribe(profile => {
      this.data.setUserOnline(profile);
    })
    //Call to a service that sets the user online within Firebase 
  }
  getOnlineUsers(){
    this.userList = this.data.getOnlineUsers();
  }
  constructor(private data: DataService){

  }

}
