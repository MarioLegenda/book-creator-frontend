import {Component, Input, ElementRef, ViewChild, OnDestroy, OnInit} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'cms-result-area',
  styleUrls: [
    './result-area.component.scss',
  ],
  templateUrl: './result-area.component.html',
})
export class ResultAreaComponent implements OnDestroy, OnInit {
  result: string|null;

  // @ts-ignore
  @ViewChild('resultAreaRef') resultAreaRef: ElementRef;
  @Input('resultCommunicator') resultCommunicator: Subject<any>;

  private resultCommSubscription;

  componentState = {
    minimized: false,
    icons: {
      minimize: "fa fa-minus",
    }
  }

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
    this.resultCommSubscription = null;
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
    this.resultAreaRef.nativeElement.setAttribute('style', 'height: 30px; top: 370px; -webkit-box-shadow: none; -moz-box-shadow: none; box-shadow: none');

    this.componentState.icons.minimize = 'far fa-window-maximize';
  }

  private maximize() {
    this.resultAreaRef.nativeElement.setAttribute('style', 'height: 200px; top: 200px; -webkit-box-shadow: -3px -8px 19px -1px rgba(232,232,232,1); -moz-box-shadow: -3px -8px 19px -1px rgba(232,232,232,1); box-shadow: -3px -8px 19px -1px rgba(232,232,232,1)');
    
    this.componentState.icons.minimize = 'fa fa-minus';
  }
}
