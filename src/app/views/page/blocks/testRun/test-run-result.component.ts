import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PageRepository} from "../../../../repository/PageRepository";
import {HttpModel} from "../../../../model/http/HttpModel";

@Component({
  selector: 'cms-test-run-result',
  styleUrls: [
    './test-run-result.component.scss',
    './../../../shared/styles/generic.component.scss'
  ],
  templateUrl: './test-run-result.component.html',
})
export class TestRunResultComponent implements OnChanges {
  @Output('testRunCloseEvent') testRunCloseEvent = new EventEmitter();
  @Output('testRunResultSaved') testRunResultSaved = new EventEmitter<string>();

  @Input('result') result: any;
  @Input('pageUuid') pageUuid: string;
  @Input('blockUuid') blockUuid: string;
  @Input('currentResult') currentResult: string;

  requestInFlight: boolean = false;
  resultUnchanged: boolean = false;
  saved: boolean = false;

  constructor(private pageRepository: PageRepository) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentResult.firstChange) return;

    this.resultUnchanged = (changes.currentResult.currentValue === this.result.result);
  }

  ngOnInit() {
    this.resultUnchanged = (this.currentResult === this.result.result);
  }

  onClose(): void {
    this.testRunCloseEvent.emit();
  }

  onUpdateCodeResult(): void {
    if (this.requestInFlight) return;
    if (this.currentResult === this.result) return;

    this.requestInFlight = true;
    const model = HttpModel.updateCodeResult(
      this.pageUuid,
      this.blockUuid,
      this.result.result,
    );

    this.pageRepository.updateCodeResult(model).subscribe((res) => {
      this.testRunResultSaved.emit(res.codeResult);

      this.requestInFlight = false;
      this.saved = true;
    });
  }
}
