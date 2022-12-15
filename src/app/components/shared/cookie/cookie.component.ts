import { Component, OnInit } from '@angular/core';

import * as uuid from 'uuid';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html'
})
export class CookieComponent implements OnInit {
    styleClass:string = 'flex';
    token: string;
    cookie: string;

    constructor() {
        this.token = uuid.v4();
        this.cookie = window.localStorage.getItem('accessCookie');

        if(this.cookie != null) this.styleClass = 'none';
     }

    ngOnInit(): void {
    }

    isHidden() {
      if(this.cookie == null) {
        this.styleClass = 'none';
        window.localStorage.setItem('accessCookie', this.token);
      }
    }
}