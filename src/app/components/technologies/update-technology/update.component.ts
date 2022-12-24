import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TechnologyService } from '../technology.service';

import { TechnologyModel } from '../technology.model';
import { ToastrService } from '../../../core/toastr/toastr.service';
import { LoadingService } from 'src/app/core/loading/loadint.service';
import { DomSanitizer } from "@angular/platform-browser";
import { CookieComponent } from '../../shared/cookie/cookie.component';

@Component({
  selector: 'app-update-technology',
  templateUrl: './update.component.html'
})
export class UpdateTechnologyComponent implements OnInit {
  technology: TechnologyModel = {};
  loading: boolean = true;
  id: string = '';
  isOwner: boolean = false;
  userEmailFromCookie: string;

  isFocusName: boolean = true;
  isFocusImgUrl: boolean = true;
  isFocusImgUrl2: boolean = true;
  isFocusGifUrl: boolean = true;
  isFocusVideoUrl: boolean = true;
  isFocusDescription: boolean = true;

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
      [ Validators.required, Validators.minLength(1000), Validators.maxLength(15000) ]
    ),
  });

  constructor(
    private service: TechnologyService,
    private activRoute: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private coockie: CookieComponent
  ) { 
    this.id =  this.activRoute.snapshot.paramMap.get('id');
    this.userEmailFromCookie = this.coockie.getCookie('accessEmail');
  }

  ngOnInit(): void {
    this.getById(this.id);
  }

  getById(technology_id: string) {
    this.service.getAll().snapshotChanges().pipe(
     map(data =>
       data.map(c => ({ ...c.payload.val(), id: c.payload.key })))
    ).subscribe(collecton => {
       let currentTechnology = collecton.filter(t => t.id == technology_id)[0];
       if(currentTechnology != undefined) {
          currentTechnology['untrustedVideoUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(currentTechnology.videoUrl + '');
          currentTechnology['descriptionOne'] = currentTechnology.description.split('. ').slice(0, 7).join('. ');
          currentTechnology['descriptionTwo'] = currentTechnology.description.split('. ').slice(7, 16).join('. ');
          this.technology = currentTechnology;
          this.technologyForm.get('name').setValue(this.technology.name);
          this.technologyForm.get('imgUrl').setValue(this.technology.imgUrl);
          this.technologyForm.get('imgUrl2').setValue(this.technology.imgUrl2);
          this.technologyForm.get('gifUrl').setValue(this.technology.gifUrl);
          this.technologyForm.get('videoUrl').setValue(this.technology.videoUrl);
          this.technologyForm.get('description').setValue(this.technology.description);
          this.loading = false;

          this.isAccessForUpdate();
       }
    });
  }

  updateTechnology(): void {
    const newObject: TechnologyModel = this.technologyForm.value;
    if(newObject.name != '' && newObject.imgUrl != '' 
      && newObject.imgUrl2 != '' && newObject.gifUrl != ''
      && newObject.videoUrl != '') {
        if(this.isOwner) {
          this.service.update(this.id, newObject)
          .then(() => {
            this.toastr.showToastr('success', 'The technology was updated successfully!', 'top-right', true);
            this.router.navigate([`/technology/detailsTechnology/${this.id}`]);
          }, err => {
            this.toastr.showToastr('error', `${err}`, 'top-right', true)
          }); 
        } else {
          this.toastr.showToastr('error', 'Only creator can update it!', 'top-right', true);
        }
      } else {
        this.toastr.showToastr('error', 'Invalid Form!', 'top-right', true);
      }
  }

  backToTechnology(): void {
    this.router.navigate([`/technology/detailsTechnology/${this.id}`]);
  }

  isAccessForUpdate(): void {
    if(this.userEmailFromCookie == this.technology.creator) {
      this.technologyForm.controls['name'].enable();
      this.technologyForm.controls['imgUrl'].enable();
      this.technologyForm.controls['imgUrl2'].enable();
      this.technologyForm.controls['gifUrl'].enable();
      this.technologyForm.controls['videoUrl'].enable();
      this.technologyForm.controls['description'].enable();
      this.isOwner = true;
    } else {
      this.technologyForm.controls['name'].disable();
      this.technologyForm.controls['imgUrl'].disable();
      this.technologyForm.controls['imgUrl2'].disable();
      this.technologyForm.controls['gifUrl'].disable();
      this.technologyForm.controls['videoUrl'].disable();
      this.technologyForm.controls['description'].disable();
      this.isOwner = false;
    }
  }
}