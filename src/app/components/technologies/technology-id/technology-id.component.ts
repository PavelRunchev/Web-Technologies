import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { TechnologyService } from '../technology.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Technology } from './../technology.model';
import { ToastrService } from '../../../core/toastr/toastr.service';
import { LoadingService } from 'src/app/core/loading/loadint.service';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-technology-id',
  templateUrl: './technology-id.component.html',
  styleUrls: ['./technology-id.component.scss']
})
export class TechnologyIDComponent implements OnInit {
  technology: Technology = {};
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
      map(changes =>
        changes.map(c => ({ ...c.payload.val(), id: c.payload.key })))
    ).subscribe(data => {
        let curentItem = data.filter(t => t.id == key)[0];
        if(curentItem != undefined) {

          curentItem['untrustedVideoUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(curentItem.videoUrl + '');
          if(curentItem.gif !== undefined && curentItem.gif[0] == 'h') {
            curentItem['gifUrl'] = curentItem.gif;
            curentItem.gif = null;
          }

          this.technology = curentItem;
          this.loading = false;
        }
    });
  }

  deleteTechnology(key: string) {
    console.log('delete');
    this.service.delete(key).then(() => {
      this.toastr.showToastr('success', 'Technology is deleted!', 'top-right', true);
      this.route.navigate(['/home']);
    });
  }

  backToHome() {
    this.route.navigate(['/home']);
  }
}
