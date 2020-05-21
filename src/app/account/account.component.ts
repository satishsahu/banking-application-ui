import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../_services';
import { AccountService } from '../_services/account.service';
import { User } from '../_models';

@Component({
  selector: 'app-account',
  templateUrl: 'account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  currentUser: User;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService) { 
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      type: ['', Validators.required],
      balance: ['', Validators.required],
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
    this.accountService.create(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Account created', true);
                this.router.navigate(['/']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }
}
