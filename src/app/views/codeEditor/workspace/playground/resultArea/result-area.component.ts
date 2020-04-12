import {Component, Input, ElementRef, ViewChild, OnDestroy, OnInit} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'cms-result-area',
  styleUrls: [
    './result-area.component.scss',
    './../../../../shared/styles/generic.component.scss'
  ],
  templateUrl: './result-area.component.html',
})
export class ResultAreaComponent implements OnDestroy, OnInit {
  result: any;

  // @ts-ignore
  @ViewChild('resultAreaRef', {static: true}) resultAreaRef: ElementRef;
  @Input('resultCommunicator') resultCommunicator: Subject<any>;

  private resultCommSubscription;

  componentState = {
    minimized: false,
    icons: {
      minimize: "fa fa-minus",
    }
  };

  ngOnInit() {
    this.resultCommSubscription = this.resultCommunicator.subscribe(data => {
      this.result = data;

      if (this.componentState.minimized) {
        this.maximize();
        this.componentState.minimized = false;
      }
    });
  }

  ngOnDestroy() {
    this.resultCommSubscription.unsubscribe();
  }

  onMinimize() {
    if (this.componentState.minimized) {
      this.maximize();
      this.componentState.minimized = false;
    } else if (!this.componentState.minimized) {
      this.minimize();
      this.componentState.minimized = true;
    }
  }

  private minimize() {
    this.resultAreaRef.nativeElement.setAttribute('style', 'height: 30px; top: 370px;');

    this.componentState.icons.minimize = 'far fa-window-maximize';
  }

  private maximize() {
    this.resultAreaRef.nativeElement.setAttribute('style', 'height: 200px; top: 200px;');

    this.componentState.icons.minimize = 'fa fa-minus';
  }
}
