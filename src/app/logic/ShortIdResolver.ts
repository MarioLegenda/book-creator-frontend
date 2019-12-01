import {Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ShortIdResolver {
  constructor(
    private router: Router
  ) {
  }
}
