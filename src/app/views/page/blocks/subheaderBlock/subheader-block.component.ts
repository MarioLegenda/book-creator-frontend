import {Component, Input} from '@angular/core';
import {MainHeaderBlock} from "../../../../model/app/MainHeaderBlock";
import {RemoveConfirmDialogComponent} from "../../modals/removeConfirm/remove-confirm-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {debounceTime} from "rxjs/operators";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import {httpRemoveBlock, httpUpdateSubheader} from "../../../../store/page/httpActions";
import {AppContext} from "../../../../logic/PageComponent/context/AppContext";

@Component({
  selector: 'cms-subheader-block',
  styleUrls: [
    './subheader-block.component.scss',
    '../../shared/saved.component.scss',
  ],
  templateUrl: './subheader-block.component.html',
})
export class SubheaderBlockComponent {
  @Input('appContext') appContext: AppContext;
  @Input('component') component: MainHeaderBlock;

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

        this.store.dispatch(httpUpdateSubheader(model));
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
