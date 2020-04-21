import {Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {BlogRepository} from "../../../../repository/BlogRepository";
import {MatDialog} from "@angular/material/dialog";
import {HttpModel} from "../../../../model/http/HttpModel";
import {Month} from "../../../../library/Month";
import {RemoveItemService} from "../../sharedServices/RemoveItemService";
import {titleResolver} from "../../sharedServices/titleResolver";
import {environment} from "../../../../../environments/environment";
import {Router} from "@angular/router";
import {BlogState} from "../../../../logic/BlogState";
import {NotifyIfPublishedModal} from "../../modals/notifyIfPublished/notify-if-published-modal.component";

@Component({
  selector: 'cms-ks-item',
  styleUrls: [
    './../../../shared/styles/item-listing.component.scss',
    './item.component.scss',
  ],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  @Input('item') item;
  // @ts-ignore
  @ViewChild('tooltip', {static: true}) tooltip;

  @Output('itemDeleted') itemDeleted = new EventEmitter();

  noTitle: boolean = false;
  realTitle: string = '';
  isPublished: boolean = false;

  componentState = {
    noTitle: false,
    realTitle: '',
    isPublished: false,
  };

  constructor(
    private blogRepository: BlogRepository,
    private dialog: MatDialog,
    private removeItemService: RemoveItemService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (!this.item.title) {
      this.noTitle = true;
    } else {
      this.realTitle = titleResolver(this.item.title, 34);
    }

    if (this.item.state === BlogState.PUBLISHED || this.item.state === BlogState.CHANGED) {
      this.isPublished = true;
    }
  }

  onWrite() {
    if (this.item.state === BlogState.PUBLISHED) {
      const dialog = this.dialog.open(NotifyIfPublishedModal, {
        width: '480px',
      });

      dialog.afterClosed().subscribe((confirm: boolean) => {
        if (confirm) {
          const shortId: string = this.item.shortId;
          const pageShortId: string = this.item.pageShortId;

          this.router.navigate([`/page/blog/${shortId}/${pageShortId}`]);
        }
      });

      return;
    }

    const shortId: string = this.item.shortId;
    const pageShortId: string = this.item.pageShortId;

    this.router.navigate([`/page/blog/${shortId}/${pageShortId}`]);
  }

  onRemove($event) {
    $event.stopPropagation();
    $event.preventDefault();

    this.removeItemService.remove(
      this.blogRepository,
      'removeBlog',
      () => HttpModel.removeBlog(this.item.uuid),
      this.item,
      this.itemDeleted,
      'Are you sure you wish to remove this blog? This action cannot be undone.',
    );
  }

  onTooltipShow($event, tooltip) {
    $event.stopPropagation();

    tooltip.toggle();
  }

  onViewPublished($event) {
    $event.stopPropagation();

    if (!this.isPublished) return;

    window.location.href = `${environment.composeStaticWebUrl()}/blog/${this.item.slug}/${this.item.shortId}`;
  }

  onPublish($event) {
    $event.stopPropagation();

    if (this.noTitle) return;

    this.router.navigate(['/cms/management', 'blog', 'publish', this.item.shortId]);
  }

  onPreview($event) {
    $event.stopPropagation();

    if (this.noTitle) return;

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
