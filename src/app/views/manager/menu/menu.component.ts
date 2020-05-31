import {Component, Inject} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddKnowledgeSourceDialogComponent } from '../modals/addKnowledgeSource/add-knowledge-source.component';
import {NewCodeProjectDialogComponent} from "../../shared/modules/newCodeProjectModal/newCodeProject/new-code-project.component";
import {CodeProjectsRepository} from "../../../repository/CodeProjectsRepository";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'cms-overview-menu',
  styleUrls: [
    './../../shared/styles/menu.component.scss',
  ],
  templateUrl: './menu.component.html',
})
export class OverviewMenuComponent {
  type: string;

  componentState = {
    icons: {
      'new': 'fa fa-plus',
    },
    newButton: true,
  };

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

  addKsDialog(): void {
    if (this.type === 'blogs') {
      this.dialog.open(AddKnowledgeSourceDialogComponent, {
        width: '400px',
        data: {},
      });
    } else if (this.type === 'code-projects') {
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
