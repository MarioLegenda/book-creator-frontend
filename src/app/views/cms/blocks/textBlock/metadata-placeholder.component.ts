import {Component, Input} from '@angular/core';

@Component({
  selector: 'cms-metadata-placeholder',
  styleUrls: ['../../../../web/styles/blocks/metadata-placeholder.components.scss'],
  templateUrl: '../../../../web/templates/cms/blocks/textBlock/metadata-placeholder.component.html',
})
export class MetadataPlaceholderComponent {
  @Input('type') type: string;
  @Input('text') text;

  focused: boolean = false;

  private maxTextLen = 26;

  ngOnInit(): void {
    if (this.text && this.text.length > this.maxTextLen) {
      this.text = this.text.substring(0, this.maxTextLen) + '...';
    }
  }

  onHover() {
    this.focused = !this.focused;
  }
}
