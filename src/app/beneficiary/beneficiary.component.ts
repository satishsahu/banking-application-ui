import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../_services';
import { AccountService } from '../_services/account.service';
import { User } from '../_models';
import { Account } from '../_models/account';

@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.css']
})
export class BeneficiaryComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  currentUser: User;
  accountOthers: Account[] = [];
  currentUserAccounts: Account[];
  account: Account;
  firstName: string = "";
  lastName:string = "";

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private userService: UserService) { 
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

  ngOnInit(): void {
    
    this.getAccountsForUsers(this.currentUser.id);
    this.loadBeneficiaries(this.currentUser.id);
    this.registerForm = this.formBuilder.group({
      beneficiaryId: ['', Validators.required],
      account: {
        id: ['', Validators.required]
      },
      userId: this.currentUser.id
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    this.accountService.addBeneficiary(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Beneficiary added', true);
                this.router.navigate(['/']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }
  private getAccountsForUsers(userId: number){
    this.accountService.getAccountsForUsers(userId).pipe(first()).subscribe(accounts => {
      //console.log(">>> "+JSON.stringify(accounts));
      this.currentUserAccounts = accounts;
    });
  }
  private getUsersById(userId: number) {
    this.userService.getById(userId).pipe(first()).subscribe(user => {
        console.log(JSON.stringify(user));
        this.firstName=user.firstName;
        this.lastName=user.lastName;
        console.log(">>> "+this.firstName);
    });
}

  private loadBeneficiaries(userId: number) {
    this.accountService.getAccountsOfOthers(userId).pipe(first()).subscribe(accounts => {
        this.accountOthers = accounts; 
        accounts.forEach(account => {
            this.account = account;
            this.getUsersById(account.userId);
            this.account.firstName = this.firstName;
            this.account.lastName = this.lastName;
            // this.accountOthers = [];
            // this.accountOthers.push(this.account);
      }); 
    });
  }
}
