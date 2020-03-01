import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'cms-test-run-result',
  styleUrls: [
    './test-run-result.component.scss',
    './../../../shared/styles/generic.component.scss'
  ],
  templateUrl: './test-run-result.component.html',
})
export class TestRunResultComponent {
  @Output('testRunCloseEvent') testRunCloseEvent = new EventEmitter();
  @Input('result') result: any;

  onClose() {
    this.testRunCloseEvent.emit();
  }
}
