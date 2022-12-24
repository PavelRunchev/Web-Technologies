import { Injectable } from '@angular/core';
import { GetDownloadURLPipe } from '@angular/fire/compat/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class LoadingService {
  visibility: BehaviorSubject<boolean>;
  loadingUrl: string = '../../../../assets/images/loading-animated-gif_56.gif';

  constructor() {
    this.visibility = new BehaviorSubject(false);
  }

  show(): void {
    this.visibility.next(true);
  }

  hide(): void {
    this.visibility.next(false);
  }

  getUrl(): string {
    return this.loadingUrl;
  }
}