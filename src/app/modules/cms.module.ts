import {NgModule} from "@angular/core";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {BrowserModule} from "@angular/platform-browser";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";

import {MenuComponent} from "./components/cms/menu.component";
import {MenuButtonComponent} from "./components/cms/menu-button.component";
import {CmsComponent} from "./components/cms/cms.component";
import {WorkAreaComponent} from "./components/cms/work-area.component";
import {TextBlockComponent as ViewTextBlockComponent} from "./components/cms/blocks/view/text-block.component";
import {TextBlockComponent as CreateTextBlockComponent} from "./components/cms/blocks/create/text-block.component";
import {SelectionAreaComponent} from "./components/cms/selection-area.component";
import {BlockSelectorComponent} from "./components/cms/blocks/block-selector.component";

import {ComponentTracker} from "../services/tracking/ComponentTracker";

@NgModule({
  declarations: [
    CmsComponent,
    MenuComponent,
    MenuButtonComponent,
    WorkAreaComponent,
    CreateTextBlockComponent,
    ViewTextBlockComponent,
    SelectionAreaComponent,
    BlockSelectorComponent,
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,

    AngularFontAwesomeModule,
    BrowserModule,
    CKEditorModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: ComponentTracker, useClass: ComponentTracker}
  ],
  bootstrap: [CmsComponent],
  exports: [
    CmsComponent,
  ]
})
export class CmsModule { }
