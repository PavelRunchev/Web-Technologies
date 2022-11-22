import { Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Technology } from '../../technologies/technology.model';
import { TechnologyService } from '../../technologies/technology.service';

import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  technologies: Technology[] = [];

  newTechnology: Technology = {
    name: "Java",
    imgUrl: "https://www.developer.com/wp-content/uploads/2021/09/Java-tutorials.jpg",
    videoUrl: "https://www.youtube.com/embed/lHK0eDdiiwo",
    description: "It’s been more than 25 years since Java was created, but it is still one of the most popular languages for modern software development. The language’s demand stems from the platform being easy to learn with an extensive collection of APIs. With so many development teams still recognizing these benefits and selecting Java, there’s a pressing need for powerful Java review tools. Another free and open source Java code review tool is FindBugs. Also a static analyzer, this tool scans the code to find defects (or “bugs”), inconsistencies, or security threats in suspicious code sections. FindBugs identifies inconsistencies as warnings, allowing the developer the discretion to review the messages to determine whether they need to take corrective action. Developers can action the warning messages in this Java code review tool either individually or in batches. FindBugs requires JRE 1.7.0 or later to run and analyze any version of Java from 1.0 to 1.8.",
    untrustedVideoUrl: null
  }

  updatedTechnology: Technology = {
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
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    //this.createTechnology(this.newTechnology);
    //this.deleteTechnology('-NGgaRQ-fHzCGkEGkcGA');
    //this.updateTechnology('-NGgQT-k-I97qzOMbpdV', this.updatedTechnology);
    this.getAllTechnologies();
  }

  getAllTechnologies() {
    this.service.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ ...c.payload.val(), id: c.payload.key })))
    ).subscribe(data => {
      this.technologies = data;
      this.technologies
        .map(d => d['untrustedVideoUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(d.videoUrl + ''));
        //console.log(this.technologies[1])
    });
  }

  createTechnology(tech: Technology) {
      this.service.create(tech)
        .then(() => console.log("created new item successfully!"));
  }

  deleteTechnology(id: string) {
    this.service.delete(id).then(() => console.log('The technology was deleted successfully!'));
    this.refreshList();
  }

  updateTechnology(id: string, tech: Technology) {
    this.service.update(id, tech).then(() => console.log('The technology was updated successfully!'));
    this.refreshList();
  }

  refreshList(): void {
    this.technologies = [];
    this.getAllTechnologies();
  }
}
