import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import { viewAddTextBlock } from '../../../store/viewActions';

@Component({
  selector: 'cms-menu',
  styleUrls: ['../../../web/styles/menu.component.scss'],
  templateUrl: '../../../web/templates/cms/menu.component.html',
})
export class MenuComponent {
  constructor(private store: Store<{menu: string}>) {}

  onClick() {
    this.store.dispatch(viewAddTextBlock());
  }
}
