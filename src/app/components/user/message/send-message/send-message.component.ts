import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../../../../core/toastr/toastr.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
})
export class SendMessageComponent implements OnInit {
  messageForm = new FormGroup({
    email: new FormControl('', 
      [ Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')]
    ),

    description: new FormControl('',
      [ Validators.minLength(10), Validators.maxLength(5000) ]
    ),
  });

  constructor(public toastr: ToastrService) { }

  ngOnInit(): void {
  }

  sendMessage() {
    if(!this.messageForm.errors) {
      this.toastr.showToastr('success', 'Message is sended!', 'top-right', true);
      this.messageForm.get('email').setValue('');
      this.messageForm.get('description').setValue('');
    }
  }

  myProfileSaveChanges() {
    this.toastr.showToastr('success', 'Profile settings change successfully!', 'top-right', true);
  }
}