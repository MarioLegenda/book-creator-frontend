import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {httpCreateTextBlock} from "../../../store/httpActions";

@Component({
  selector: 'cms-menu',
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  constructor(private store: Store<{menu: string}>) {}

  appendBlock() {
    this.store.dispatch(httpCreateTextBlock());
  }
}
