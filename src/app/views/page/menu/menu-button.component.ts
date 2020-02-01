import { Component, Input } from '@angular/core';

@Component({
  selector: 'cms-menu-button',
  styleUrls: ['./menu-button.component.scss'],
  templateUrl: './menu-button.component.html',
})
export class MenuButtonComponent {
  @Input('icon') icon = '';
  @Input('title') title = false;
  @Input('isOffPage') isOffPage: boolean = false;
  @Input('isSingleIcon') isSingleIcon: boolean = false;
  @Input('iconText') iconText: string = '';
}
