import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {httpCreateCodeBlock, httpCreateTextBlock} from "../../../store/httpActions";

@Component({
  selector: 'cms-menu',
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  constructor(private store: Store<{menu: string}>) {}

  menuExpanded = false;

  appendTextBlock() {
    this.store.dispatch(httpCreateTextBlock());
  }

  appendCodeBlock() {
    this.store.dispatch(httpCreateCodeBlock());
  }

  expandMenu() {
    this.menuExpanded = !this.menuExpanded;
  }
}
