import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loading = new Subject<boolean>();
  loading$ = this.loading.asObservable();

  constructor() { }

  setLoader(status: boolean): void {
    this.loading.next(status);
  }
}
