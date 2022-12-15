import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { TechnologyService } from '../technology.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TechnologyModel } from '../technology.model';
import { ToastrService } from '../../../core/toastr/toastr.service';
import { LoadingService } from 'src/app/core/loading/loadint.service';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-details-technology',
  templateUrl: './details-technology.component.html'
})
export class DetailsTechnologyComponent implements OnInit {
  technology: TechnologyModel = {};
  loading: boolean = true;
  id: string = '';


  constructor(
    private service: TechnologyService,
    private activRoute: ActivatedRoute,
    private route: Router,
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
          currentCollecton['descriptionOne'] = currentCollecton.description.split('. ').slice(0, 10).join('. ') + '.';
          currentCollecton['descriptionTwo'] = currentCollecton.description.split('. ').slice(10, 17).join('. ') + '.';
          currentCollecton['descriptionThree'] = currentCollecton.description.split('. ').slice(17).join('. ');
          this.technology = currentCollecton;
          this.loading = false;
       }
    });
  }

  deleteTechnology(key: string) {
    // this.service.delete(key).then(() => {
    //   this.toastr.showToastr('success', 'Technology is deleted!', 'top-right', true);
    //   this.route.navigate(['/home']);
    // });
  }

  backToHome() {
    this.route.navigate(['/technology/viewTechnologies']);
  }

  updateTechnology(id: string, tech: TechnologyModel) {
    this.service.update(id, tech).then(() => console.log('The technology was updated successfully!'));
  }
}
