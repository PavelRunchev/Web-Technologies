import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { UserService } from '../user/user.services';
import { ToastrService } from '../../core/toastr/toastr.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
        private userService: UserService, 
        private router: Router,
        private toastr: ToastrService
    ) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.isLoggedIn() !== true) {
        this.toastr.showToastr('error', "Accees Denied!\nYou don't authenticated!", 'top-right', true);
        this.router.navigate(['/home']);
    }

    return true;
  }
}