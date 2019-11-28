import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {SelectionRoutingModule} from "./selection-routing.module";

import {CommonModule} from "@angular/common";
import {SelectionListComponent} from "../selectionList/selection-list.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    SelectionListComponent
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    DragDropModule,
    MatDialogModule,

    CommonModule,
    SelectionRoutingModule,
    FormsModule,
  ],
  providers: [],
})
export class SelectionModule { }
