import { Component, Input, OnInit } from '@angular/core';

import { User } from './user'

@Component({
    selector: 'user-biography',
    templateUrl: 'user-biography.component.html'
})
export class UserBiographyComponent implements OnInit {
    @Input() selectedUser: User;
    
    constructor() { }

    ngOnInit() { }
}