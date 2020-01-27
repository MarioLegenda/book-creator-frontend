import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BlogRepository} from "../../../../repository/BlogRepository";
import {MatDialog} from "@angular/material/dialog";
import {RemoveConfirmDialogComponent} from "../../modals/removeConfirm/remove-confirm-modal.component";
import {HttpModel} from "../../../../model/http/HttpModel";
import {CodeProjectsRepository} from "../../../../repository/CodeProjectsRepository";
import {Router} from "@angular/router";
import {Environments} from "../../../../library/Environments";
import {Month} from "../../../../library/Month";
import {RemoveItemService} from "../../sharedServices/RemoveItemService";
import {titleResolver} from "../../sharedServices/titleResolver";
import {NewCodeProjectDialogComponent} from "../../../shared/modules/newCodeProjectModal/newCodeProject/new-code-project.component";

@Component({
  selector: 'cms-cp-item',
  styleUrls: [
    './item.component.scss',
  ],
  templateUrl: './item.component.html',
})
export class ItemComponent implements OnInit {
  @Input('item') item;

  @Output('itemDeleted') itemDeleted = new EventEmitter();

  componentState = {
    realTitle: '',
  };

  constructor(
    private router: Router,
    private codeProjectsRepository: CodeProjectsRepository,
    private dialog: MatDialog,
    private removeItemService: RemoveItemService,
  ) {}

  ngOnInit() {
    this.resolveName();
  }

  onManage($event) {
    $event.stopPropagation();
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

    this.removeItemService.remove(
      this.codeProjectsRepository,
      'removeCodeProject',
      () => HttpModel.removeCodeProject(this.item.uuid),
      this.item,
      this.itemDeleted,
      'Are you sure you wish to remove this code project? This action cannot be undone.'
    );
  }

  formattedDate(): string {
    const d = new Date(this.item.createdAt);

    const month = Month.get(d.getMonth());
    const date = d.getDate();
    const year = d.getFullYear();

    return `${month} ${date}. ${year}`;
  }

  formatEnvironment(): string {
    return Environments.get(this.item.environment);
  }

  private resolveName(): void {
    this.componentState.realTitle = titleResolver(this.item.name, 37);
  }
}
