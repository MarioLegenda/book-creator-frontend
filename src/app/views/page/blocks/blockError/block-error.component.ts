import {Component, Input} from '@angular/core';

@Component({
  selector: 'cms-block-errors',
  styleUrls: [
    './block-error.component.scss',
    './../global-block.component.scss',
  ],
  templateUrl: './block-error.component.html',
})
export class BlockErrorComponent {
  @Input('errors') errors: string[] = []
}
