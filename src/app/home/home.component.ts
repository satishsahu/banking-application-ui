import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { Account } from '../_models/account';
import { UserService } from '../_services';
import { AccountService } from '../_services/account.service';
import { ModalService } from '../_services/modal.service';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    accounts: Account[] = [];
    beneficiaryUser: {
        id: number;
        userName: string;
        password: string;
        firstName: string;
        lastName: string;
    };

    constructor(private userService: UserService, private accountService: AccountService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.loadAccountsForUsers(this.currentUser.id);
    }

    // deleteUser(id: number) {
    //     this.userService.delete(id).pipe(first()).subscribe(() => { 
    //         this.loadAllUsers() 
    //     });
    // }
    onTransfer(sid: number, did: number, amount:number) {
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
            // this.beneficiaryUser.firstName=user.firstName;
            // this.beneficiaryUser.lastName=user.lastName;
        });
    }

    private loadAccountsForUsers(userId: number) {
        this.accountService.getAccountsForUsers(userId).pipe(first()).subscribe(accounts => {
            console.log(JSON.stringify(accounts)) 
            this.accounts.forEach(account => {
                account.beneficiaries.forEach(beneficiary => {
                    this.getUsersById(beneficiary.userId);
                    // beneficiary.beneficiaryFirstName = this.beneficiaryUser.firstName;
                    // beneficiary.beneficiaryLastName = this.beneficiaryUser.lastName
                });
            });
        });
    }
}