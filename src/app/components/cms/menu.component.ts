import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import { addTextBlock } from '../../store/actions';

@Component({
  selector: 'cms-menu',
  styleUrls: ['./scss/menu.component.scss'],
  templateUrl: './html/menu.component.html',
})
export class MenuComponent {
  constructor(private store: Store<{menu: string}>) {}

  onClick() {
    this.store.dispatch(addTextBlock());
  }
}
