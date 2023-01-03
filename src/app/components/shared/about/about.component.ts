import { Component, OnInit, VERSION } from '@angular/core';
import { LoadingService } from 'src/app/core/loading/loadint.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  image = "https://static.wixstatic.com/media/nsplsh_1aca655bcbe44db8bbae2571cf6fe2ea~mv2.jpg/v1/fit/w_2500,h_1330,al_c/nsplsh_1aca655bcbe44db8bbae2571cf6fe2ea~mv2.jpg";

  defaultImage = this.loadingService.getUrl(); 

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void { }
}
