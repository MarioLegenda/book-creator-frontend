import { Component, Input } from '@angular/core';

@Component({
  selector: 'cms-menu-button',
  styleUrls: ['./scss/menu-button.component.scss'],
  templateUrl: './html/menu-button.component.html',
})
export class MenuButtonComponent {
  @Input() text = '';
  @Input() icon = '';
  @Input() wrapperClass = '';
}
