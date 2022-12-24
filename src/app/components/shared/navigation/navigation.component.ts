import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../../../core/toastr/toastr.service';
import { CookieComponent } from '../cookie/cookie.component';
import { UserService } from '../../user/user.services';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  notification: number = 3;

  //implement get all technologies and search by name
  data: Array<string> = ["jQuery", "Angular", "React", "VueJS"];

  constructor(
    private toastr: ToastrService,
    private cookie: CookieComponent,
    public userService: UserService
  ) { }

  ngOnInit(): void { }

  ngOnChanges(num: number): void {
    if(num > 0) ++this.notification;
    else --this.notification;
    document.querySelector('.badge-notification').innerHTML = `${this.notification}`;
   }

  logout(): void {
    this.toastr.showToastr('success', 'You are logout!', 'top-right', true);
    this.cookie.setCookie('accessCookie', '', -1);
    this.cookie.setCookie('accessEmail', '', -1);
    this.cookie.setCookie('isCookie', '', -1);
    this.cookie.setCookie('accessToken', '', -1);
    localStorage.clear();
    this.cookie.styleClass = 'flex';
  }

  submitSearch(name: any): void {
    if(name.value != '') {
      if(this.data.find(t => t == name.value)) {
        this.toastr.showToastr('success', "It's has match!", 'top-right', true);
      } else {
        this.toastr.showToastr('info', 'No match!', 'top-right', true);
      }

      name.value = '';
    } else {
      this.toastr.showToastr('warn', 'Empty field!', 'top-right', true);
    }
  }
}
