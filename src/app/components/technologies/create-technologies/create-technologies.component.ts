import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TechnologyService } from '../technology.service';
import { Router } from '@angular/router';
import { Technology } from './../technology.model';
import { ToastrService } from '../../../core/toastr/toastr.service';


@Component({
  selector: 'app-create-technologies',
  templateUrl: './create-technologies.component.html',
  styleUrls: ['./create-technologies.component.scss']
})
export class CreateTechnologiesComponent implements OnInit {
  private failed: boolean = false;
  isFocusName: boolean = false;
  isFocusImgUrl: boolean = false;
  isFocusImgUrl2: boolean = false;
  isFocusGifUrl: boolean = false;
  isFocusVideoUrl: boolean = false;
  isFocusDescription: boolean = false;

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
    public toastr: ToastrService
  ) {
   
   }

  ngOnInit(): void {
      
  }

  createTechnology() {
    const newObjectTech: Technology = this.technologyForm.value;
    this.service.create(null)
        .then((d) => {
          console.log(d);
          console.log("created new item successfully!");
          this.toastr.showToastr('success', 'Create Technology successfuly!', 'top-right', true);
          this.router.navigate(['/home']);
        }, err => {
          console.log(err);
          this.toastr.showToastr('error', `${err}`, 'top-right', true)
        });
  }
}
