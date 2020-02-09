import {Component, Inject} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'cms-user-section-menu',
  styleUrls: [
    './../../../shared/styles/menu.component.scss',
  ],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  type: string;

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit() {
    this.determineType();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.determineType();
      }
    });
  }

  private determineType() {
    const url = this.document.location.pathname;
    let type = null;

    const re = {
      'profile': new RegExp("user-section/profile"),
      'settings': new RegExp("user-section/settings"),
    };

    const keys = Object.keys(re);

    for (const k of keys) {
      if (re[k].test(url)) {
        type = k;

        break;
      }
    }

    if (type) {
      this.type = type;
    } else {
      this.type = null;
    }
  }
}
