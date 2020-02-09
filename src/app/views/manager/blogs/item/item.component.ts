import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BlogRepository} from "../../../../repository/BlogRepository";
import {MatDialog} from "@angular/material/dialog";
import {RemoveConfirmDialogComponent} from "../../modals/removeConfirm/remove-confirm-modal.component";
import {HttpModel} from "../../../../model/http/HttpModel";
import {Month} from "../../../../library/Month";
import {RemoveItemService} from "../../sharedServices/RemoveItemService";
import {titleResolver} from "../../sharedServices/titleResolver";
import {environment} from "../../../../../environments/environment";

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

  componentState = {
    noTitle: false,
    realTitle: '',
  };

  constructor(
    private blogRepository: BlogRepository,
    private dialog: MatDialog,
    private removeItemService: RemoveItemService,
  ) {}

  ngOnInit() {
    if (!this.item.title) {
      this.componentState.noTitle = true;
    } else {
      this.componentState.realTitle = titleResolver(this.item.title, 37);
    }
  }

  onRemove($event) {
    $event.stopPropagation();

    this.removeItemService.remove(
      this.blogRepository,
      'removeBlog',
      () => HttpModel.removeBlog(this.item.uuid),
      this.item,
      this.itemDeleted,
      'Are you sure you wish to remove this blog? This action cannot be undone.',
    );
  }

  onPublish($event) {
    $event.stopPropagation();
  }

  onPreview($event) {
    $event.stopPropagation();

    window.location.href = `${environment.protocol}://${environment.bookApiUri}/cms/blog/preview/${this.item.slug}/${this.item.shortId}`;
  }

  formattedDate() {
    const d = new Date(this.item.createdAt);

    const month = Month.get(d.getMonth());
    const date = d.getDate();
    const year = d.getFullYear();

    return `${month} ${date}. ${year}`;
  }
}