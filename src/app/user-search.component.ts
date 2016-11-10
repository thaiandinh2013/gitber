import { Component, EventEmitter, Input, Output, SimpleChange, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { User } from './user'

@Component({
    selector: 'user-search',
    templateUrl: 'user-search.component.html'
})
export class UserSearchComponent implements OnInit {
    @Input() selectedUser: User;
    @Output() onSelectedUserChanged = new EventEmitter<string>();
    private searchTerms = new Array<string>();

    constructor() {
    }

    search(term: string): void {
        if(term) {
            this.searchTerms.push(term);
            this.setUser(term);
        }
    }

    setUser(term: string): void {
        this.onSelectedUserChanged.emit(term);
    }

    ngOnInit() { }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        if(changes['selectedUser'] && changes['selectedUser'].currentValue) {
            this.searchTerms.push(changes['selectedUser'].currentValue.login);
        }
    }
}