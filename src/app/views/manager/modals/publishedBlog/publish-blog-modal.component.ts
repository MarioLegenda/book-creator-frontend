import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Router} from "@angular/router";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'cms-blog-published-dialog',
  templateUrl: './publish-blog-modal.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    './publish-blog-modal.component.scss'
  ]
})
export class PublishBlogModalComponent {
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<PublishBlogModalComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any) {

  }

  onBackToListing() {
    this.router.navigate(['/cms/management/blogs/list']);

    this.dialogRef.close();
  }

  onViewPublished() {
    this.redirectToProdSource();
  }

  private redirectToProdSource(): void {
    window.location.href = `${environment.staticProtocol}://${environment.staticWeb}/blog/${this.model.slug}/${this.model.shortId}`;
  }
}
