import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { GithubService } from './github.service'
import { User } from './user';

@Component({
    selector: 'organization-search',
    templateUrl: 'organization-search.component.html'
})
export class OrganizationSearchComponent implements OnInit {
    private users: User[];

    @Output() onSelectedUserChanged = new EventEmitter<string>();

    constructor(private githubService: GithubService) { }

    search(term: string): void {
        this.githubService.searchOrganisation(term)
                          .subscribe(users => this.users = users);
    }

    selectUser(term: string): void {
        this.onSelectedUserChanged.emit(term);
    }

    ngOnInit() { }
}