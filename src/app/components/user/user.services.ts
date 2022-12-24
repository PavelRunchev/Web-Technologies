import { Injectable } from '@angular/core';
import { AngularFireAuth,  } from '@angular/fire/compat/auth';
import { CookieComponent } from '../shared/cookie/cookie.component';
import { ToastrService } from '../../core/toastr/toastr.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private auth: AngularFireAuth,
    private cookie: CookieComponent,
    private toastr: ToastrService,
    private route: Router
  ) { }

  login(email: string, password: string): void {
    this.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        localStorage.setItem('token', 'true');
        this.cookie.setCookie('accessToken', user.user['_delegate'].accessToken, 3);
        this.cookie.setCookie('accessEmail', user.user.email, 3);
        this.toastr.showToastr('success', 'You sign in successfully!', 'top-right', true);
        this.route.navigate(['/home']);
      }).catch(err => {
        console.log(err.message);
        console.log(err['code']);
        this.toastr.showToastr('error', 'Invalid email or password!', 'top-right', true);
      });
  }

  register(email: string, password: string): void {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        localStorage.setItem('token', 'true');
        this.cookie.setCookie('accessToken', user.user['_delegate'].accessToken, 3);
        this.cookie.setCookie('accessEmail', user.user.email, 3);
        this.toastr.showToastr('success', 'You sign up successfully!', 'top-right', true);
        this.route.navigate(['/home']);
      }, err => console.log(err));
  }

  isLoggedIn(): boolean {
    const token = this.cookie.getCookie('accessToken');
    if(token) return true;
    
    return false;
  }
}