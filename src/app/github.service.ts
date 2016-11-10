import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs';

import { User } from './user';
import { Repository } from './repository';

@Injectable()
export class GithubService {

    private apiUrl = 'https://api.github.com/'
    private client = '69af424226e15a6396dd';
    private secret = '683d05837403207f247939ab21668065352b65db';
    private oauth = '?client_id=' + this.client + '&client_secret=' + this.secret;

    constructor(private http: Http) {}

    searchUser(term: string): Observable < User > {
        return this.http
            .get(`${this.apiUrl}users/${term}${this.oauth}`)
            .map((r: Response) => r.json() as User)
            .map((user: User) => {
                if(user) {
                    this.getRepositories(user.login)
                        .toPromise()
                        .then((repositories: Repository[]) => {
                            user.repositories = repositories;
                        })
                        .catch((error) => user.repositories = []);
                }
                return user;
            });
    }

    searchOrganisation(term: string): Observable < User[] > {
        return this.http
            .get(`${this.apiUrl}orgs/${term}/members${this.oauth}`)
            .map((r: Response) => r.json() as User[]);
    }

    getRepositories(user: string): Observable < Repository[] > {
        return this.http
            .get(`${this.apiUrl}users/${user}/repos${this.oauth}`)
            .map((r: Response) => r.json() as Repository[])
            .map((repositories: Repository[]) => {
                if (repositories) {
                    repositories.forEach((repository) => {
                        this.getReadMe(user, repository.name)
                            .toPromise()
                            .then((readme: string) => {
                                repository.readme = readme;
                            })
                            .catch((error) => repository.readme = repository.description);
                    });
                }
                return repositories;
            });
    }

    getReadMe(user: string, repository: string): Observable < string > {
        return this.http
            .get(`${this.apiUrl}repos/${user}/${repository}/readme${this.oauth}`)
            .map((r: Response) => decodeURIComponent(atob(r.json().content)));
    }
}