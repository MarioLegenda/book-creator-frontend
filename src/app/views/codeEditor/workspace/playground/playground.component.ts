import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {EnvironmentEmulatorRepository} from "../../../../repository/EnvironmentEmulatorRepository";
import { Subject, ReplaySubject } from 'rxjs';
import {HttpModel} from "../../../../model/http/HttpModel";
import {Environments} from "../../../../library/Environments";
import {ICodeProject} from "../../models/ICodeProject";
import {IRunCodeResultEvent} from "../services/IRunCodeResultEvent";

@Component({
  selector: 'cms-playground',
  styleUrls: [
    './playground.component.scss',
  ],
  templateUrl: './playground.component.html',
})
export class PlaygroundComponent {
  @ViewChild('playgroundWrapperRef', {static: true}) playgroundWrapperRef: ElementRef;

  @Input('project') project: ICodeProject;
  @Input('environments') environments: Environments;

  resultCommunicator: Subject<IRunCodeResultEvent> = new ReplaySubject<IRunCodeResultEvent>();

  expanded: boolean = false;
  expandedOnce: boolean = false;
  resultAvailable: boolean = false;
  expandedIcon: string = 'fas fa-angle-up';
  code: string = '';
  isRunning: boolean = false;
  isSession: boolean = false;

  private previousCode = null;

  constructor(
    private envEmulatorRepository: EnvironmentEmulatorRepository
  ) {}

  ngOnInit() {
    if (this.project.session) {
      this.isSession = true;
    }
  }

  onExpandPlayground() {
    let height = (this.expanded) ? 40 : 400;

    const el = this.playgroundWrapperRef.nativeElement;

    el.setAttribute('style', `height: ${height}px`);

    this.expanded = !this.expanded;

    this.expandedIcon = this.expanded ? 'fas fa-angle-down' : 'fas fa-angle-up';

    if (!this.expandedOnce) {
      this.expandedOnce = true;
    }
  }

  onRunProject(code) {
    if (this.previousCode === code.code) return;

    this.isRunning = true;
    this.previousCode = code.code;

    const state: string = (this.isSession) ? 'session': 'dev';
    const model = HttpModel.buildAndRunProject(code.code, state);

    this.envEmulatorRepository.BuildAndRunProject(this.project.uuid, model).subscribe((data: IRunCodeResultEvent) => {
      this.resultAvailable = true;
      this.isRunning = false;

      this.resultCommunicator.next(data);
    }, () => {
      this.resultAvailable = true;
      this.isRunning = false;

      this.resultCommunicator.next({
        success: false,
        result: null,
        timeout: 0,
      });
    });
  }
}
