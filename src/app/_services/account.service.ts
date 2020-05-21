import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../_models/account'; 
import { Beneficiary } from '../_models/Beneficiary';

                                                
@Injectable()
export class AccountService {
    constructor(private http: HttpClient) { }

    getAccountsForUsers(userId: number) {
        console.log("getAccountsForUsers: "+userId)
        return this.http.get<Account[]>(`http://localhost:8082/account/user/` + userId);
    }

    getAccountsOfOthers(userId: number) {
        console.log("getAccountsOfOthers: "+userId)
        return this.http.get<Account[]>(`http://localhost:8082/account/others/account/` + userId);
    }

    getById(id: number) {
        return this.http.get(`http://localhost:8081/register/user/` + id);
    }

    create(account: Account) {
        console.log("Accout"+ JSON.stringify(account));
        return this.http.post(`http://localhost:8082/account`, account);
    }

    addBeneficiary(beneficiary: Beneficiary) {
        console.log("beneficiary"+ JSON.stringify(beneficiary));
        return this.http.put(`http://localhost:8082/account/beneficiaries/id/`, beneficiary.account.id);
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