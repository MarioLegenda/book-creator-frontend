import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MainHeaderBlock} from "../../../../model/app/MainHeaderBlock";
import {RemoveConfirmDialogComponent} from "../../modals/removeConfirm/remove-confirm-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {debounceTime} from "rxjs/operators";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import {httpRemoveBlock, httpUpdateMainHeader} from "../../../../store/page/httpActions";
import {AppContext} from "../../../../logic/PageComponent/context/AppContext";
import {DeviceDetectorService} from "ngx-device-detector";
import {MainHeaderHelpModalComponent} from "../../modals/mainHeaderHelp/main-header-help-modal.component";

@Component({
  selector: 'cms-main-header-block',
  styleUrls: [
    './main-header-block.component.scss',
    '../../shared/saved.component.scss',
  ],
  templateUrl: './main-header-block.component.html',
})
export class MainHeaderBlockComponent implements OnInit, OnDestroy {
  @Input('appContext') appContext: AppContext;
  @Input('component') component: MainHeaderBlock;

  touched: boolean = false;
  hovered: boolean = false;
  text: string = '';

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

        this.store.dispatch(httpUpdateMainHeader(model));
      });
  }

  ngOnDestroy() {
    this.typeAheadObservable.unsubscribe();
  }

  onHelp() {
    this.dialog.open(MainHeaderHelpModalComponent, {
      width: '70%',
      data: {},
    });
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
