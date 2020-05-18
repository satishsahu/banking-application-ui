import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

                                                
@Injectable()
export class AccountService {
    constructor(private http: HttpClient) { }

    getAccountsForUsers(userId: number) {
        console.log("getAccountsForUsers: "+userId)
        return this.http.get<Account[]>(`http://localhost:8082/account/user/` + userId);
    }

    getById(id: number) {
        return this.http.get(`http://localhost:8081/register/user/` + id);
    }

    register(account: Account) {
        return this.http.post(`http://localhost:8081/register/user`, account);
    }

    update(account: Account) {
        return this.http.put(`http://localhost:8081/register/` + account.id, account);
    }

    transferAmount(sid: number, did: number, amount: number){
        return this.http.get(`http://localhost:8082/account/transfer/from/`+sid+`/to/`+did+`/amount/`+ amount);
    }
    // delete(id: number) {
    //     return this.http.delete(`/users/` + id);
    // }
}