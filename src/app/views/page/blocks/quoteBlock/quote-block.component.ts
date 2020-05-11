import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RemoveConfirmDialogComponent} from "../../modals/removeConfirm/remove-confirm-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {debounceTime} from "rxjs/operators";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import {httpRemoveBlock, httpUpdateQuoteBlock} from "../../../../store/page/httpActions";
import {QuoteBlock} from "../../../../model/app/QuoteBlock";
import {AppContext} from "../../../../logic/PageComponent/context/AppContext";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'cms-quote-block',
  styleUrls: [
    './quote-block.component.scss',
    '../../shared/saved.component.scss',
  ],
  templateUrl: './quote-block.component.html',
})
export class QuoteBlockComponent implements OnInit, OnDestroy {
  @Input('appContext') appContext: AppContext;
  @Input('component') component: QuoteBlock;

  hovered: boolean = false;
  text: string = '';
  touched: boolean = false;

  private typeAheadSource = new Subject();
  private typeAheadObservable = null;

  constructor(
    private dialog: MatDialog,
    private store: Store<any>,
    private deviceDetector: DeviceDetectorService,
  ) {}

  ngOnInit() {
    this.text = this.component.text;

    this.typeAheadObservable = this.typeAheadSource.pipe(
      debounceTime(500),
    )
      .subscribe(() => {
        const model = {
          blockUuid: this.component.blockUuid,
          position: this.component.position,
          text: this.text,
        };

        this.store.dispatch(httpUpdateQuoteBlock(model));
      });
  }

  ngOnDestroy() {
    this.typeAheadObservable.unsubscribe();
  }

  componentTouched() {
    if (this.deviceDetector.isDesktop()) return;

    this.touched = true;
    this.hovered = true;
  }

  componentHovered() {
    if (this.touched) return;

    this.hovered = true;
  }

  componentUnHovered() {
    if (this.touched) return;

    this.hovered = false;
  }

  onChange() {
    this.typeAheadSource.next();
  }

  remove() {
    const dialogRef = this.dialog.open(RemoveConfirmDialogComponent, {
      width: '480px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm === true) this.store.dispatch(httpRemoveBlock(this.component));
    });
  }
}
