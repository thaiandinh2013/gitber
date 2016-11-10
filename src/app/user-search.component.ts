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
            if(this.searchTerms.indexOf(term) < 0) {
                this.searchTerms.unshift(term);
            }
            this.setUser(term);
        }
    }

    setUser(term: string): void {
        this.onSelectedUserChanged.emit(term);
    }

    removeSearchTerm(term: string): void {
        var index = this.searchTerms.indexOf(term);
        this.searchTerms.splice(index, 1);
    }

    ngOnInit() { }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        var cSelectedUser = changes['selectedUser'];
        if(cSelectedUser && cSelectedUser.currentValue && cSelectedUser.previousValue != cSelectedUser.currentValue) {
            if(this.searchTerms.indexOf(cSelectedUser.currentValue.login) < 0) {
                this.searchTerms.unshift(cSelectedUser.currentValue.login);
            }
        }
    }
}