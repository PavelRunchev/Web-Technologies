import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../../../../core/toastr/toastr.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
})
export class MyProfileComponent implements OnInit {

  constructor(public toastr: ToastrService) { }

  ngOnInit(): void { }

  myProfileSaveChanges(): void {
    this.toastr.showToastr('success', 'Profile settings change successfully!', 'top-right', true);
  }

}