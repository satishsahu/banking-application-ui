import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { Account } from '../_models/account';
import { UserService } from '../_services';
import { AccountService } from '../_services/account.service';
import { ModalService } from '../_services/modal.service';
import { Beneficiary } from '../_models/Beneficiary';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    accounts: Account[] = [];
    account: Account;
    beneficiary: Beneficiary;
    beneficiaries: Beneficiary[] = [];
    firstName: string = "";
    lastName:string = "";

    constructor(private userService: UserService, private accountService: AccountService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        // this.loadAllUsers();
        this.loadAccountsForUsers(this.currentUser.id);
    }

    // deleteUser(id: number) {
    //     this.userService.delete(id).pipe(first()).subscribe(() => { 
    //         this.loadAllUsers() 
    //     });
    // }
    onTransfer(sid: number, did: number, amount:number) {
        this.accountService.transferAmount(sid, did, amount).pipe(first()).subscribe(accounts => {
            console.log(JSON.stringify(accounts)) 
            // this.accounts.forEach(account => {
            //     account.beneficiaries.forEach(beneficiary => {
            //         this.getUsersById(beneficiary.userId);
            //         // beneficiary.beneficiaryFirstName = this.beneficiaryUser.firstName;
            //         // beneficiary.beneficiaryLastName = this.beneficiaryUser.lastName
            //     });
            // });
        });
    }
    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            console.log(JSON.stringify(users)) 
            this.users = users; 
        });
    }

    private getUsersById(userId: number) {
        this.userService.getById(userId).pipe(first()).subscribe(user => {
            console.log(JSON.stringify(user));
            this.firstName=user.firstName;
            this.lastName=user.lastName;
        });
    }

    private setBeneficiary(beneficiaries: Beneficiary[]){
        this.account.beneficiaries = beneficiaries;
    }
    private loadAccountsForUsers(userId: number) {
        this.accountService.getAccountsForUsers(userId).pipe(first()).subscribe(accounts => {
            console.log(JSON.stringify(accounts));
            this.accounts = accounts; 
            accounts.forEach(account => {
                this.account = account;
                account.beneficiaries.forEach(beneficiary => {
                    this.getUsersById(beneficiary.userId);
                    beneficiary.firstName = this.firstName;
                    beneficiary.lastName = this.lastName
                    this.beneficiary = beneficiary;
                    this.beneficiaries.push(this.beneficiary);
                    this.account.beneficiaries = this.beneficiaries;
                    //this.setBeneficiary(this.beneficiaries);
                });
                this.accounts = [];
                this.accounts.push(this.account); 
            });
        });
    }
}