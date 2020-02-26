import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProjectRepository} from "../../../repository/ProjectRepository";
import {ActivatedRoute} from "@angular/router";
import {HttpActionSubscriber} from "../../../store/subscriber/editor/HttpActionSubscriber";
import {ViewActionSubscriber} from "../../../store/subscriber/editor/ViewActionSubscriber";
import {Store} from "@ngrx/store";
import {clearStateAction} from "../../../store/globalReducers";
import Util from "../../../library/Util";
import {TabSession} from "../../../store/sessions/TabSession";

@Component({
  selector: 'cms-code-editor',
  styleUrls: [
    './bootstrap.component.scss',
  ],
  templateUrl: './bootstrap.component.html',
})
export class BootstrapComponent implements OnInit, OnDestroy, AfterViewInit {
  project: any;

  // @ts-ignore
  @ViewChild('wrapperRef') wrapperRef: ElementRef;

  constructor(
    private store: Store<any>,
    private httpActionSubscriber: HttpActionSubscriber,
    private viewActionSubscriber: ViewActionSubscriber,
    private projectRepository: ProjectRepository,
    private route: ActivatedRoute,
    private tabSession: TabSession,
  ) {}

  ngOnInit(): void {
    this.projectRepository.getProjectByShortId(this.route.snapshot.paramMap.get('shortId')).subscribe((model: any) => {
      this.project = model;
    });
  }

  ngAfterViewInit(): void {
    Util.setHeightFromWrapper(document.body, this.wrapperRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.project = null;

    this.httpActionSubscriber.destroy();

    this.store.dispatch(clearStateAction());

    this.tabSession.clear();
  }
}
