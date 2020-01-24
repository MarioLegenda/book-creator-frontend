import {Component, Input, OnInit} from '@angular/core';
import {FileUploadRepository} from "../../../../repository/FileUploadRepository";
import {HttpModel} from "../../../../model/http/HttpModel";
import {MultimediaBlockModel} from "../../../../model/app/MultimediaBlockModel";
import {PageRepository} from "../../../../repository/PageRepository";
import {environment} from "../../../../../environments/environment";
import {AddYoutubeLinkDialogComponent} from "../../modals/embedYoutubeLink/embed-youtube-link.component";
import {MatDialog} from "@angular/material/dialog";
import {RemoveConfirmDialogComponent} from "../../modals/removeConfirm/remove-confirm-modal.component";
import {httpRemoveBlock} from "../../../../store/page/httpActions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'cms-multimedia-block',
  styleUrls: [
    './multimedia-block.component.scss'
  ],
  templateUrl: './multimedia-block.component.html',
})
export class MultimediaBlockComponent implements OnInit {
  @Input('page') page: any;
  @Input('component') component: MultimediaBlockModel;

  componentState = {
    hovered: false,
    fileInfo: null,
    filePath: null,
    video: null,
  };

  ngOnInit() {
    if (this.component.fileInfo) {
      this.componentState.filePath = `http://${environment.rebelCdnApiUri}/images/${this.component.fileInfo.fileName}`;
    }
  }

  constructor(
    private rebelCdnRepository: FileUploadRepository,
    private pageRepository: PageRepository,
    private dialog: MatDialog,
    private store: Store<any>,
  ) {}

  remove() {
    const dialogRef = this.dialog.open(RemoveConfirmDialogComponent, {
      width: '480px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm === true) {
        this.store.dispatch(httpRemoveBlock(this.component));
      }
    });
  }

  componentHovered() {
    this.componentState.hovered = true;
  }

  componentUnHovered() {
    this.componentState.hovered = false;
  }

  addYoutubeLink() {
    const dialogRef = this.dialog.open(AddYoutubeLinkDialogComponent, {
      width: '480px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((youtubeId: string) => {
      const model = HttpModel.updateMultimediaBlock(
        this.page.uuid,
        this.component.blockUuid,
        null,
        `https://youtube.com/embed/${youtubeId}`,
      );

      this.pageRepository.updateMultimediaBlock(model).subscribe((res) => {
        this.componentState.video = res.video;
      });
    });
  }

  fileChange($event) {
    const file = $event.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      // @ts-ignore
      this.rebelCdnRepository.uploadFile(HttpModel.uploadFile(
        this.page.uuid,
        this.component.blockUuid,
        {
          size: file.size,
          mimeType: file.type,
        },
        fileReader.result,
      )).subscribe((res: any) => {

        const model = HttpModel.updateMultimediaBlock(
          this.page.uuid,
          this.component.blockUuid,
          {
            fileName: res.fileName,
            dir: res.dir,
            width: res.width,
            height: res.height,
          },
          null,
        );

        this.pageRepository.updateMultimediaBlock(model).subscribe((res) => {
          this.componentState.filePath = `http://11.11.11.12/images/${res.fileInfo.fileName}`;
        });
      });
    };


    fileReader.onerror = (error) => {
      console.log(error);
    };
  }
}
