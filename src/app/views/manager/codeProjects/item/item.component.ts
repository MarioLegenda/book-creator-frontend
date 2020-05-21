import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {HttpModel} from "../../../../model/http/HttpModel";
import {CodeProjectsRepository} from "../../../../repository/CodeProjectsRepository";
import {Router} from "@angular/router";
import {Month} from "../../../../library/Month";
import {titleResolver} from "../../shared/titleResolver";
import {NewCodeProjectDialogComponent} from "../../../shared/modules/newCodeProjectModal/newCodeProject/new-code-project.component";
import {RemoveCodeProjectModalComponent} from "../../modals/removeCodeProject/remove-code-project-modal.component";

@Component({
  selector: 'cms-cp-item',
  styleUrls: [
    './../../../shared/styles/item-listing.component.scss',
    './item.component.scss',
  ],
  templateUrl: './item.component.html',
})
export class ItemComponent implements OnInit {
  @Input('item') item;
  @Input('wrapperClasses') wrapperClasses: string;
  @Input('includeEdit') includeEdit: boolean = true;
  @Input('includeDelete') includeDelete: boolean = true;

  @Output('itemDeleted') itemDeleted = new EventEmitter();

  realTitle: string = '';

  constructor(
    private router: Router,
    private codeProjectsRepository: CodeProjectsRepository,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.resolveName();
  }

  onEdit($event) {
    $event.stopPropagation();

    const dialogRef = this.dialog.open(NewCodeProjectDialogComponent, {
      width: '480px',
      data: {
        name: this.item.name,
        description: this.item.description,
        environment: this.item.environment,
        buttonText: 'Edit',
        title: 'Edit code project',
        doHttpAction: false,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) return;

      const name: string = data.name;
      const description: string = data.description;
      const environment: string = data.environment;

      const model = HttpModel.updateCodeProject(
        this.item.uuid,
        name,
        description,
        environment,
      );

      this.codeProjectsRepository.updateCodeProject(model).subscribe((res) => {
        this.item.updatedAt = res.updatedAt;
        this.item.name = res.name;
        this.item.description = res.description;
        this.item.environment = res.environment;

        this.resolveName();
      });
    });
  }

  onRemove($event) {
    $event.stopPropagation();

    const dialogRef = this.dialog.open(RemoveCodeProjectModalComponent, {
      width: '480px',
      data: {
        uuid: this.item.uuid,
      }
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.itemDeleted.emit(this.item);
      }
    });
  }

  formattedDate(): string {
    const d = new Date(this.item.createdAt);

    const month = Month.get(d.getMonth());
    const date = d.getDate();
    const year = d.getFullYear();

    return `${month} ${date}. ${year}`;
  }

  formatEnvironment(): string {
    return this.item.environment.text;
  }

  private resolveName(): void {
    this.realTitle = titleResolver(this.item.name, 37);
  }
}
