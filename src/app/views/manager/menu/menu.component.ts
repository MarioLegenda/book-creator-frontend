import {Component} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddKnowledgeSourceDialogComponent } from '../modals/addKnowledgeSource/add-knowledge-source.component';

@Component({
  selector: 'cms-overview-menu',
  styleUrls: [
    './menu.component.scss',
  ],
  templateUrl: './menu.component.html',
})
export class OverviewMenuComponent {
  type: string;

  componentState = {
    icons: {
      'new': 'fa fa-plus',
    }
  };

  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.type = event.url.split("/")[4];
      }
    });
  }

  addKsDialog(): void {
    let ksUrl = new RegExp("knowledge-source");
    let cp = new RegExp("code-projects");

    if (ksUrl.test(this.router.url)) {
      this.dialog.open(AddKnowledgeSourceDialogComponent, {
        width: '400px',
        data: {},
      });
    } else if (cp.test(this.router.url)) {
      console.log('Code project new');
    }
  }
}
