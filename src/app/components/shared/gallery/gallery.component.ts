import { Component, OnInit, VERSION } from '@angular/core';
import { LoadingService } from 'src/app/core/loading/loadint.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
 
  image1="https://www.wallpapers13.com/wp-content/uploads/2016/04/Sunrise-Milford-Sound-Queenstown-New-Zealand-Hd-Wallpapers-1920x1080-1440x900.jpg";
  image2="https://t3.ftcdn.net/jpg/03/76/51/12/360_F_376511221_y28EoEEWpIinRch8cSQOjEbFQKfcfF6U.webp";
  image3="https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg?cs=srgb&dl=pexels-pixabay-162031.jpg&fm=jpg";
  image4="https://c4.wallpaperflare.com/wallpaper/49/97/130/adelie-penguin-flock-of-penguins-wallpaper-preview.jpg";
  image5="https://c1.wallpaperflare.com/preview/802/296/837/new-zealand-doubtful-sound-fjord-hut.jpg";
  image6="https://c4.wallpaperflare.com/wallpaper/713/790/399/westland-tai-poutini-national-park-lake-matheson-in-new-zealand-south-island-fox-glacier-township-cook-mountain-hd-wallpapers-for-desktop-3840%C3%972400-wallpaper-preview.jpg";
  image7="https://cdn.wallpapersafari.com/72/73/9prtSo.jpg";
  image8="https://rare-gallery.com/mocahbig/472306-Forza-Horizon-4-Forza-Forza-Games-car-McLaren-Senna.jpg";
  image9="https://wallery.app/dufovot/yellow-fish-in-coral-reef-wallpaper.webp";
  image10="https://images.alphacoders.com/807/807175.jpg";

  defaultImage = this.loadingService.getUrl(); 

  constructor(private loadingService: LoadingService) { }

  ngOnInit() { }
}
