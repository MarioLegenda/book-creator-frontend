import {Component, Input, OnInit} from '@angular/core';
import {FileUploadRepository} from "../../../../repository/FileUploadRepository";
import {HttpModel} from "../../../../model/http/HttpModel";
import {MultimediaBlockModel} from "../../../../model/app/MultimediaBlockModel";
import {PageRepository} from "../../../../repository/PageRepository";
import {environment} from "../../../../../environments/environment";
import {AddYoutubeLinkDialogComponent} from "../../modals/embedYoutubeLink/embed-youtube-link.component";
import {MatDialog} from "@angular/material/dialog";
import {DomSanitizer} from "@angular/platform-browser";

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
    file: null,
    video: null,
  };

  ngOnInit() {
    if (this.component.fileInfo) {
      this.componentState.file = `http://${environment.rebelCdnApiUri}/images/${this.component.fileInfo.fileName}`;
    }
  }

  constructor(
    private rebelCdnRepository: FileUploadRepository,
    private pageRepository: PageRepository,
    private dialog: MatDialog,
    private domSanitizer: DomSanitizer,
  ) {}

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

  embeddedYoutubeLink() {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.componentState.video);
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
          },
          null,
        );

        this.pageRepository.updateMultimediaBlock(model).subscribe((res) => {
          this.componentState.file = `http://11.11.11.12/images/${res.fileInfo.fileName}`;
        });
      });
    };


    fileReader.onerror = (error) => {
      console.log(error);
    };
  }
}
