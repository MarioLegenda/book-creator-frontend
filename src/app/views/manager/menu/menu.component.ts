import {Component} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddKnowledgeSourceDialogComponent } from '../modals/addKnowledgeSource/add-knowledge-source.component';
import {NewCodeProjectDialogComponent} from "../../shared/modules/newCodeProjectModal/newCodeProject/new-code-project.component";
import {HttpModel} from "../../../model/http/HttpModel";
import {CodeProjectsRepository} from "../../../repository/CodeProjectsRepository";

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
    private codeProjectsRepository: CodeProjectsRepository,
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
      const dialogRef = this.dialog.open(NewCodeProjectDialogComponent, {
        width: '480px',
        data: {
          name: '',
          description: '',
          buttonText: 'Create',
          title: 'New code project'
        },
      });

      dialogRef.afterClosed().subscribe((data) => {
        if (!data) return;

        this.codeProjectsRepository.createCodeProject(HttpModel.createCodeProject(
          data.name,
          data.description,
          data.environment,
        )).subscribe((codeProject: any) => {
          this.router.navigate([
            '/cms/code-editor',
            codeProject.shortId,
          ]);
        })
      });
    }
  }
}
