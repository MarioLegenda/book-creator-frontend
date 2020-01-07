import {NgModule} from "@angular/core";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCheckboxModule} from "@angular/material/checkbox";

import {MenuComponent} from "../menu/menu.component";
import {MenuButtonComponent} from "../menu/menu-button.component";
import {BootstrapComponent} from "../bootstrap/bootstrap.component";
import {WorkAreaComponent} from "../workArea/work-area.component";
import {TextBlockComponent} from "../blocks/textBlock/text-block.component";
import {PageRoutingModule} from "./page-routing.module";

import {CommonModule} from "@angular/common";
import {MetadataPlaceholderComponent} from "../blocks/textBlock/metadataPlaceholder/metadata-placeholder.component";
import {CodeBlockComponent} from "../blocks/codeBlock/code-block.component";
import {MonacoEditorModule} from "ngx-monaco-editor";

@NgModule({
  declarations: [
    BootstrapComponent,
    MenuComponent,
    MenuButtonComponent,
    WorkAreaComponent,
    TextBlockComponent,
    MetadataPlaceholderComponent,
    CodeBlockComponent,
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    CKEditorModule,
    DragDropModule,
    MonacoEditorModule,
    MatTooltipModule,
    MatCheckboxModule,

    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    PageRoutingModule,
  ],
  providers: [],
})
export class PageModule { }
