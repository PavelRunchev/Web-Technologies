import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TechnologyService } from '../technology.service';
import { Router } from '@angular/router';
import { TechnologyModel } from './../technology.model';
import { ToastrService } from '../../../core/toastr/toastr.service';
import { CookieComponent } from '../../shared/cookie/cookie.component';

@Component({
  selector: 'app-create-technologies',
  templateUrl: './create-technologies.component.html'
})
export class CreateTechnologiesComponent implements OnInit {
  isFocusName: boolean = false;
  isFocusImgUrl: boolean = false;
  isFocusImgUrl2: boolean = false;
  isFocusGifUrl: boolean = false;
  isFocusVideoUrl: boolean = false;
  isFocusDescription: boolean = false;
  creator: string;

  technologyForm = new FormGroup({
    name: new FormControl('', 
      [ Validators.required, Validators.minLength(3), 
        Validators.pattern('^[A-Za-z0-9-_!&%$ ]+$') 
      ]
    ),

    imgUrl: new FormControl('',
      [ Validators.required, 
        Validators.pattern(`^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$`) 
      ]
    ),

    imgUrl2: new FormControl('',
      [ Validators.required, 
        Validators.pattern(`^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$`) 
      ]
    ),

    gifUrl: new FormControl('',
      [ Validators.required, 
        Validators.pattern(`^https?:\/\/.*\/.*\.gif\??.*$`) 
      ]
    ),

    videoUrl: new FormControl('',
      [ Validators.required, 
        Validators.pattern(`^https?:\/\/.*\/embed\/.+$`) 
      ]
    ),

    description: new FormControl('',
      [ Validators.required, Validators.minLength(100), Validators.maxLength(5000) ]
    ),
  });

  constructor(
    private router: Router,
    private service: TechnologyService,
    private toastr: ToastrService,
    private cookie: CookieComponent
  ) { 
    this.creator = this.cookie.getCookie('accessEmail');

  }

  ngOnInit(): void { }

  createTechnology(): void {
    let newObjectTech: TechnologyModel = this.technologyForm.value;
    newObjectTech['creator'] = this.creator;

    if(newObjectTech.name != '' && newObjectTech.imgUrl != '' 
      && newObjectTech.imgUrl2 != '' && newObjectTech.gifUrl != ''
      && newObjectTech.videoUrl != '') {
        this.service.create(newObjectTech)
        .then(() => {
          this.toastr.showToastr('success', 'Create Technology successfully!', 'top-right', true);
          this.router.navigate(['/technology/viewTechnologies']);
        }, err => {
          this.toastr.showToastr('error', `${err}`, 'top-right', true)
        }); 
      } else {
        console.log('invalid');
      }
  }

  backToTechnology(): void {
    this.router.navigate(['/technology/viewTechnologies']);
  }
}
