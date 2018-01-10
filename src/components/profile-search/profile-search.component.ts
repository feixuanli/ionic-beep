import { DataService } from "../../providers/data/data.service";
import { Component, EventEmitter, Output } from '@angular/core';
import { Profile } from "../../models/profile/profile.interface";

@Component ({
    selector: 'app-profile-search',
    templateUrl: 'profile-search.component.html'
})
export class ProfileSearchComponent {
    query: string;
    profileList: Profile[];
    @Output() selectedProfile: EventEmitter<Profile>;
    constructor(private data: DataService){
        this.selectedProfile = new EventEmitter<Profile>();
    }
    searchUser(query: string) {
        const trimmedQuery = query.trim();
        if(trimmedQuery === query) {
            this.data.searchUser(query).subscribe(profile => {
                this.profileList = profile;
            })
        }
    }
    selectProfile(profile: Profile) {
        this.selectedProfile.emit(profile);
    }
}