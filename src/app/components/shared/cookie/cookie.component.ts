import { Component, OnInit } from '@angular/core';

import * as uuid from 'uuid';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html'
})
export class CookieComponent implements OnInit {
    styleClass:string = 'flex';
    token: string;
    cookie: string = null;

    constructor() {
        this.token = uuid.v4();
        if(this.getCookie('accessCookie') && this.getCookie('isCookie')
         && localStorage.getItem('accessCookie')) 
            this.styleClass = 'none';
     }

    ngOnInit(): void { }

    isHidden(): void {
      if(this.cookie == null || this.cookie == '') {
        this.styleClass = 'none';
        this.setCookie('accessCookie', this.token, 5);
        this.setCookie('isCookie', this.token, 5);
      }
    }

    setCookie(name: string, value: string, expdays: number): void {
      const d = new Date();
      d.setTime(d.getTime() + (expdays*24*60*60*1000));
      let expires = "expires="+ d.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
      localStorage.setItem(name, value);
    }

    getCookie(name: string): string {
      const cookies = document.cookie;
      if(cookies == null || '') return null;

      for (const cookie of cookies.split('; ')) {
        const c = cookie.split('=')[0];
        if(c == name) 
          return cookie.split('=')[1];
      }

      return null;
    }
}