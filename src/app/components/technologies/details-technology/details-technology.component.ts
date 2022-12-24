import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { TechnologyService } from '../technology.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TechnologyModel } from '../technology.model';
import { ToastrService } from '../../../core/toastr/toastr.service';
import { LoadingService } from 'src/app/core/loading/loadint.service';
import { DomSanitizer } from "@angular/platform-browser";
import { CookieComponent } from '../../shared/cookie/cookie.component';

@Component({
  selector: 'app-details-technology',
  templateUrl: './details-technology.component.html'
})
export class DetailsTechnologyComponent implements OnInit {
  technology: TechnologyModel = {};
  loading: boolean = true;
  id: string = '';
  userEmail: string;

  constructor(
    private service: TechnologyService,
    private activRoute: ActivatedRoute,
    private route: Router,
    private loadingService: LoadingService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private cookie: CookieComponent
  ) { 
    this.id =  this.activRoute.snapshot.paramMap.get('id');
    this.userEmail = this.cookie.getCookie('accessEmail');
  }

  ngOnInit(): void {
    this.getById(this.id);

  }

  getById(id: string): void {
    this.service.getById(id).valueChanges()
      .subscribe((data: TechnologyModel) => {
        let currentTechnology = data;
        if(currentTechnology != undefined) {
          currentTechnology['untrustedVideoUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(currentTechnology.videoUrl + '');
          currentTechnology['descriptionOne'] = currentTechnology.description.split('. ').slice(0, 7).join('. ');
          currentTechnology['descriptionTwo'] = currentTechnology.description.split('. ').slice(7, 14).join('. ');
          currentTechnology['descriptionThree'] = currentTechnology.description.split('. ').slice(14, 21).join('. ');
          currentTechnology['descriptionFour'] = currentTechnology.description.split('. ').slice(21).join('. ');

          currentTechnology['descriptionOne'] = this.checkForEndDot(currentTechnology['descriptionOne']);
          currentTechnology['descriptionTwo'] = this.checkForEndDot(currentTechnology['descriptionTwo']);
          currentTechnology['descriptionThree'] = this.checkForEndDot(currentTechnology['descriptionThree']);
          currentTechnology['descriptionFour'] = this.checkForEndDot(currentTechnology['descriptionFour']);

          currentTechnology['id'] = this.id;
          this.technology = currentTechnology;
          this.loading = false;
       }
      });
  }

  deleteTechnology(id: string): void {
    if(this.technology.creator == this.userEmail) {
      this.service.delete(id).then(() => {
        this.toastr.showToastr('success', 'Technology is deleted!', 'top-right', true);
        this.route.navigate(['/technology/viewTechnologies']);
      });
    }
  }

  backToHome(): void {
    this.route.navigate(['/technology/viewTechnologies']);
  }

  checkForEndDot(str: string): string {
    if(str[str.length - 1] != '.' || str[str.length - 1] != ' .')
      str += '.';
    return str;
  }
}
