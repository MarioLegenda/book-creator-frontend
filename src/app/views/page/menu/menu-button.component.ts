import { Component, Input } from '@angular/core';

@Component({
  selector: 'cms-menu-button',
  styleUrls: ['./menu-button.component.scss'],
  templateUrl: './menu-button.component.html',
})
export class MenuButtonComponent {
  @Input('icon') icon = '';
  @Input('title') title = false;
}
