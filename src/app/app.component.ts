import { Component, OnInit } from '@angular/core';
import { ToastrService } from './core/toastr/toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Web-Technologies';
  showToastr: boolean = false;
  toastrMsg: string = '';
  toastrType: string = '';
  toastrPosition: string = '';

  constructor(public toastr: ToastrService) {}

  ngOnInit(): void {
    this.toastr.status.subscribe((msg: string) => {
      this.toastrType = localStorage.getItem('toastrType') || '';
      this.toastrPosition = localStorage.getItem('ToastrPosition') || 'top-right';
      if(msg === null) {
        this.showToastr = false;
      } else {
        this.showToastr = true;
        this.toastrMsg = msg;
      }
    });
  }

  closeToastr() {
    this.showToastr = false;
  }
}
