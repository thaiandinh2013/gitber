import { Component } from '@angular/core';

import { GithubService } from './github.service'
import { User } from './user'
import { Repository } from './repository'

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [GithubService]
})
export class AppComponent {
    public selectedUserName: string;
    public selectedUser: User;

    constructor(private githubService: GithubService) { }

    onSelectedUserChanged(user: string) {
        this.selectedUserName = user;
        this.githubService.searchUser(user)
                          .subscribe(user => this.selectedUser = user);
    }
}
