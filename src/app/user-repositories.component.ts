import { Component, Input, OnInit } from '@angular/core';

import { User } from './user'

@Component({
    selector: 'user-repositories',
    templateUrl: 'user-repositories.component.html'
})
export class UserRepositoriesComponent implements OnInit {
    @Input() selectedUser: User;

    constructor() { }

    ngOnInit() { }
}