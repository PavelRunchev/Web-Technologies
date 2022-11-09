import { Component } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SPA-Page';

  constructor(private toastr: ToastrService) { }

  ngOnInit() { }

  showToaster() {
    this.toastr.success("Hello Angular", "Toastr is fun!");
  }

  showToastrError() {
    this.toastr.error('everything is broken', 'Major Error');
  }
}
