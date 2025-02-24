import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BankService } from '../services/bank.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { IdleService } from '../idle.service';
import {  Store } from '@ngrx/store';
import { AppStateInterface } from '../app-state.interface';
import * as CredintialsActions from "../store/credintials-store/credintials.actions";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  usersLst: User[] = [];
  isLogin: boolean = true;
  isSignUp: boolean;
  constructor(
    private fb: FormBuilder,
    private bankserv: BankService,
    private route: Router,
    private idleServ: IdleService,
    private store: Store<AppStateInterface>,
  ) { }


  ngOnInit(): void {
    this.getUser();
    this.idleServ.stopWatching();
  }

  ngOnDestroy(): void { }

  loginForm = this.fb.group({
    userId: ['', [Validators.required]],
    password: ['', [Validators.required]],
    email: [''],
    pass: [''],
  })

  login(formData: any) {
    this.store.dispatch(CredintialsActions.validateCred({ username: formData?.value?.userId, password: formData?.value?.password }))

    // const { userId, password } = formData.value;
    // this.usersLst.forEach(user => {
    //   if (userId === user.uName && password === user.pass) {
    //     localStorage.setItem('user', JSON.stringify(user));
    //     this.idleServ.isLoggedIn.next(true);
    //     this.route.navigate(['/dash']);
    //     localStorage.setItem('USERNAME', user.uName);
    //     if (localStorage.getItem('USERNAME')) {
    //       this.idleServ.startWatching();
    //     }
    //   }
    // });
  }

  get uId() {
    return this.loginForm.controls['userId'];
  }

  get pass() {
    return this.loginForm.controls['password'];
  }

  async getUser() {
    const response = await this.bankserv.getUsers().toPromise();
    if (response) {
      this.usersLst = response;
    }
  }


  onSignup() {
    this.isLogin = false;
    this.isSignUp = true;
  }

}
