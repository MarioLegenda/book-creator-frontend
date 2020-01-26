import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BlogRepository} from "../../../../repository/BlogRepository";
import {MatDialog} from "@angular/material/dialog";
import {RemoveConfirmDialogComponent} from "../../modals/removeConfirm/remove-confirm-modal.component";
import {HttpModel} from "../../../../model/http/HttpModel";
import {CodeProjectsRepository} from "../../../../repository/CodeProjectsRepository";
import {Router} from "@angular/router";
import {Environments} from "../../../../library/Environments";

@Component({
  selector: 'cms-cp-item',
  styleUrls: [
    './item.component.scss',
  ],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  @Input('item') item;

  @Output('itemDeleted') itemDeleted = new EventEmitter();

  private months = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "June", "July",
    "Aug", "Sep", "Oct",
    "Nov", "Dec",
  ];

  constructor(
    private router: Router,
    private codeProjectsRepository: CodeProjectsRepository,
    private dialog: MatDialog,
  ) {}

  onManage() {
  }

  onGoToEditor() {
    this.router.navigate([
      '/cms/code-editor',
      this.item.shortId,
    ]);
  }

  onRemove($event) {
    $event.stopPropagation();

    const dialog = this.dialog.open(RemoveConfirmDialogComponent, {
      width: '400px',
      data: {},
    });

    dialog.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        const model = HttpModel.removeCodeProject(this.item.uuid);

        this.codeProjectsRepository.removeCodeProject(model).subscribe(() => {
          this.itemDeleted.emit(this.item);
        });
      }
    });
  }

  onPublish($event) {
    $event.stopPropagation();
  }

  formattedDate(): string {
    const d = new Date(this.item.createdAt);

    const month = this.months[d.getMonth()];
    const date = d.getDate();
    const year = d.getFullYear();

    return `${month} ${date}. ${year}`;
  }

  formatEnvironment(): string {
    return Environments.get(this.item.environment);
  }
}
