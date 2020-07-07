import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PageRepository} from "../../../../../repository/PageRepository";
import {HttpModel} from "../../../../../model/http/HttpModel";

@Component({
  selector: 'cms-block-info',
  styleUrls: [
    './info.component.scss',
    '../../global-block.component.scss',
  ],
  templateUrl: './info.component.html',
})
export class InfoComponent {
  @Input('readOnly') readOnly: boolean;
  @Input('isGist') isGist: boolean;
  @Input('isCode') isCode: boolean;
  @Input('emulator') emulator: any;
  @Input('codeProject') codeProject: any;
  @Input('codeResult') codeResult: string;
  @Input('pageUuid') pageUuid: string;
  @Input('blockUuid') blockUuid: string;

  @Output('codeResultNullified') codeResultNullified: EventEmitter<void> = new EventEmitter<void>();

  showInfo: boolean = false;
  showCodeResult: boolean = false;
  inRequest: boolean = false;

  constructor(private pageRepository: PageRepository) {}

  toggleInfo(): void {
    this.showInfo = !this.showInfo;

    if (this.showInfo) {
      this.showCodeResult = false;
    }
  }

  toggleCodeResult(): void {
    this.showCodeResult = !this.showCodeResult;

    if (this.showCodeResult) {
      this.showInfo = false;
    }
  }

  onClearCodeResult(): void {
    if (this.inRequest) return;

    this.inRequest = true;

    const model = HttpModel.updateCodeResult(
      this.pageUuid,
      this.blockUuid,
    );

    this.pageRepository.updateCodeResult(model).subscribe(() => {
      this.showCodeResult = false;

      this.codeResultNullified.emit();

      this.inRequest = false;
    });
  }
}
