import { Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { TechnologyModel } from '../../technologies/technology.model';
import { TechnologyService } from '../../technologies/technology.service';
import { DomSanitizer } from "@angular/platform-browser";

import { LoadingService } from 'src/app/core/loading/loadint.service';
import { AngularFireAuth,  } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  technologies: TechnologyModel[] = [];
  loading: boolean = true;

  updatedTechnology: TechnologyModel = {
    name: "SASS",
    imgUrl: "https://www.ionos.com/digitalguide/fileadmin/DigitalGuide/Teaser/sass.jpg",
    imgUrl2: "https://res.cloudinary.com/practicaldev/image/fetch/s--N5peVEVC--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/t0d6457k6jo5a8metzfi.png",
    gif: "../../../assets/image/scss.gif",
    videoUrl: "https://www.youtube.com/embed/itEFprr8soo",
    description: "If you use CSS, learning SASS will save heaps of time, code and pain. It's basically CSS with more features and functionality, and while it's been around for a while now, it's good to know and understand it inside and how to take full potential of its abilities. SASS is pre-processed CSS with tools like nesting, variables, mixins and more. Writing in SASS and then compiling your code to CSS ends up being the same result (CSS) however the pre-processed SASS has more flexibility.",
    untrustedVideoUrl: null
  }

  constructor(
    private service: TechnologyService, 
    private sanitizer: DomSanitizer,
    private loadingService: LoadingService,
    private auth: AngularFireAuth,
  ) { }

  ngOnInit() {
    //this.deleteTechnology('-NGgaRQ-fHzCGkEGkcGA');
    //this.updateTechnology('-NGgQT-k-I97qzOMbpdV', this.updatedTechnology);
    //this.service.login('setty_ii@abv.bg', 'y8Xa4jlTVnUNcOUnp16mz9ASJtP2');
    this.getData();
  }

  getData() {
    this.auth.signInWithEmailAndPassword('raiders@abv.bg', '123456')
    .then(() => {
      localStorage.setItem('token', 'true');
      this.getAllTechnologies();
    }, err => console.log(err));
  }

  getAllTechnologies() {
    this.service.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ ...c.payload.val(), id: c.payload.key })))
    ).subscribe(data => {
      this.technologies = data;
      this.technologies
        .map(d => { 
          d['untrustedVideoUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(d.videoUrl + '');
          if(d.gif !== undefined && d.gif[0] == 'h') {
            d['gifUrl'] = d.gif;
            d.gif = null;
          }
        });
      this.loading = false;
    });
  }
}
