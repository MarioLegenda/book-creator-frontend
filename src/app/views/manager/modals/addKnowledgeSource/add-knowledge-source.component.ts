import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {BlogRepository} from '../../../../repository/BlogRepository';
import {PageRepository} from '../../../../repository/PageRepository';
import {HttpModel} from "../../../../model/http/HttpModel";

@Component({
  selector: 'cms-add-knowledge-source-modal',
  templateUrl: './add-knowledge-source.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    './add-knowledge-source.component.scss'
  ]
})
export class AddKnowledgeSourceDialogComponent {
  disabled: boolean = false;

  constructor(
    private router: Router,
    private blogRepository: BlogRepository,
    private pageRepository: PageRepository,
    public dialogRef: MatDialogRef<AddKnowledgeSourceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any) {}

    close(): void {
      this.dialogRef.close();
    }

    onSelect(type: string) {
      if (this.disabled) return;

      this.disabled = true;

      if (type === 'blog') {
        this.createBlog();
      }
    }

    private createBlog() {
      const createBlogData = async () => {
        const emptyPage: any = await this.pageRepository.createEmptyPage().toPromise();
        const blankBlog: any = await this.blogRepository.createBlankBlog().toPromise();

        await this.blogRepository.linkPageToBlog(HttpModel.createLinkPageToBlog(
          emptyPage.data.uuid,
          blankBlog.data.uuid,
        )).toPromise();

        const emptyPageShortId = emptyPage.data.shortId;
        const blankBlogShortId = blankBlog.data.shortId;

        return {emptyPageShortId, blankBlogShortId};
      };

      createBlogData().then(({emptyPageShortId, blankBlogShortId}) => {
        this.router.navigate(['/page', 'blog', blankBlogShortId, emptyPageShortId]);

        this.dialogRef.close();
      });
    }
}
