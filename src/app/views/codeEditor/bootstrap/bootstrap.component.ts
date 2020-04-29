import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpActionSubscriber} from "../../../store/subscriber/editor/HttpActionSubscriber";
import {ViewActionSubscriber} from "../../../store/subscriber/editor/ViewActionSubscriber";
import {Store} from "@ngrx/store";
import {clearStateAction} from "../../../store/globalReducers";
import {TabSession} from "../../../store/sessions/TabSession";
import {EnvironmentEmulatorRepository} from "../../../repository/EnvironmentEmulatorRepository";
import {Environments} from "../../../library/Environments";
import {ICodeProject} from "../models/ICodeProject";
import {CodeProjectsRepository} from "../../../repository/CodeProjectsRepository";

@Component({
  selector: 'cms-code-editor',
  styleUrls: [
    './bootstrap.component.scss',
  ],
  templateUrl: './bootstrap.component.html',
})
export class BootstrapComponent implements OnInit, OnDestroy, AfterViewInit {
  project: ICodeProject;
  environments: Environments;

  @ViewChild('wrapperRef', {static: true}) wrapperRef: ElementRef;

  constructor(
    private store: Store<any>,
    private httpActionSubscriber: HttpActionSubscriber,
    private viewActionSubscriber: ViewActionSubscriber,
    private codeProjectsRepository: CodeProjectsRepository,
    private environmentEmulatorRepository: EnvironmentEmulatorRepository,
    private route: ActivatedRoute,
    private tabSession: TabSession,
  ) {}

  ngOnInit(): void {
    this.bootstrap().then(({project, environments}) => {
      this.environments = new Environments(environments);
      this.project = project;
    });
  }

  ngAfterViewInit(): void {
    const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    this.wrapperRef.nativeElement.setAttribute('style', `height: ${vh}px`);
  }

  ngOnDestroy(): void {
    this.project = null;

    this.httpActionSubscriber.destroy();

    this.store.dispatch(clearStateAction());

    this.tabSession.clear();
  }

  private async bootstrap(): Promise<{project: ICodeProject, environments: any[]}> {
    const project: ICodeProject = await this.codeProjectsRepository.getProjectByShortId(this.route.snapshot.paramMap.get('shortId')).toPromise();
    const environments = await this.environmentEmulatorRepository.getEnvironments().toPromise();

    return {project, environments};
  }
}
