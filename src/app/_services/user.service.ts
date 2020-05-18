import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        console.log("userservice: getAll")
        return this.http.get<User[]>(`http://localhost:8081/register/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`http://localhost:8081/register/user/` + id);
    }

    register(user: User) {
        return this.http.post(`http://localhost:8081/register/user`, user);
    }

    update(user: User) {
        return this.http.put(`http://localhost:8081/register/` + user.id, user);
    }

    // delete(id: number) {
    //     return this.http.delete(`/users/` + id);
    // }
}