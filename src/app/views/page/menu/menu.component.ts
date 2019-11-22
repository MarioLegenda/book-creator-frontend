import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import { viewAddTextBlock } from '../../../store/viewActions';

@Component({
  selector: 'cms-menu',
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  constructor(private store: Store<{menu: string}>) {}
}
