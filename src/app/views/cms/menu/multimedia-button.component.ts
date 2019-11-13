import { Component, Input } from '@angular/core';

@Component({
  selector: 'cms-multimedia-button',
  styleUrls: ['../../../web/styles/multimedia-button.component.scss'],
  templateUrl: '../../../web/templates/cms/multimedia-button.component.html',
})
export class MultimediaButtonComponent {
  @Input() text = '';
  @Input() icon = '';
  @Input() wrapperClass = '';
}
