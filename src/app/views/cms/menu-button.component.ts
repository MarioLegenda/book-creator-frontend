import { Component, Input } from '@angular/core';

@Component({
  selector: 'cms-menu-button',
  styleUrls: ['../../web/styles/menu-button.component.scss'],
  templateUrl: '../../web/templates/menu-button.component.html',
})
export class MenuButtonComponent {
  @Input() text = '';
  @Input() icon = '';
  @Input() wrapperClass = '';
}
