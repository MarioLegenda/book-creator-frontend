import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {actionTypes} from '../../../store/actions';

@Component({
  selector: 'cms-block-selector',
  styleUrls: ['../../../web/styles/blocks/block-selector.component.scss'],
  templateUrl: '../../../web/templates/blocks/block-selector.component.html',
})
export class BlockSelectorComponent {
  menuSelection: Observable<{type: string}>;

  textBlockVisible = false;

  constructor(private store: Store<{type: string}>) {
    this.menuSelection = store.pipe(select('menuSelection'));

    this.menuSelection.subscribe((action) => {
      if (!action) {
        return;
      }

      switch (action.type) {
        case actionTypes.ADD_TEXT_BLOCK: {
          this.textBlockVisible = !this.textBlockVisible;
        }
      }
    });
  }
}
