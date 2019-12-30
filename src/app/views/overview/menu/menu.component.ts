import {Component} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'cms-overview-menu',
  styleUrls: [
    './menu.component.scss',
  ],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  type: string;

  constructor(
    private router: Router,
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.type = event.url.split("/")[3];
      }
    });
  }
}
