import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'cms-user-section-bootstrap',
  styleUrls: [
    './bootstrap.component.scss',
  ],
  templateUrl: './bootstrap.component.html',
})
export class BootstrapComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
  ) {}

  ngOnInit() {
    if (this.document.location.pathname === '/cms/management/user-section') {
      this.router.navigate(['/cms/management/user-section/profile']);
    }
  }
}
