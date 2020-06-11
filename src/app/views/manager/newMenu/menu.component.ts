import {Component, Inject} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {NewItemComponent} from '../modals/newItem/new-item.component';
import {NewCodeProjectDialogComponent} from "../../shared/modules/newCodeProjectModal/newCodeProject/new-code-project.component";
import {CodeProjectsRepository} from "../../../repository/CodeProjectsRepository";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'cms-management-menu',
  styleUrls: [
    './menu.component.scss',
  ],
  templateUrl: './menu.component.html',
})
export class ManagementMenuComponent {
  type: string;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private codeProjectsRepository: CodeProjectsRepository,
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

  onNew() {
    const dialogRef = this.dialog.open(NewItemComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (!confirm) return;

      if (confirm === 'open-code-project') {
        const dialogRef = this.dialog.open(NewCodeProjectDialogComponent, {
          width: '480px',
          data: {
            name: '',
            description: '',
            buttonText: 'Create',
            title: 'New code project',
            doHttpAction: true,
          },
        });

        dialogRef.afterClosed().subscribe((codeProject) => {
          if (!codeProject) return;

          this.router.navigate([
            '/cms/code-editor',
            codeProject.shortId,
          ]);
        });
      }
    })
  }

  private determineType() {
    const url = this.document.location.pathname;
    let type = null;

    const re = {
      'blogs': new RegExp("blogs/list"),
      'code-projects': new RegExp("code-projects/list"),
      'profile': new RegExp("user-section/profile"),
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
