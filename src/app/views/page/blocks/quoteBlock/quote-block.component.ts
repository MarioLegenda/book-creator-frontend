import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RemoveConfirmDialogComponent} from "../../modals/removeConfirm/remove-confirm-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {debounceTime} from "rxjs/operators";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import {httpRemoveBlock, httpUpdateQuoteBlock} from "../../../../store/page/httpActions";
import {QuoteBlock} from "../../../../model/app/QuoteBlock";

@Component({
  selector: 'cms-quote-block',
  styleUrls: [
    './quote-block.component.scss',
    '../../shared/saved.component.scss',
  ],
  templateUrl: './quote-block.component.html',
})
export class QuoteBlockComponent implements OnInit, OnDestroy {
  @Input('page') page: any;
  @Input('component') component: QuoteBlock;

  componentState = {
    hovered: false,
    text: '',
  };

  private typeAheadSource = new Subject();
  private typeAheadObservable = null;

  constructor(
    private dialog: MatDialog,
    private store: Store<any>,
  ) {}

  ngOnInit() {
    this.componentState.text = this.component.text;

    this.typeAheadObservable = this.typeAheadSource.pipe(
      debounceTime(500),
    )
      .subscribe(() => {
        const model = {
          blockUuid: this.component.blockUuid,
          position: this.component.position,
          text: this.componentState.text,
        };

        this.store.dispatch(httpUpdateQuoteBlock(model));
      });
  }

  ngOnDestroy() {
    this.typeAheadObservable.unsubscribe();
  }

  componentHovered() {
    this.componentState.hovered = true;
  }

  componentUnHovered() {
    this.componentState.hovered = false;
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
