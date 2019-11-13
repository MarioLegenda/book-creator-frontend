import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PageContextService {
  constructor(
    private http: HttpClient,
    private router: Location
  ) {
  }
}
