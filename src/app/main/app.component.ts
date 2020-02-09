import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {actionTypes} from "../store/global/actions";
import {select, Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {GlobalErrorComponentModal} from "../views/shared/modals/global-error.component";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // @ts-ignore
  @ViewChild('bodyRef') bodyRef: ElementRef;

  constructor(
    private store: Store<any>,
    private matDialog: MatDialog,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.subscribeToErrorActions(store.pipe(select('globalErrorActions')));
  }

  ngOnInit() {
    const isPage = new RegExp('/page/blog/');

    if (isPage.test(location.pathname)) {

    }

    this.document.body.onclick = (e) => {
      const target = e.target;

      const re = new RegExp('click-anchor');

      // @ts-ignore
      if (!re.test(target.className)) {
        let el = window.document.getElementById('mainMenu');

        // @ts-ignore
        el.style = 'display: none';
      }
    };
  }

  private subscribeToErrorActions(observable: Observable<any>) {
    observable.subscribe((action: any) => {
      if (!action) {
        return;
      }

      switch (action.type) {
        case actionTypes.GLOBAL_SERVER_ERROR: {
          this.matDialog.open(GlobalErrorComponentModal, {
            width: '400px',
            data: {
              title: action.title,
              description: action.description,
              runCounter: action.runCounter,
            },
            disableClose: true,
          });

          break;
        }

        case actionTypes.GLOBAL_CLIENT_ERROR: {
          this.matDialog.open(GlobalErrorComponentModal, {
            width: '400px',
            data: {
              title: action.title,
              description: action.description,
              runCounter: action.runCounter,
            },
            disableClose: true,
          });

          break;
        }
      }
    });
  }

  title = 'frontend';
}
