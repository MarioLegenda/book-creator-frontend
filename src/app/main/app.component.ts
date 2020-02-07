import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {actionTypes} from "../store/global/actions";
import {select, Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {GlobalErrorComponentModal} from "../views/shared/modals/global-error.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private store: Store<any>,
    private matDialog: MatDialog,
  ) {
    this.subscribeToErrorActions(store.pipe(select('globalErrorActions')));
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
