import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../../../core/toastr/toastr.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void { }

  logout() {
    localStorage.clear();
    this.toastr.showToastr('success', 'You are logout!', 'top-right', true);
  }
}
