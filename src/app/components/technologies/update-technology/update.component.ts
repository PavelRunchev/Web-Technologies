import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TechnologyService } from '../technology.service';

import { TechnologyModel } from '../technology.model';
import { ToastrService } from '../../../core/toastr/toastr.service';
import { LoadingService } from 'src/app/core/loading/loadint.service';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-update-technology',
  templateUrl: './update.component.html'
})
export class UpdateTechnologyComponent implements OnInit {
  technology: TechnologyModel = {};
  loading: boolean = true;
  id: string = '';

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
    public toastr: ToastrService
  ) { 
    this.id =  this.activRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getById(this.id);
  }

  getById(key: string) {
    this.service.getAll().snapshotChanges().pipe(
     map(data =>
       data.map(c => ({ ...c.payload.val(), id: c.payload.key })))
    ).subscribe(collecton => {
       let currentCollecton = collecton.filter(t => t.id == key)[0];
       if(currentCollecton != undefined) {

        currentCollecton['untrustedVideoUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(currentCollecton.videoUrl + '');
        //  if(currentCollecton.gif !== undefined && currentCollecton.gif[0] == 'h') {
        //     currentCollecton['gifUrl'] = currentCollecton.gif;
        //     currentCollecton.gif = null;
        //  }

         currentCollecton['descriptionOne'] = currentCollecton.description.split('. ').slice(0, 7).join('. ');
         currentCollecton['descriptionTwo'] = currentCollecton.description.split('. ').slice(7, 16).join('. ');
         this.technology = currentCollecton;
         this.technologyForm.get('name').setValue(this.technology.name);
         this.technologyForm.get('imgUrl').setValue(this.technology.imgUrl);
         this.technologyForm.get('imgUrl2').setValue(this.technology.imgUrl2);
         this.technologyForm.get('gifUrl').setValue(this.technology.gifUrl);
         this.technologyForm.get('videoUrl').setValue(this.technology.videoUrl);
         this.technologyForm.get('description').setValue(this.technology.description);
         this.loading = false;
       }
    });
  }

  updateTechnology() {
    const newObject: TechnologyModel = this.technologyForm.value;
    if(newObject.name != '' && newObject.imgUrl != '' 
      && newObject.imgUrl2 != '' && newObject.gifUrl != ''
      && newObject.videoUrl != '') {
        this.service.update(this.id, newObject)
          .then(() => {
            this.toastr.showToastr('success', 'Update Technology successfuly!', 'top-right', true);
            this.router.navigate([`/technology/detailsTechnology/${this.id}`]);
          }, err => {
            this.toastr.showToastr('error', `${err}`, 'top-right', true)
          }); 
      } else {
        this.toastr.showToastr('error', 'Invalid Form!', 'top-right', true);
      }
  }

  backToTechnology() {
    this.router.navigate([`/technology/detailsTechnology/${this.id}`]);
  }
}