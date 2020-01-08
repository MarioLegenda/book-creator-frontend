import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'cms-test-run-result',
  styleUrls: [
    './test-run-result.component.scss',
  ],
  templateUrl: './test-run-result.component.html',
})
export class TestRunResultComponent {
  @Output('testRunCloseEvent') testRunCloseEvent = new EventEmitter();
  result = `import {Component} from '@angular/core';

@Component({
  selector: 'cms-test-run-result',
  styleUrls: [
    './test-run-result.component.scss',
  ],
  templateUrl: './test-run-result.component.html',
})
export class TestRunResultComponent {

}
`;

  onClose() {
    this.testRunCloseEvent.emit();
  }
}
