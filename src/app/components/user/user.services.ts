import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CookieComponent } from '../shared/cookie/cookie.component';
import { ToastrService } from '../../core/toastr/toastr.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private cookie: CookieComponent,
    private toastr: ToastrService,
    private route: Router,
    private auth: AngularFireAuth
  ) { }

  async login(email: string, password: string): Promise<void> {
    await this.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          localStorage.setItem('token', 'true');
          this.cookie.setCookie('accessToken', user.user['accessToken'], 3);
          this.cookie.setCookie('accessEmail', user.user.email, 3);
          this.toastr.showToastr('success', 'You login successfully!', 'top-right', true);
          this.route.navigate(['/home']);
        }).catch(err => {
          console.log(err.message);
          this.toastr.showToastr('error', 'Invalid email or password!', 'top-right', true);
      });
  }

  async register(email: string, password: string): Promise<void> {
      await this.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
          localStorage.setItem('token', 'true');
          this.cookie.setCookie('accessToken', user.user['accessToken'], 3);
          this.cookie.setCookie('accessEmail', user.user.email, 3);
          this.toastr.showToastr('success', 'You register successfully!', 'top-right', true);
          this.route.navigate(['/home']);
        }).catch (err => {
          this.toastr.showToastr('error', 'Email is already exist!', 'top-right', true);
        });
  }

  isLoggedIn(): boolean {
    const token = this.cookie.getCookie('accessToken');
    if(token) return true;
    
    return false;
  }
}