import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BlogRepository} from "../../../../repository/BlogRepository";
import {MatDialog} from "@angular/material/dialog";
import {RemoveConfirmDialogComponent} from "../../modals/removeConfirm/remove-confirm-modal.component";
import {HttpModel} from "../../../../model/http/HttpModel";

@Component({
  selector: 'cms-ks-item',
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

  componentState = {
    noTitle: false,
    realTitle: '',
  };

  constructor(
    private blogRepository: BlogRepository,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    if (!this.item.title) this.componentState.noTitle = true;
  }

  onRemove($event) {
    $event.stopPropagation();

    const dialog = this.dialog.open(RemoveConfirmDialogComponent, {
      width: '400px',
      data: {},
    });

    dialog.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.blogRepository.removeBlog(HttpModel.removeBlog(this.item.uuid)).subscribe(() => {
          this.itemDeleted.emit();
        });
      }
    });
  }

  onPublish($event) {
    $event.stopPropagation();
  }

  formattedDate() {
    const d = new Date(this.item.createdAt);

    const month = this.months[d.getMonth()];
    const date = d.getDate();
    const year = d.getFullYear();

    return `${month} ${date}. ${year}`;
  }
}
