import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserModel } from '../userModel';
import { UserService } from '../user.services';
import { NavigationComponent } from '../../shared/navigation/navigation.component';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
})
export class LoginRegisterComponent implements OnInit {
  btnRegisterLiStyle: string = 'register-list-item-default';
  btnLoginLiStyle: string = 'login-list-item-default';

  registerForm = new FormGroup({
    email: new FormControl('', 
    [ 
        Validators.required, 
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$') 
    ]
    ),

    password: new FormControl('',
    [   
        Validators.required,
        Validators.minLength(8), 
        Validators.maxLength(32),
        Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$')
    ]
    ),
  });

  loginForm = new FormGroup({
    email: new FormControl('', 
    [ 
        Validators.required, 
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$') 
    ]
    ),

    password: new FormControl('',
    [   
        Validators.required,
        Validators.minLength(8), 
        Validators.maxLength(32),
        Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$')
    ]
    ),
  });

  constructor(
        private userService: UserService,
        private nav: NavigationComponent
    ) { }

  ngOnInit(): void {
    this.btnLoginLiStyle = 'login-list-item';
  }

  login(): void {
    try {
      const user = this.loginForm.value;
      this.userService.login(user.email, user.password);
      this.loginForm.get('email').setValue('');
      this.loginForm.get('password').setValue('');
      this.nav.ngOnInit();
    } catch(err) {
      console.log(err);
    }
  }

  loginAuto(): void {
    this.userService.login('ana@abv.bg', 'Nakururu7902$');
    this.nav.ngOnInit();
  }

  register(): void {
    const newUser: UserModel = this.registerForm.value;
    this.userService.register(newUser.email, newUser.password);
    this.registerForm.get('email').setValue('');
    this.registerForm.get('password').setValue('');
    this.nav.ngOnInit();
  }

  //For btn class login form
  toLoginForm(): void {
    if(this.btnLoginLiStyle == 'login-list-item-default') {
      this.btnLoginLiStyle = 'login-list-item';
      this.btnRegisterLiStyle = 'register-list-item-default';
    } else {
      this.btnLoginLiStyle = 'login-list-item-default';
      this.btnRegisterLiStyle = 'register-list-item-default';
    }
  }

  //For btn class register form
  toRegisterForm(): void {
    if(this.btnRegisterLiStyle == 'register-list-item-default') {
      this.btnRegisterLiStyle = 'register-list-item';
      this.btnLoginLiStyle = 'login-list-item-default';
    } else {
      this.btnRegisterLiStyle = 'register-list-item-default';
      this.btnLoginLiStyle = 'login-list-item-default';
    }
  }
}