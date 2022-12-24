import { Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { TechnologyModel } from '../../technologies/technology.model';
import { TechnologyService } from '../../technologies/technology.service';
import { DomSanitizer } from "@angular/platform-browser";

import { LoadingService } from 'src/app/core/loading/loadint.service';

@Component({
  selector: 'app-view-technologies',
  templateUrl: './view-technologies.html'
})
export class ViewTechnologiesComponent implements OnInit {
  technologies: TechnologyModel[] = [];
  loading: boolean = true;

  constructor(
    private service: TechnologyService, 
    private sanitizer: DomSanitizer,
    private loadingService: LoadingService,
  ) { }

  ngOnInit() {
    this.getAllTechnologies();
  }

  getAllTechnologies(): void {
    this.service.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ ...c.payload.val(), id: c.payload.key })))
    ).subscribe(data => {
      this.technologies = data;
      this.technologies
        .map(d => { 
          d['untrustedVideoUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(d.videoUrl + '');
          d['partDescription'] = d.description.split('. ').slice(0, 7).join('. ') + "...";
        });
      this.loading = false;
    });
  }
}