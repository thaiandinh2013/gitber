import { Component } from '@angular/core';
import '../public/css/styles.css';
import '../public/css/forkit.css';
import '../public/scripts/vendor/jquery.min.js';
import '../public/scripts/vendor/bootstrap/bootstrap.min.js';
import '../public/scripts/vendor/async.js';
import '../public/scripts/vendor/base64.js';
import '../public/scripts/vendor/jquery.fittext.js';
import '../public/scripts/vendor/forkit.js';
import '../public/scripts/vendor/skrollr.min.js';
import '../public/scripts/main.js';
import '../public/images/small-fork.png';

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
        this.githubService.getRepositories(user)
                          .subscribe(repositories => this.selectedUser.repositories = repositories);
    }
}
